import { Request, Response } from 'express';
import Guest from '../models/guestModel';
import { IGuest } from '../models/guestModel';

// Pre-event Insights: Who's likely to attend
export const getPreEventInsights = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const guests = await Guest.find({ eventId, response: 'attending' });

    res.status(200).json({
      message: 'Pre-event insights fetched successfully',
      data: guests,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pre-event insights', error });
  }
};

// Post-event Insights: Who attended and total contributions
export const getPostEventInsights = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const guests = await Guest.find({ eventId, response: 'attending' });

    const totalContributions = guests.reduce((total, guest) => total + guest.contribution, 0);

    res.status(200).json({
      message: 'Post-event insights fetched successfully',
      data: {
        attendees: guests,
        totalContributions,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post-event insights', error });
  }
};

// Get All Guests for an Event
export const getAllGuests = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const guests = await Guest.find({ eventId });

    res.status(200).json({
      message: 'Guests fetched successfully',
      data: guests,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching guests', error });
  }
};

// Add Guest to an Event (Post)
export const addGuest = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const { name, email, response, contribution } = req.body;

    const newGuest = new Guest({
      name,
      email,
      eventId,
      response,
      contribution,
    });

    await newGuest.save();

    res.status(201).json({
      message: 'Guest added successfully',
      data: newGuest,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding guest', error });
  }
};
