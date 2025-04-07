import { NextFunction, Request, Response } from "express";
import redisCache from "../services/cacheService";
import { IEvent, IEventService } from "../interfaces/eventInterface";
export class EventController {
  private eventService: IEventService;

  constructor(eventService: IEventService) {
    this.eventService = eventService;
  }

  async getAllEvents(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.baseUrl, req.originalUrl);

      const result = await this.eventService.getAllEvents();
      res.json({ message: "Get all events.", data: result });
      return;
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, date, time, location, description }: Omit<IEvent, "id"> =
        req.body;
      const newEvent = await this.eventService.createEvent({
        name,
        date,
        time,
        location,
        description,
      });
      res
        .status(201)
        .json({ message: "A new event was created.", data: newEvent });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
