import { tableModel, tableColumn } from "@/decorators/model2view/table";
import { getModelView } from '@/decorators/model2view';
@tableModel({
  key: 'str',
  rowClassName: 'str3',
  async request() {
    return {
      data: [5, 7, 9].map((i) => {
        let a = new A();
        a.str = i + "Num";
        return a;
      }),
      total: 0,
    }
  }
})
class A {
  @tableColumn({ label: '方法' })
  str2() {
    return this.str + "2"
  }
  @tableColumn({ label: '字符串' })
  str!: string;
  str3() {
    return ["testClass"];
  }
}
export default getModelView(A);

type KeysWhichValueTypeIs<C, ValueType> = {
  [K in keyof C]: C[K] extends ValueType ? K : never
}[keyof C];

let a: KeysWhichValueTypeIs<A, () => (string)> = 'str2'
let b = new A()[a]