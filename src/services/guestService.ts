import Guest from '../models/guestModel';

// Get all guests for an event
export const getGuestsByEventId = async (eventId: string) => {
  return await Guest.find({ eventId });
};

// Add a new guest
export const createGuest = async (guestData: { name: string, email: string, eventId: string, response: string, contribution: number }) => {
  const newGuest = new Guest(guestData);
  return await newGuest.save();
};
