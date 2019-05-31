let path = require("path");
module.exports={
    css:{
        loaderOptions:{
            less:{
                paths: [path.resolve(__dirname, 'node_modules')],
            }
        }
    },
    devServer:{
        port:3000,
    }
}