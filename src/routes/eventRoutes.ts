import { Router } from "express";
import { EventController } from "../controllers/eventController"

export default function eventRouter(controller: EventController): Router {
    const router = Router();
    router.post("/create", controller.createNewEvent.bind(controller))
    router.get("/all", controller.getAllEvents.bind(controller))
    router.get("/:id", controller.getEventById.bind(controller))
    router.put("/:id", controller.updateEvent.bind(controller))
    router.delete("/:id", controller.deleteEvent.bind(controller))

    return router;

}