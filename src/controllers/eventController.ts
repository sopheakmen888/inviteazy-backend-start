import { NextFunction, Request, Response } from "express";
import { IEventService } from "../interfaces/eventInterface";
import redisCache from "../services/cacheService"

export class EventController {
    private eventService: IEventService;

    constructor(eventService: IEventService) {
        this.eventService = eventService;
    }
    async getAllEvents(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.baseUrl, req.originalUrl);
            const events = await this.eventService.findAll();
            res.status(200).json({ status: "success", data: events });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
            next(error);
        }

    }
    async createNewEvent(eq: Request, res: Response, next: NextFunction) {
        try {
            const { user, name, description, datetime, location } = eq.body;
            const newEvent = await this.eventService.create({ user_id: user, event_name: name, event_datetime: datetime, event_location: location, event_description: description });
            res.status(201).json({ message: "Created new Event successfully", newEvent });
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
            next(error);
        }
    }
    async getEventById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const event = await this.eventService.findById(id);
            if (!event) {
                res.status(404).json({ message: "Event not found" });
                return;
            }
            res.status(200).json({ status: "success", data: event });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
            next(error);
        }

    }
    async updateEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const { user, name, description, datetime, location } = req.body;
            const updatedEvent = await this.eventService.update(id, { user_id: user, event_name: name, event_datetime: datetime, event_location: location, event_description: description });
            res.status(200).json({ message: "Updated Event successfully", updatedEvent });
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
            next(error);
        }
    }
    async deleteEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            await this.eventService.delete(id);
            res.status(200).json({ message: "Event deleted successfully" });
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
            next(error);
        }
    }


}
export default EventController;  // Export the controller class as a default export



