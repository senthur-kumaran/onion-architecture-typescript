import { Router } from "express";
import { GoalService } from "../service/goalService";
import { goalRouter } from "./goalRoute";

export interface Services {
  goalService: GoalService;
}

export const createRouter = (services: Services): Router => {
  const router = Router();

  router.use(goalRouter(services.goalService));

  return router;
}