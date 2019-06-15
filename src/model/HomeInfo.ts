import axios from 'axios';
import moment from 'moment';
import * as Table from '@/decorators/model2view/table';

type TimeStamp = number;
type TurnAround = number;

class HomeInfo {
  id!: string;
  @Table.tableColumn({ label: '科室', showFilter: true, }) office!: string;
  @Table.tableColumn({ label: '名称', }) name!: string;
  @Table.tableColumn({ label: '检修周期' }) inspectionTimes!: TurnAround;
  @Table.tableColumn({ label: '警戒线' }) line!: TurnAround;
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
export default Table.conver(HomeInfo, {
  key: 'id',
  async request(opts) {
    return (await axios.get('/data/console')).data as {
      data: HomeInfo[],
      total: 0,
    };
  },
});