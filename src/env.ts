export default (async (env) => {
  if (env !== 'development') { return console.log("生产环境") }
  const mock = await import("mockjs");
  const moment = (await import("moment")).default;
  mock.setup({
    "timeout": "500-2000",
  });
  mock.mock('/data/console', () => {
    return [
      {
        office: "科室A",
        name: "仪器A1",
        buyDate: new Date().valueOf(),
        lastCheck: new Date().valueOf(),
        inspectionTimes: 7,
        line: 3,
      },
      {
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
  })
})(process.env.NODE_ENV);