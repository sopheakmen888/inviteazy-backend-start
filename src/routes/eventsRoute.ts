import { Router } from "express";
import { validateEvent } from "../middlewares/validationMiddleware";
import { EventController } from "../controllers/eventsController";

export default function EventsRoutes(controller: EventController): Router {
  const router = Router();

  router.post("/", validateEvent ,controller.createEvent.bind(controller));
  router.get("/getAll", controller.getAllEvents.bind(controller));

  return router;
}