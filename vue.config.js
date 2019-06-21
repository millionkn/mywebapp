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
            app.use(require('express-session')({
                secret: "gflkdglkjeoi",
                saveUninitialized: false,
            }))
            let testData = require('./testData/jsonServer.js');
            let password = {};
            testData.persons.forEach(p => password[p.username] = '123456');
            app.post('/login', (req, res) => {
                let person = testData.persons.find(p => p.username === req.body.username);
                if (person && req.body.password === password[person.username]) {
                    if (testData.roles[person.roleId]) {
                        res.send(person);
                        req.session.person = person;
                    } else {
                        res.status(401).send({ message: "用户未审核" });
                    }
                } else {
                    res.status(403).send({ message: "用户名或密码错误" });
                }
            });
            app.post('/loginOut', (req, res) => {
                req.session.destroy();
                res.send(undefined);
            });
            app.use('/restAPI', require('json-server').router(testData));
        }
    }
}