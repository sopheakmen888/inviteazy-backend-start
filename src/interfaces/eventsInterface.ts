// Event interface
export interface Event {
  _id: string;
  name: string;
  dateTime: Date;
  location: string;
  description: string;
}

// Repository layer
export interface EventRepository {
  findAll(): Promise<Event[]>;
  findById(id: string): Promise<Event | null>;
  create(event: Omit<Event, "_id">): Promise<Event>;
}

// Service layer
export interface EventService {
  getAllEvents(): Promise<Event[]>;
  getEventById(id: string): Promise<Event>;
  createEvent(event: Omit<Event, "_id">): Promise<{ event: Event }>;
}