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
                res.send(require("./testData/console.js"));
            });
            app.get('/data/users', (req, res) => {
                res.send(require("./testData/users.js"));
            });
            app.get('/data/suppliers', (req, res) => {
                res.send(require("./testData/suppliers.js"));
            });
        }
    }
}