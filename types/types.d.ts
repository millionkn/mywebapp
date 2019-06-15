import Vue, { ComponentOptions } from "vue";
declare type KeysWhichValueTypeIs<C, ValueType> = {
  [K in keyof C]: C[K] extends ValueType ? K : never
}[keyof C];
declare type ClassOf<I> = {
  new(...args: any[]): I
};
declare type Render = NonNullable<ComponentOptions<Vue>['render']>;