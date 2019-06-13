import 'reflect-metadata';
import { Table, Loading, TableColumn } from 'element-ui';
import Vue, { VNode } from 'vue';
import { ComponentOptions } from 'vue/types/options';

type TableModel<Instance> = {
  new(...args: any[]): Instance;
};
type Render = NonNullable<ComponentOptions<Vue>['render']>;

type tableModelOpt<Instance> = {
  key: keyof Instance,
  request: (opt: {
    start: number,
    length: number,
  }) => Promise<{
    data: Instance[],
    total: number,
  }>;
}
const tableModelTemplateSymbol = Symbol('tableModel template');
export function tableModel<Instance>(opt: tableModelOpt<Instance>) {
  return (klass: TableModel<Instance>) => {
    let template = Vue.extend({
      render(create, ...args): VNode {
        let renders = Reflect.getMetadata(columnRenderSymbol, klass) as Render[]
        renders = renders || [];
        return create(Table, {
          props: {
            data: this.data
          },
          ref: "ref",
        }, renders.map(render => render(create, ...args)));
      },
      data() {
        return {
          data: [] as Instance[],
          total: 0 as number,
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
    });
    Reflect.defineMetadata(tableModelTemplateSymbol, template, klass);
  }
}

const columnRenderSymbol = Symbol('tableItem');
type tableItemOption = {
  label: string,
  showFilter?: boolean,
};
//type MDecorator<T> = (target: T, key: symbol | Exclude<keyof T, number>)=> void;
//export function tableColumn<T>(render: Render):MDecorator<T extends Object ? T :never>
//export function tableColumn<T>(opt: tableItemOption):MDecorator<T extends Object ? T :never>
export function tableColumn(arg: Render | tableItemOption) {
  return <Instance extends Object>(target: Instance, key: keyof Instance) => {
    let renders = Reflect.getMetadata(columnRenderSymbol, target.constructor) as Render[];
    if (!renders) { Reflect.defineMetadata(columnRenderSymbol, renders = [], target.constructor) }
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
export async function getModelView<T>(klass: Promise<{ default: TableModel<T> }>) {
  return Reflect.getMetadata(tableModelTemplateSymbol, (await klass).default) as ReturnType<typeof Vue.extend>
};