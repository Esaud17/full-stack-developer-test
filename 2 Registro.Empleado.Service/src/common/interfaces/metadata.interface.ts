import { Document } from 'mongoose';

export interface IMetadata extends Document {
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date;
}