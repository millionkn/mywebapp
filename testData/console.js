let moment = require('moment');
module.exports = [
  {
    id: 1,
    office: "科室A",
    name: "仪器A1",
    buyDate: new Date().valueOf(),
    lastCheck: new Date().valueOf(),
    inspectionTimes: 7,
    line: 3,
  },
  {
    id: 2,
    office: "科室A",
    name: "仪器A1",
    buyDate: new Date().valueOf(),
    lastCheck: moment().add({
      day: -4,
    }).valueOf(),
    inspectionTimes: 7,
    line: 3,
  },
  {
    id: 3,
    office: "科室B",
    name: "仪器B1",
    buyDate: new Date().valueOf(),
    lastCheck: moment().add({
      day: -6,
    }).valueOf(),
    inspectionTimes: 7,
    line: 5,
  },
]