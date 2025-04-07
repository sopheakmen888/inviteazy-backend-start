import { Router } from "express";
import { eventSchema } from "../middlewares/validationMiddleware";
import { EventController } from "../controllers/eventController";

export default function eventRoutes(controller: EventController): Router {
  const router = Router();

  router.post("/events", controller.createUser.bind(controller));
//   router.get("/events", controller.getAllEvents.bind(controller));

  return router;
}
