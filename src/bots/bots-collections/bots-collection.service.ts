import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TweehtLogger } from 'logger/tweeht-logger';
import { Model } from 'mongoose';
import { from, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TweeehtBot } from '../tweeht-bot.interface';
import { BotDocument } from './bots.schema';
import { mapToBot, mapToBots, mapBotToDocument } from './mapBotDocumet';

@Injectable()
export class BotsCollectionService {
  constructor(
    @InjectModel(BotDocument.name) private botModel: Model<BotDocument>,
    private logger: TweehtLogger,
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
      mapToBot()
    )
    this.logger.debug(`Created new TweeehtBot:${TweeehtBot.name}`);
    return savedBot;


  }

  /**
   * will read all bots from the DB
   */
  readAll(): Observable<TweeehtBot[]> {
    this.logger.verbose(`Read all TweeehtBot.`);

    return from(this.botModel.find().exec()).pipe(
      mapToBots()
    )
  }

  /**
   * will read one bots from the DB
   * @param id id of a TweeehtBot to query for
   */
  readOne(id: string): Observable<TweeehtBot> {
    this.logger.verbose(`Read a TweeehtBot by id: ${id}`);
    return from(this.botModel.findById(id).exec()).pipe(
      mapToBot()
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
      mapBotToDocument(newBot),
      {
        new: true
      }
    ).exec()).pipe(
      mapToBot()
    )
  }

  /**
   * will delete one bots from the DB
   * will query by the id
   * @param deleteBot the TweeehtBot
   */
  delete(deleteBot: TweeehtBot): Observable<TweeehtBot> {
    this.logger.verbose(`Delete a TweeehtBot: ${deleteBot.name}`);

    return from(this.botModel.findByIdAndDelete(deleteBot.id).exec()).pipe(
      mapToBot()
    )
  }
}
