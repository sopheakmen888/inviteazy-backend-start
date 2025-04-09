import mongoose, { Schema, Document } from "mongoose";


export interface IEvent extends Document{
    id?: number;
    user_id:string;
    event_name: string;
    event_datetime: string;
    event_location: string;
    event_description: string;
    created_at?:Date;
    updated_at?:Date;

}

const eventSchema:Schema=new Schema(
    {
        user_id: {type:String,required:true},
        event_name: {type:String,required:true},
        event_datetime: {type:String,required:true},
        event_location: {type:String,required:true},
        event_description: {type:String,required:true},
        created_at: {type:Date,default:Date.now},
        updated_at: {type:Date,default:Date.now}
        },
        {
            timestamps: true,
            collection: 'events'
            }
        
)
export const eventModel= mongoose.model<IEvent>('Event',eventSchema);  