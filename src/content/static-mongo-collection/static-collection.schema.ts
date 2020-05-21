import { Document, Schema } from 'mongoose';
import { User } from 'users/user.interface';

export interface StaticCollection extends Document {
    lines: string[];
    medias: string[];
    name: string;
    owners: User[];
}

export const StaticCollectionSchema = new Schema({
    lines: {
        required: true,
        type: [String],
    },
    medias: {
        required: true,
        type: [String],
    },
    name: {
        required: true,
        type: String,
        unique: true,
    },
    owners: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});
