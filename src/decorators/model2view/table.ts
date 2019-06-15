import * as View from '.';
import Vue, { VNode } from 'vue';
import { Table, Loading, TableColumn } from 'element-ui';
import { KeysWhichValueTypeIs, ClassOf, Render, mayHaveValueTyped } from 'types/types';

export const symbol: unique symbol = Symbol("table");
export function conver<
  I extends InstanceType<C>
  & mayHaveValueTyped<I, () => string[]>
  ,C extends ClassOf<I>
  & mayHaveValueTyped<C, (selection: I[]) => void>
>(klass: C, opt: {
  key: KeysWhichValueTypeIs<I, string>,
  request: (opt: {
    start: number,
    length: number,
  }) => Promise<{
    data: I[],
    total: number,
  }>,
  rowClassName?: KeysWhichValueTypeIs<I, () => string[]>,
  onselectionchange?: KeysWhichValueTypeIs<typeof klass, (selection: I[]) => void>,
}): ReturnType<typeof View.conver> {
  let renderArr = (Reflect.getMetadata(symbol, klass) || []) as Render[];
  return Vue.extend({
    render(create, ...args): VNode {
      return create(Table, {
        props: {
          data: this.data,
          rowKey: opt.key,
          rowClassName: this.rowClassName,
        },
        on: {
          onselectionchange(selection: I[]) {
             let key = opt.onselectionchange;
             if (key) { let m = klass[key](selection) }
          },
        },
        ref: "ref",
      }, renderArr.map((render) => render(create, ...args)));
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
      },
    },
    async mounted() {
      let table = (this.$refs['ref'] as Vue).$el as HTMLElement;
      let loading = Loading.service({ target: table, text: "数据加载中" });
      let response = await opt.request({ start: 0, length: 10 });
      this.total = response.total;
      this.data.splice(0, this.data.length, ...response.data);
      loading.close();
    }
  })
}

type tableItemOption = {
  label: string,
  showFilter?: boolean,
};
export function tableColumn(arg: Render): <I extends { [pro in keyof I]: any }>(target: I, key: keyof I) => void;
export function tableColumn(arg: tableItemOption): <I extends { [pro in keyof I]: any }>(target: I, key: keyof I) => void;
export function tableColumn(arg: Render | tableItemOption) {
  return <I extends
    & { [K in KeysWhichValueTypeIs<I, () => string>]: () => string }
  >(target: I, key: KeysWhichValueTypeIs<I, () => string>) => {
    let renderArr = Reflect.getMetadata(symbol, target.constructor) as Render[];
    if (!renderArr) { Reflect.defineMetadata(symbol, renderArr = [], target.constructor) }
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
              default(props: { row: I }) {
                return create('div', props.row[key]())
              }
            }
          })
        }
      } else {
        render = (create, context) => {
          return create(TableColumn, {
            props: {
              label: arg.label,
              prop: key,
            },
          })
        }
      }
    }
    renderArr.push(render);
  };
};