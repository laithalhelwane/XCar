import { FilterQuery, UpdateQuery } from 'mongoose';
import CarModel from '../cars/car.model';
import appointmentModel, { AppointmentDocument } from './appointment.model';
import getMessaging from '../../util/firebase';
import { getSessionService } from '../sessions/session.service';
export async function createAppointmentService(
  appointementPayload: Omit<AppointmentDocument, '_id' | 'status' | 'receiver'>
) {
  try {
    const car = await CarModel.findById(appointementPayload.car);
    if (!car) {
      return null;
    }
    const appointment = await new appointmentModel({
      ...appointementPayload,
      receiver: car.owner,
    });
    const session = await getSessionService({ owner: car.owner });
    if (session) {
      await getMessaging().send({
        notification: {
          title: `New Appointment has requested`,
          body: `New Appointment request for ${car.model} on has been requested from you`,
          imageUrl: 'https://i.postimg.cc/Qt7qF4VV/app-icon.png',
        },
        token: session.fcmToken,
      });
    }
    await appointment.save();
    return appointment.toJSON();
  } catch (error: any) {
    throw new Error(error);
  }
}
export async function changeAppointmentStatusService(
  query: FilterQuery<AppointmentDocument>,
  update: UpdateQuery<AppointmentDocument>
) {
  try {
    const appointment = await appointmentModel.findOneAndUpdate(query, update, {
      lean: true,
      new: true,
    });
    return appointment;
  } catch (error: any) {
    throw new Error(error);
  }
}
export async function getAppointmentService(
  query: FilterQuery<AppointmentDocument>
) {
  try {
    const appointments = await appointmentModel.find(
      query,
      {},
      {
        populate: [
          { path: 'sender', select: ['name', 'avatar', 'phoneNumber'] },
          { path: 'receiver', select: ['name', 'avatar', 'phoneNumber'] },
        ],
        lean: true,
      }
    );
    return appointments;
  } catch (error: any) {
    throw new Error(error);
  }
}
export async function getNotificationService(
  query: FilterQuery<AppointmentDocument>
) {
  try {
    const appointments = await appointmentModel.find(
      query,
      {},
      {
        populate: [
          { path: 'sender', select: ['name', 'avatar', 'phoneNumber'] },
          { path: 'car', select: ['brand', 'model'] },
        ],
      }
    );
    return appointments;
  } catch (error: any) {
    throw new Error(error);
  }
}
export async function deleteAppointmentService(
  query: FilterQuery<AppointmentDocument>
) {
  try {
    const appointment = await appointmentModel.findOneAndDelete(query);
    return appointment;
  } catch (error: any) {
    throw new Error(error);
  }
}
