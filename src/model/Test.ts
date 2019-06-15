import * as Table from "@/decorators/model2view/table";
import { TableColumn } from 'element-ui';
import { KeysWhichValueTypeIs } from 'types/types';


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
  static str3(selection: A[]) {
  };
  str4() {
    return ['testv']
  }
}
//let x:KeysWhichValueTypeIs<typeof A, (selection: A[]) => void>
export default Table.conver(A, {
  key: 'str',
  onselectionchange: 'str3',
  rowClassName: "str4",
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