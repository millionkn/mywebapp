import { tableModel, tableColumn } from "@/decorators/model2view/table";
import { getModelView } from '@/decorators/model2view';
@tableModel({
  key: 'str',
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
}
export default getModelView(A);