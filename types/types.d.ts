import Vue, { ComponentOptions } from "vue";
declare type KeysWhichValueTypeIs<C, ValueType> = {
  [K in keyof C]: C[K] extends ValueType ? K : never
}[keyof C];
declare type ClassOf<I> = {
  new(...args: any[]): I
};
declare type Render = NonNullable<ComponentOptions<Vue>['render']>;
declare type mayHaveValueTyped<I, T> = {
  [X in KeysWhichValueTypeIs<I, T>]: T
}
declare type mustHaveValueTyped<I extends NonNullable<KeysWhichValueTypeIs<T, string>>, T> = {
  [X in KeysWhichValueTypeIs<I, T>]: T
}