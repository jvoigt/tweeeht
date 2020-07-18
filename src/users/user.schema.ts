import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import { User } from './user.interface';

interface UserWithPassword extends User {
  password: string;
}

export const UserSchema = new mongoose.Schema({
  password: {
    type: String,
  },
  roles: {
    default: ['user'],
    required: true,
    type: [String],
  },
  username: {
    required: true,
    type: String,
    unique: true,
  },
});

// NOTE: Arrow functions are not used here as we do not want to use lexical scope for 'this'
UserSchema.pre('save', function (next) {
  const user = this as UserWithPassword;

  // Make sure not to rehash the password if it is already hashed
  if (!user.isModified('password')) {
    return next();
  }

  // Generate a salt and use it to hash the user's password
  bcrypt.genSalt(10, (errSalt, salt) => {
    if (errSalt) {
      return next(errSalt);
    }

    bcrypt.hash(user.password, salt, (errHash, hash) => {
      if (errHash) {
        return next(errHash);
      }
      user.password = hash;
      next();
    });
  });
});
