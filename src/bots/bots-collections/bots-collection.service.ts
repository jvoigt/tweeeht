import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TweehtLogger } from 'logger/tweeht-logger';
import { Model } from 'mongoose';
import { from, Observable, of, Subject } from 'rxjs';
import { catchError, tap, filter, map } from 'rxjs/operators';
import { TweeehtBot } from '../tweeht-bot';
import { BotDocument } from './bots.schema';
import { UsersService } from 'users/users.service';
import { User } from 'users/user.interface';

@Injectable()
export class BotsCollectionService {

  constructor(
    @InjectModel(BotDocument.name) private botModel: Model<BotDocument>,
    private logger: TweehtLogger,
    private usersService: UsersService,
    // private config: ConfigService,
  ) {
    this.logger.setContext('BotsCollectionService');
  }

  /**
   * will create a new TweeehtBot in the DB
   */
  create(newBot: TweeehtBot): Observable<TweeehtBot> {
    this.logger.verbose(`Create new TweeehtBot: ${newBot.name}`);

    const newBotDocument = mapBotToDocument(newBot)
    const createdBotDocument = new this.botModel(newBotDocument);
    const savedBot = from(createdBotDocument.save()).pipe(
      catchError((err) => {
        // handle Error 
        this.logger.error(`Error while creating new TweeehtBot:${TweeehtBot.name} - ${err}`);
        throw err
      }),
      this.mapToBot()
    )
    this.logger.debug(`Created new TweeehtBot:${TweeehtBot.name}`);
    return savedBot;


  }

  /**
   * will read all bots from the DB
   */
  readAll(): Observable<TweeehtBot[]> {
    this.logger.verbose(`Read all TweeehtBot.`);

    // TODO: 
    // we should better look for the change stream an emit changes as subject so we could realy use some rx magic
    return from(this.botModel.find().exec()).pipe(
      this.mapToBots()
    )
  }

  /**
   * will read one bots from the DB
   * @param id id of a TweeehtBot to query for
   */
  readOne(id: string): Observable<TweeehtBot> {
    this.logger.verbose(`Read a TweeehtBot by id: ${id}`);
    return from(this.botModel.findById(id).exec()).pipe(
      this.mapToBot()
    )
  }

  /**
   * will update one bots from the DB
   * will query by the id
   * @param newBot the new TweeehtBot
   */
  update(newBot: TweeehtBot): Observable<TweeehtBot> {
    this.logger.verbose(`Update TweeehtBot: ${newBot.name}`);

    return from(this.botModel.findByIdAndUpdate(
      newBot.id,
      this.mapBotToDocument(newBot),
      {
        new: true
      }
    ).exec()).pipe(
      this.mapToBot()
    )
  }

  /**
   * will delete one bots from the DB
   * will query by the id
   * when nothing found it will emit null
   *
   * @param deleteBot the TweeehtBot
   */
  delete(deleteBot: TweeehtBot): Observable<TweeehtBot> {
    this.logger.verbose(`Delete a TweeehtBot: ${deleteBot.name}`);

    return from(this.botModel.findByIdAndDelete(deleteBot.id).exec()).pipe(
      this.mapToBot()
    )
  }

  private mapBotToDocument(bot: TweeehtBot): Partial<BotDocument> {
    if (!bot) {
      return null;
    }

    const doc: Partial<BotDocument> = {
      name: bot.name,
      ownerNames: bot.owners.map((owner: User) => owner.username),
    };
    return doc;
  }

  private mapToBot<T>() {
    return function (source$: Observable<BotDocument>) {
      return source$.pipe(
        map((doc: BotDocument) => this.mapDocumentToBot(doc))
      );
    }
  }
  private mapToBots<T>() {
    return function (source$: Observable<BotDocument[]>) {
      return source$.pipe(
        map((docs: BotDocument[]) => {
          return docs.map(
            (doc: BotDocument) =>
              this.mapDocumentToBot(doc)
          )
        }
        )
      );
    }
  }

  private mapDocumentToBot(doc: BotDocument): Promise<TweeehtBot> {
    if (!doc) {
      return null;
    }
    const owners: User[] = [];
    doc.ownerNames.forEach(async (name: string) => {
      owners.push(await this.usersService.findOneByUsername(name));
    });


    const bot: TweeehtBot = {
      name: doc.name,
      id: doc._id,
      owners: owners,
      content: undefined,
      output: undefined,
      sheduler: undefined,
    };
    return bot;
  }
}
