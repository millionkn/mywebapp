import axios from 'axios';
import moment from 'moment';
import { tableModel, tableColumn } from '@/decorators/model2view/table';
import { getModelView } from '@/decorators/model2view';

type TimeStamp = number;
type TurnAround = number;
@tableModel<HomeInfo>({
  key: 'id',
  async request(opts: {}) {
    return (await axios.get('/data/console')).data as {
      data: HomeInfo[],
      total: 0,
    };
  }
})
class HomeInfo {
  id!: string;
  @tableColumn({ label: '科室', showFilter: true, }) office!: string;
  @tableColumn({ label: '名称', }) name!: string;
  @tableColumn({ label: '检修周期' }) inspectionTimes!: TurnAround;
  @tableColumn({ label: '警戒线' }) line!: TurnAround;
  private buyDate!: TimeStamp;
  //@tableColumn({ label: '购买日期' })
  [Symbol('buyDate')]() {
    return moment(this.buyDate).format("YYYY-M-D")
  }
  private lastCheck!: TimeStamp;
  //@tableColumn({ label: '最后检修日期' })
  [Symbol('LastCheck')]() {
    return moment(this.lastCheck).format("YYYY-M-D")
  }
  //@tableColumn({ label: '剩余(天)' })
  [Symbol('remainingTime')]() {
    let daysAfterLastCheck = Math.floor(moment.duration(new Date().valueOf() - this.lastCheck).asDays());
    return this.inspectionTimes - daysAfterLastCheck;
  }
}
export default getModelView(HomeInfo);