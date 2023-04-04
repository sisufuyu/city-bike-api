import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from "mongoose";

@Schema()
export class Journey extends Document {
  @Prop({ required: true })
  departure: Date;

  @Prop({ required: true })
  return: Date;

  @Prop({ required: true })
  departureStationId: number;

  @Prop({ required: true })
  departureStationName: string;

  @Prop({ required: true })
  returnStationId: number;

  @Prop({ required: true })
  returnStationName: string;

  @Prop({ required: true })
  coveredDistance: number;

  @Prop({ required: true })
  duration: number;
}

export const JourneySchema = SchemaFactory.createForClass(Journey);
JourneySchema.index({ departure: 1 })
