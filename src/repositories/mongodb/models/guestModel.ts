import { Schema, model, Document } from 'mongoose';

export interface IGuest extends Document {
  name: string;
  email: string;
  eventId: string;
  response: 'attending' | 'not attending' | 'maybe'; // Pre-event status
  contribution: number; // Contribution for post-event
}

const guestSchema = new Schema<IGuest>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  eventId: { type: String, required: true },
  response: { type: String, enum: ['attending', 'not attending', 'maybe'], default: 'maybe' },
  contribution: { type: Number, default: 0 },
});

const Guest = model<IGuest>('Guest', guestSchema);

export default Guest;
