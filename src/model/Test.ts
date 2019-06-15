import * as Table from "@/decorators/model2view/table";
import { TableColumn } from 'element-ui';


class A {
  @Table.tableColumn({ label: '方法' })
  str2() {
    return this.str + "2"
  }
  @Table.tableColumn((create, context) => {
    return create(TableColumn, {
      props: {
        label: "自定义模板"
      },
      scopedSlots: {
        default(props: { row: A }) {
          return create('div', props.row.str);
        }
      }
    });
  })
  str!: string;
  str3() {
    return ["testClass"];
  }
}
export default Table.conver(A, {
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