import { Schema, model, Types } from 'mongoose';
import { CarDocument } from '../cars/car.model';
import { UserDocument } from '../users/user.model';

export interface AppointmentDocument {
  _id?: Types.ObjectId;
  status: string;
  car: CarDocument | string;
  sender: UserDocument | string;
  receiver: UserDocument | string;
  date: string;
}
const appointmentSchema = new Schema<AppointmentDocument>(
  {
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: 'Car',
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const appointmentModel = model<AppointmentDocument>(
  'Appointment',
  appointmentSchema
);
export default appointmentModel;
