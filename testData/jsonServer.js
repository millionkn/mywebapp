const moment = require('moment');
let dataValue = new Date().valueOf();
moment(dataValue).add({
  day: -4,
}).valueOf();
function rand(num) {
  return Math.floor(num * Math.random());
}
let drivers = [
  {
    id: 1,
    officeId: 0,
    name: "仪器A1",
    buyDate: dataValue,
    inspectionTimes: 7,
    line: 3,
  },
  {
    id: 2,
    officeId: 0,
    name: "仪器A2",
    buyDate: dataValue,
    inspectionTimes: 7,
    line: 7,
  },
  {
    id: 3,
    officeId: 1,
    name: "仪器B1",
    buyDate: dataValue,
    inspectionTimes: 7,
    line: 5,
  },
];
let suppliers = new Array(...Array(4)).map((n, id) => new Object({
  id,
  name: `经销商${id}`,
  businessLicense: `营业执照${id}`,
  medicalDeviceBusinessLicense: `医疗器械经营许可证编号${id}`,
}));
let offices = ["科室A", "科室B", "检修科"]
  .map((name, id) => new Object({
    name,
    id,
    personId: Math.floor(4 * Math.random()) - 1,
  }))

let roles = ["超管", "管理员", "员工"]
  .map((name, id) => new Object({ name, id }))
let persons = new Array(...Array(6))
  .map((n, id) => new Object({
    id,
    username: `username${id}`,
    name: `真实姓名${id}`,
    officeId: id >= offices.length ? -1 : id,
    roleId: id >= roles.length ? -1 : id,
  }));
let logs = new Array(...Array(8)).map((n, id) => ({
  id,
  personId: rand(persons.length),
  driverId: rand(drivers.length),
  date: moment(dataValue).add({
    day: 0 - rand(8),
  }).valueOf(),
  extra: `一段随机数:${Math.random() * 46}`
}));
module.exports = {
  drivers,
  suppliers,
  offices,
  roles,
  persons,
  logs,
}