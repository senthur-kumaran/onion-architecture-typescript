import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface Goal {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface GoalDoc extends Omit<Goal, 'id'>, Partial<Document> {
  _id: ObjectId;
}

export type GoalWithoutId = Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>;

export type GoalInput = {
  name: string;
}

export function mapGoalDoc(doc: GoalDoc): Goal {
  return {
    id: doc._id.toHexString(),
    name: doc.name,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  }
}