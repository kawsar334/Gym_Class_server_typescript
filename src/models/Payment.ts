

import mongoose, { Schema, model, Types,  } from 'mongoose';


enum PaymentStatus {
    SCHEDULED = 'pending',
    COMPLETED = 'Completed',
    CANCELLED = 'failed',
}

interface IPayment extends Document {
    date: Date;
    trainerId: Types.ObjectId; 
    amount: number;
    status: PaymentStatus;
} 

const classSchema = new Schema({
    date: { type: Date, required: true },
    trainerId: { type: Types.ObjectId, ref: 'Trainer', required: true },
    amount: { type: Number, required: true, default: 0 }, 
    status: { type: String, enum: Object.values(PaymentStatus), default: PaymentStatus.SCHEDULED },

},{
    timestamps: true,
})

const Payment = mongoose.model<IPayment>('ClassSchedule', classSchema);
export default Payment