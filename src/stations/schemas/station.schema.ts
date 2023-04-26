import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from "mongoose";

@Schema()
export class Station extends Document{
  @Prop({ required: true, unique: true })
  id: number;

  @Prop({ required: true, index: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ default: "" })
  city: string;

  @Prop({ required: true })
  capacities: number;

  @Prop({ required: true })
  x: number;

  @Prop({ required: true })
  y: number;
}

export const StationSchema = SchemaFactory.createForClass(Station)