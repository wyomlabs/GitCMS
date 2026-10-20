import { z } from 'zod'

const functionSchema = z.function()

export function isFunction(value: unknown): value is (...args: never[]) => void {
  return functionSchema.safeParse(value).success
}
