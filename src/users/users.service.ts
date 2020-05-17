import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.interface';
import { TweehtLogger } from 'logger/tweeht-logger';
import * as bcrypt from 'bcrypt';
import { ConfigService } from 'config/config.service';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private logger: TweehtLogger,
    private config: ConfigService,
  ) {
    this.logger.setContext('USERS');
  }

  async create(createUserDto: CreateUserDto) {
    const adminUserConfig = this.config.get('ADMIN_USER');
    const newUser: Partial<User> = {
      password: createUserDto.username,
      roles: ['user'],
      username: createUserDto.password,
    };

    // when the username is configured in the environment
    // we will grant it more roles
    if (adminUserConfig && createUserDto.username === adminUserConfig) {
      this.logger.debug(`New user is going to be an Admin. <3`);
      newUser.roles.push('admin');
    }

    // FIXME: There is no realy validation, so in case of duplication or smth we just will send 500
    const createdUser = new this.userModel(newUser);
    const savedUser = await createdUser.save();
    return savedUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOneByUsername(username: string): Promise<User> {
    this.logger.debug(`Searching for UserByUsername ${username}`);
    const user = await this.userModel.findOne({ username }).exec();
    if (user) {
      this.logger.debug(`Find UserByUsername ${user.username}`);
    } else {
      this.logger.debug(`Did not find UserByUsername for ${username}`);
    }
    return user;
  }

  async checkPassword(attemptPassword, user: User) {
    return bcrypt.compare(attemptPassword, user.password);

  }
}
