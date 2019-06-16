let moment = require('moment');
let path = require("path");
let bodyParser = require('body-parser');
module.exports = {
    css: {
        loaderOptions: {
            less: {
                paths: [path.resolve(__dirname, 'node_modules')],
            }
        }
    },
    devServer: {
        port: 3000,
        before(app, server) {
            app.use(bodyParser.urlencoded({ extended: false }));
            app.use(bodyParser.json());
            app.post('/login', (req, res) => {
                if (req.body.username === 'admin' && req.body.password === '12345678') {
                    res.send({
                        name: "测试用户",
                        role: "测试者",
                    })
                } else {
                    res.sendStatus(403)
                }
            });
            app.post('/loginOut', (req, res) => { res.send(undefined) });
            app.get('/data/console', (req, res) => {
                res.send([
                    {
                        id : 1,
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
                ])
            });
        }
    }
}