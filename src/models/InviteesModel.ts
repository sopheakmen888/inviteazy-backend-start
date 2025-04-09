import mongoose, { Schema, Document } from "mongoose";
import { z } from "zod";

export interface IInvitee extends Document {
    event_id: string; // FK to events(id)
    user_id: string; // FK to users(id)
    status: 'pending' | 'accept' | 'maybe' | 'no' | 'busy'; // ENUM
    qr_code: string; // URL
    is_checked_in: boolean; // default: false
    checked_in_at: Date | null; // nullable
    created_at?: Date; // default: now()
}

const inviteeSchema: Schema = new Schema(
    {
        event_id: { type: String, required: true },
        user_id: { type: String, required: true },
        status: { type: String, enum: ['pending', 'accept', 'maybe', 'no', 'busy'], required: true },
        qr_code: { type: String, required: true },
        is_checked_in: { type: Boolean, default: false },
        checked_in_at: { type: Date, default: null },
        created_at: { type: Date, default: Date.now }
    }
);

export const InviteeModel = mongoose.model<IInvitee>("Invitee", inviteeSchema);
