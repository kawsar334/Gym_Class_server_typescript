import { Schema, model, } from 'mongoose';
import { HydratedDocument } from 'mongoose';



export enum UserRole {
  ADMIN = "admin",
  TRAINER = "trainer",
  TRAINEE = "trainee",
}


export interface  IUser extends Document {
  name: string;
  email: string;
  avatar?: string;
  password: string
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  avatar: String,
  role: { type: String, enum: UserRole, default: UserRole.TRAINEE },
  // createdAt: { type: Date, default: Date.now },
}, { timestamps: true }) 


const User = model<IUser>('User', userSchema);

export default User; 