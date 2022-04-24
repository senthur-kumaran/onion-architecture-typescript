import { Goal, GoalWithoutId } from "../domain/goal";
import { goalRepository } from "../repository/goalRepository";

export interface GoalService {
  create(payload: GoalWithoutId): Promise<Goal>
  getAll(): Promise<Goal[]|[]>
  findOneByName(name: string): Promise<Goal>
  findById(id: string):  Promise<Goal>
  update(id: string, payload: GoalWithoutId): Promise<Goal>
  deleteById(id: string): Promise<Goal>
}

export const goalService = (): GoalService => {
  return {
    async create(payload: GoalWithoutId): Promise<Goal> {
      return goalRepository.create(payload);
    },

    async getAll(): Promise<Goal[]|[]> {
      return goalRepository.getAll();
    },

    async findOneByName(name: string): Promise<Goal> {
      return goalRepository.findOneByName(name);
    },

    async findById(id: string): Promise<Goal> {
      return goalRepository.findById(id);
    },

    async update(id: string, payload: GoalWithoutId): Promise<Goal> {
      return goalRepository.update(id, payload);
    },

    async deleteById(id: string): Promise<Goal> {
      return goalRepository.deleteById(id);
    },
  }
}