
import mongoose, { Schema, model, Types,  } from 'mongoose';


enum ClassStatus {
    SCHEDULED = 'Scheduled',
        COMPLETED = 'Completed',
        CANCELLED = 'Cancelled',
}


interface IClassSchedule extends Document {
    date: Date;
    timeSlot: string;
    trainerId: Types.ObjectId; // Reference to Trainer model
    availableSlots: number;
    classDuration: number;
    trainees: Types.ObjectId[]; 
    status: ClassStatus;
}

const classSchema = new Schema({
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true }, // Example: "10:00 AM - 12:00 PM"
    trainerId: { type: Types.ObjectId, ref: 'Trainer', required: true },
    availableSlots: { type: Number, required: true, default: 10 }, // Max 10 trainees
    classDuration: { type: Number, required: true, default: 2 }, // Duration in hours
    trainees: [{ type: Types.ObjectId, ref: 'User', default: [] }],
    status: { type: String, enum: Object.values(ClassStatus), default: ClassStatus.SCHEDULED },

},{
    timestamps: true,
})

const ClasShedule = mongoose.model<IClassSchedule>('ClassSchedule', classSchema);


export default ClasShedule