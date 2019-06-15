import { VueConstructor } from 'vue';
import { ClassOf } from 'types/types';

export const symbol: unique symbol = Symbol("model2view");
export interface Interface {
  [symbol]: () => VueConstructor
}
export function conver<T extends Interface>(klass: ClassOf<T>) {
  return (klass.prototype as T)[symbol]();
}