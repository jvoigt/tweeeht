import { Injectable } from '@nestjs/common';
import { ConfigService } from 'config/config.service';
import { Messager } from 'content/messager.interface';
import { TweehtLogger } from 'logger/tweeht-logger';
import { Observable, throwError } from 'rxjs';
import { TweeehtMessage } from 'tweeht-message.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StaticCollection } from './static-collection.schema';
import { CreateStaticCollectionDto } from './dto/static-collection.dto';
import { User } from 'users/user.interface';

@Injectable()
export class StaticMongoCollectionService implements Messager {
  moduleName = 'STATIC_MONGO_COLLECTION';

  constructor(
    private config: ConfigService,
    private readonly logger: TweehtLogger,
    @InjectModel('StaticCollection') private staticCollectionModel: Model<StaticCollection>,
  ) {
    this.logger.setContext(this.moduleName);
  }

  getMessage(): Observable<TweeehtMessage> {
    return throwError(new Error('Not yet implemented'));
  }

  async create(createStaticCollectionDto: CreateStaticCollectionDto, owners?: User[]): Promise<StaticCollection> {
    const newStaticCollection: Partial<StaticCollection> = {
      lines: createStaticCollectionDto.lines,
      medias: createStaticCollectionDto.medias,
      name: createStaticCollectionDto.name,
      owners: owners,
    };

    // FIXME: There is no realy validation, so in case of duplication or smth we just will send 500
    const createdUser = new this.staticCollectionModel(newStaticCollection);
    const savedUser = await createdUser.save();
    return savedUser;

  }

  async findAll(): Promise<StaticCollection[]> {
    return this.staticCollectionModel.find().exec();
  }

}
