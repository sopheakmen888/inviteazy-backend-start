import {
    Event,
    EventRepository,
    EventService,
  } from "../interfaces/eventsInterface";
  
  export class EventServiceImpl implements EventService {
    constructor(private eventRepository: EventRepository) {}
  
    async getAllEvents(): Promise<Event[]> {
      return await this.eventRepository.findAll();
    }
  
    async getEventById(id: string): Promise<Event> {
      const event = await this.eventRepository.findById(id);
      if (!event) {
        throw Object.assign(new Error("Event not found"), { status: 404 });
      }
      return event;
    }
  
    async createEvent(event: Omit<Event, "id">): Promise<{ event: Event }> {
      const newEvent = await this.eventRepository.create(event);
      return { event: newEvent };
    }
  }
  