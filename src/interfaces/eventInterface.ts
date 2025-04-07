export interface IEvent {
    id?: string;
    name: string;
    date: Date;
    time: string;
    location: string;
    description?: string; 
  }
  
  export interface IEventWithoutId extends Omit<IEvent, 'id'> {}
  
  export interface IEventRepository {
    findAll(): Promise<IEvent[]>;
    findById(id: string): Promise<IEvent | null>;
    findByName(name: string): Promise<IEvent | null>;
    create(event: IEventWithoutId): Promise<IEvent>;
  }
  
  export interface IEventService {
    getAllEvents(): Promise<IEvent[]>;
    getEventById(id: string): Promise<IEvent>;
    createEvent(
      event: IEventWithoutId
    ): Promise<{ event: IEvent }>
  }
  