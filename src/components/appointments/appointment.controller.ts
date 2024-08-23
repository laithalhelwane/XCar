import { Request, Response } from 'express';
import {
  changeAppointmentStatusInput,
  createAppointmentInput,
  deleteAppointmentsInput,
} from './appointment.schema';
import {
  createAppointmentService,
  getAppointmentService,
  getNotificationService,
  changeAppointmentStatusService,
  deleteAppointmentService,
} from './appointement.service';

export async function createAppointmentController(
  req: Request<{}, {}, createAppointmentInput['body']>,
  res: Response
) {
  try {
    const appointment = await createAppointmentService({
      ...req.body,
      sender: req.user!._id,
    });
    if (!appointment) {
      return res
        .status(404)
        .json({ response: 0, message: 'Car is not found', data: {} });
    }
    return res
      .status(201)
      .json({ response: 1, message: '', data: appointment });
  } catch (error: any) {
    return res
      .status(409)
      .json({ response: 0, message: error.message, data: {} });
  }
}
export async function getAppointmentsController(req: Request, res: Response) {
  try {
    const received = await getAppointmentService({
      receiver: req.user?._id,
      status: 'accepted',
    });
    const sent = await getAppointmentService({
      sender: req.user?._id,
      status: 'accepted',
    });

    return res
      .status(200)
      .json({ response: 1, message: '', data: { received, sent } });
  } catch (error: any) {
    return res
      .status(409)
      .json({ response: 0, message: error.message, data: {} });
  }
}
export async function getNotificationsController(req: Request, res: Response) {
  try {
    const appointments = await getNotificationService({
      receiver: req.user?._id,
      status: 'pending',
    });

    return res
      .status(200)
      .json({ response: 1, message: '', data: appointments });
  } catch (error: any) {
    return res
      .status(409)
      .json({ response: 0, message: error.message, data: {} });
  }
}
export async function changeAppointmentStatusController(
  req: Request<
    changeAppointmentStatusInput['params'],
    {},
    changeAppointmentStatusInput['body']
  >,
  res: Response
) {
  try {
    const appointment = await changeAppointmentStatusService(
      { _id: req.params._id },
      req.body
    );
    if (!appointment) {
      return res
        .status(404)
        .json({ response: 0, message: 'Appointment is not found', data: {} });
    }
    return res
      .status(200)
      .json({ response: 1, message: '', data: appointment });
  } catch (error: any) {
    return res
      .status(409)
      .json({ response: 0, message: error.message, data: {} });
  }
}
export async function deleteAppointmentController(
  req: Request<deleteAppointmentsInput['params']>,
  res: Response
) {
  try {
    const appointment = await deleteAppointmentService({
      _id: req.params._id,
      $and: [{ $or: [{ sender: req.user?._id }, { receiver: req.user?._id }] }],
    });
    if (!appointment) {
      return res
        .status(404)
        .json({ response: 0, message: 'Appointment is not found', data: {} });
    }
    return res
      .status(200)
      .json({ response: 1, message: '', data: appointment });
  } catch (error: any) {
    return res
      .status(409)
      .json({ response: 0, message: error.message, data: {} });
  }
}
