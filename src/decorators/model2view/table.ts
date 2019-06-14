import Vue, { VNode } from 'vue';
import { Loading } from 'element-ui';
import { Model, Render } from './index';
import { Table, TableColumn } from 'element-ui';

type Class<Instance> = { new(...args: any[]): Instance };
type KeysWhichValueTypeIs<C, ValueType> = {
  [K in keyof C]: C[K] extends ValueType ? K : never
}[keyof C];
type TableOpt<Instance> = {
  key: KeysWhichValueTypeIs<Instance, string>,
  request: (opt: {
    start: number,
    length: number,
  }) => Promise<{
    data: Instance[],
    total: number,
  }>,
  rowClassName?: KeysWhichValueTypeIs<Instance, () => (string[])>,
};
export const TableSymbol = Symbol('table');
export function tableModel<I extends
  & { [X in KeysWhichValueTypeIs<I, () => (string[])>]: () => (string[]) }
>(opt: TableOpt<I>) {
  return (klass: Class<I>) => {
    let renders = (Reflect.getMetadata(TableSymbol, klass) || []) as Render[];
    Model(Vue.extend({
      render(create, ...args): VNode {
        return create(Table, {
          props: {
            data: this.data,
            rowKey: opt.key,
            rowClassName: this.rowClassName
          },
          ref: "ref",
        }, renders.map(render => render(create, ...args)));
      },
      data() {
        return {
          data: [] as I[],
          total: 0 as number,
        }
      },
      methods: {
        rowClassName(args: { row: I, rowIndex: string }) {
          if (opt.rowClassName) {
            return args.row[opt.rowClassName]()
          }
        }
      },
      async mounted() {
        let table = (this.$refs['ref'] as Vue).$el as HTMLElement;
        let loading = Loading.service({ target: table, text: "数据加载中" });
        let response = await opt.request({ start: 0, length: 10 });
        this.total = response.total;
        this.data.splice(0, this.data.length, ...response.data);
        loading.close();
      }
    }))(klass);
  }
};


type tableItemOption = {
  label: string,
  showFilter?: boolean,
};
export function tableColumn(arg: Render): <Instance extends { [pro in keyof Instance]: any }>(target: Instance, key: keyof Instance) => void
export function tableColumn(arg: tableItemOption): <Instance extends { [pro in keyof Instance]: any }>(target: Instance, key: keyof Instance) => void
export function tableColumn(arg: Render | tableItemOption) {
  return <Instance extends { [pro in keyof Instance]: any }>(target: Instance, key: keyof Instance) => {
    let renders = Reflect.getMetadata(TableSymbol, target.constructor) as Render[];
    if (!renders) { Reflect.defineMetadata(TableSymbol, renders = [], target.constructor) }
    let render: Render;
    if (typeof arg === 'function') {
      render = arg;
    } else {
      if (typeof target[key] === 'function') {
        render = (create, context) => {
          return create(TableColumn, {
            props: {
              label: arg.label
            },
            scopedSlots: {
              default(props) {
                return create('div', props.row[key]())
              }
            }
          });
        }
      } else {
        render = (create, conext) => {
          return create(TableColumn, {
            props: {
              label: arg.label,
              prop: key,
            },
          });
        }
      }
    }
    renders.push(render);
  };
};