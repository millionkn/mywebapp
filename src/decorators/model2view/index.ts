import Vue from 'vue';
import { ComponentOptions } from 'vue/types/options';
export const RenderSymbol = Symbol('render');
export type Render = NonNullable<ComponentOptions<Vue>['render']>;

export function Model<Instance extends Object>(opt: ReturnType<typeof Vue.extend>): (klass: Instance) => void {
  return (klass: Instance) => Reflect.defineMetadata(RenderSymbol, opt, klass);
}
type Class<Instance> = { new(...args: any[]): Instance };
export function getModelView<T>(klass: Class<T>) {
  return Reflect.getMetadata(RenderSymbol, klass) as ReturnType<typeof Vue.extend>
};
