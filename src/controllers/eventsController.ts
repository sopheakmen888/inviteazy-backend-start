// src/controllers/eventController.ts

import { NextFunction, Request, Response } from "express";
import { Event, EventService } from "../interfaces/eventsInterface";

export class EventController {
  private eventService: EventService;

  constructor(eventService: EventService) {
    this.eventService = eventService;
  }

  async createEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, dateTime, location, description } = req.body;

      console.log(dateTime);
      const newEvent = await this.eventService.createEvent({
        name,
        dateTime,
        location,
        description,
      });

      res
        .status(201)
        .json({ message: "✅ A new event was created.", data: newEvent });
      return;
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async getAllEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.eventService.getAllEvents();
      res.json({ message: "📦 All events fetched.", data: result });
    } catch (error) {
      next(error);
    }
  }

  async getEventById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.eventService.getEventById(id);

      if (!result) {
        return res.status(404).json({ message: "❌ Event not found." });
      }

      res.json({ message: "📌 Event by ID", data: result });
    } catch (error) {
      next(error);
    }
  }
}
