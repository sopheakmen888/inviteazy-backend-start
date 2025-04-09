import {
    IEvent,
    IEventRepository,
    IEventService,
    IEventCreate,
    
} from "../interfaces/eventInterface";

export class EventService implements IEventService {
    private eventRepository: IEventRepository;

    constructor(eventRepository: IEventRepository) {
        this.eventRepository = eventRepository;
    }

    async create(eventCreate: IEventCreate): Promise<IEvent> {
        const event = await this.eventRepository.create(eventCreate);
        return event;
    }
    async findById(id: string): Promise<IEvent | null> {
        const event = await this.eventRepository.findById(id);
        return event;
    }

   

    async findAll(): Promise<IEvent[]> {
        const events = await this.eventRepository.findAll();
        return events;
    }

    // Update an existing event
   

    // Delete an event
    async delete(id: string): Promise<void> {
        await this.eventRepository.delete(id);
    }
    async update(id: string, event: IEventCreate): Promise<IEvent | null> {
        const updatedEvent = await this.eventRepository.update(id, event);
        return updatedEvent;
    }
}

export default EventService;
