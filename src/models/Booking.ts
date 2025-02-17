import mongoose, { Schema, Document, Types } from 'mongoose';


enum BookingStatus{
    ACTIVE = 'Active',
    CANCELLED = 'Cancelled',
    COMPLETED = 'Completed',
};


interface IBooking extends Document {
    traineeId:string,
    scheduleId: string,
    bookingDate: Date,
    status: BookingStatus,
    
};

const bookingScheema = new Schema<IBooking>({
    traineeId: { type: String, ref: 'User', required: true }, 
    scheduleId: { type: String, ref: 'ClassSchedule', required: true },
    bookingDate: { type: Date, default: Date.now, required: true }, 
    status: { type: String, enum: Object.values(BookingStatus), default: BookingStatus.ACTIVE }
});


const Booking = mongoose.model<IBooking>("Booking",bookingScheema);

export default Booking ;