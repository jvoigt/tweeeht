import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class BotDocument extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  ownerNames: string[];
}

export const BotSchema = SchemaFactory.createForClass(BotDocument);