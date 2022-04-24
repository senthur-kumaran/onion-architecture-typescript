import { model, Schema } from 'mongoose';
import { Goal, GoalDoc, GoalWithoutId, mapGoalDoc } from '../domain/goal';

export interface GoalRepository {
  create(payload: GoalWithoutId): Promise<Goal>
  getAll(): Promise<Goal[]|[]>
  findOneByName(name: string): Promise<Goal>
  findById(id: string):  Promise<Goal>
  update(id: string, payload: GoalWithoutId): Promise<Goal>
  deleteById(id: string): Promise<Goal>
}

const goalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const GoalModel = model('Goals', goalSchema);

const create = async (payload: GoalWithoutId): Promise<Goal> => {
  const goalDoc: GoalDoc = await GoalModel.create(payload);

  if (!goalDoc) {
    throw new Error('Goal not found');
  }

  return mapGoalDoc(goalDoc);
};

const getAll = async (): Promise<Goal[]|[]> => {
  const goalDocs: GoalDoc[] = await GoalModel.find({}).exec();

  if(!Array.isArray(goalDocs) || !Array.length) return [];

  return goalDocs.map(goalDoc => mapGoalDoc(goalDoc));
}

const findOneByName = async (name: string): Promise<Goal> => {
  const goalDoc: GoalDoc = await GoalModel.findOne({ "name": name }).exec();

  if (!goalDoc) {
    throw new Error('Goal not found');
  }

  return mapGoalDoc(goalDoc);
};

const findById = async (id: string): Promise<Goal> => {
  const goalDoc: GoalDoc = await GoalModel.findById(id).exec();

  if (!goalDoc) {
    throw new Error('Goal not found');
  }

  return mapGoalDoc(goalDoc);
};

const update = async (id: string, payload: GoalWithoutId): Promise<Goal> => {
  const goalDoc: GoalDoc = await GoalModel.findByIdAndUpdate(id, payload, { new: true }).exec();

  if (!goalDoc) {
    throw new Error('Goal not found');
  }

  return mapGoalDoc(goalDoc);
};

const deleteById = async (id: string): Promise<Goal> => {
  const goalDoc: GoalDoc = await GoalModel.findByIdAndDelete(id).exec();

  if (!goalDoc) {
    throw new Error('Goal not found');
  }

  return mapGoalDoc(goalDoc);
};

export const goalRepository: GoalRepository = {
  create,
  getAll,
  findOneByName,
  findById,
  update,
  deleteById,
};
