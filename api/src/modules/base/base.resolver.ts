import { BaseModel } from './base.model'

export const baseModelResolver: Record<
  keyof BaseModel,
  (parent: BaseModel) => unknown
> = {
  id: (parent) => parent.id,
  createdAt: (parent) => parent.createdAt,
  updatedAt: (parent) => parent.updatedAt,
  deletedAt: (parent) => parent.deletedAt,
}
