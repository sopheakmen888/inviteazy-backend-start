import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface Event extends Document {
  _id: string;
  name: string;
  dateTime: Date;
  location: string;
  description: string;
}

const eventSchema: Schema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    dateTime: { type: Date, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export const EventModel = mongoose.model<Event>("Event", eventSchema);
