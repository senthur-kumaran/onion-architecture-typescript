import { Request, Response, Router } from "express"
import { ResponseCodes } from "../config/responses";
import { asyncHandler } from "../infrastructure/middleware/async";
import { validateInputHandler } from "../infrastructure/middleware/validateInput"
import { GoalService } from "../service/goalService"
import { createGoalSchema } from "../validators/goalValidator"

const createGoal = (service: GoalService) => {
  return asyncHandler(async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
  
      const goal = await service.create({ name });
  
      res.status(ResponseCodes.CREATED)
        .send(goal);
      
    } catch (error: any) {
      res.status(400);
      throw new Error(error.message);
    }
  });
};

const getAllGoals = (service: GoalService) => {
  return asyncHandler(async (_req: Request, res: Response) => {
    try {
      const goals = await service.getAll();
  
      res.status(ResponseCodes.OK)
        .send(goals);
      
    } catch (error: any) {
      res.status(400);
      throw new Error(error.message);
    }
  });
};

const findGoalByName = (service: GoalService) => {
  return asyncHandler(async (req: Request, res: Response) => {
    try {
      const { name } = req.params;
  
      const goal = await service.findOneByName(name);
  
      res.status(ResponseCodes.OK)
        .send(goal);
      
    } catch (error: any) {
      res.status(400);
      throw new Error(error.message);
    }
  });
};

const findGoalById = (service: GoalService) => {
  return asyncHandler(async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      const goal = await service.findById(id);
  
      res.status(ResponseCodes.OK)
        .send(goal);
      
    } catch (error: any) {
      res.status(400);
      throw new Error(error.message);
    }
  });
};

const updateGoal = (service: GoalService) => {
  return asyncHandler(async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
  
      const goal = await service.update(id, { name });
  
      res.status(ResponseCodes.OK)
        .send(goal);
      
    } catch (error: any) {
      res.status(400);
      throw new Error(error.message);
    }
  });
};

const deleteGoal = (service: GoalService) => {
  return asyncHandler(async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      const goal = await service.deleteById(id);
  
      res.status(ResponseCodes.OK)
        .send(goal);
      
    } catch (error: any) {
      res.status(400);
      throw new Error(error.message);
    }
  });
};

export const goalRouter = (service: GoalService): Router => {
  return Router()
    .post('/goals', createGoalSchema, validateInputHandler(), createGoal(service))
    .get('/goals', getAllGoals(service))
    .get('/goal-by-name/:name', findGoalByName(service))
    .get('/goal/:id', findGoalById(service))
    .put('/goal/:id', updateGoal(service))
    .delete('/goal/:id', deleteGoal(service));
}