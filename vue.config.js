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
            app.use('/restAPI', require('json-server').router(require('./testData/jsonServer.js')));
        }
    }
}