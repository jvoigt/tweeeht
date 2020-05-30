import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from 'config/config.service';
import { Messager } from 'content/messager.interface';
import { TweehtLogger } from 'logger/tweeht-logger';
import { Model } from 'mongoose';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { TweeehtMessage } from 'tweeht-message.interface';
import { User } from 'users/user.interface';
import { CreateStaticCollectionDto } from './dto/create-static-collection.dto';
import { StaticCollection } from './static-collection.schema';

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

  create(createStaticCollectionDto: CreateStaticCollectionDto, owners?: User[]): Observable<StaticCollection> {
    const newStaticCollection: Partial<StaticCollection> = {
      lines: createStaticCollectionDto.lines,
      medias: createStaticCollectionDto.medias,
      name: createStaticCollectionDto.name,
      owners,
    };

    const createdStaticCollection = new this.staticCollectionModel(newStaticCollection);

    return from(
      createdStaticCollection.save()
    ).pipe(
      tap((savedStaticCollection) => console.log(savedStaticCollection)),
      catchError((error: any) => {
        // FIXME: There is no real validation
        // so in case of duplication or smth we just will send 409
        // and the raw message...
        return throwError(
          new HttpException({
            error: error.message,
            status: error.code,
          }, HttpStatus.CONFLICT)
        )
      }),
      map((savedStaticCollection: StaticCollection) => {
        if (savedStaticCollection) {
          return savedStaticCollection.depopulate();
        }
        throwError(new HttpException('unknown', HttpStatus.INTERNAL_SERVER_ERROR))
      })
    )


  }

  findAll(): Observable<StaticCollection[]> {
    return from(this.staticCollectionModel.find().exec());
  }

  findOnebyId(id: string): Observable<StaticCollection> {
    return from(
      this.staticCollectionModel
        .findById(id)
        .exec()
    ).pipe(
      catchError((error => {
        // FIXME: potencial Errors: CastError when id is malformed
        return throwError(
          new HttpException({
            error: error.message,
            status: error.code,
          }, HttpStatus.NOT_FOUND)
        )
      })),
      map((foundStaticCollection) => {
        if (!foundStaticCollection) {
          throw new NotFoundException();
        }
        return foundStaticCollection;
      })
    )
      ;
  }

  findOnebyName(name: string): Observable<StaticCollection> {
    return from(
      this.staticCollectionModel
        .findOne({ name })
        .exec()
    );
  }

  updateOne(id: string, createStaticCollectionDto: CreateStaticCollectionDto): Observable<StaticCollection> {
    return this.findOnebyId(id).pipe(
      switchMap((oldStaticCollection: StaticCollection) => {
        if (!oldStaticCollection) {
          throwError(new HttpException('Not found', HttpStatus.NOT_FOUND))
        }
        const updatedStaticCollection = this.staticCollectionModel.updateOne(
          { _id: oldStaticCollection._id }, createStaticCollectionDto
        );
        return from(updatedStaticCollection.exec())

        // return from(
        //   updatedStaticCollection.
        // ).pipe(
        //   tap((savedStaticCollection) => console.log(savedStaticCollection)),
        //   catchError((error: any) => {
        //     // FIXME: There is no real validation
        //     // so in case of duplication or smth we just will send 409
        //     // and the raw message...
        //     return throwError(
        //       new HttpException({
        //         error: error.message,
        //         status: error.code,
        //       }, HttpStatus.CONFLICT)
        //     )
        //   }),
        //   map((savedStaticCollection: StaticCollection) => {
        //     if (savedStaticCollection) {
        //       return savedStaticCollection.depopulate();
        //     }
        //     throwError(new HttpException('unknown', HttpStatus.INTERNAL_SERVER_ERROR))
        //   })
        // )

      }
      )
    )
  }

}
