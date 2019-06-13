import { tableModel, tableColumn } from "@/decorators/table";

@tableModel({
  key: 'str2',
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
export default class A {
  @tableColumn({ label: '方法' })
  str2() {
    return this.str + "2"
  }
  @tableColumn({ label: '字符串' })
  str!: string;

}

