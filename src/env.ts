export default (async(env)=>{
  if(env !== 'development'){return console.log("生产环境")}
  const mock = await import("mockjs");
  mock.setup({
    "timeout":"500-2000",
  });
  mock.mock('/login','post',(req:any)=>{
    let obj = JSON.parse(req.body);
    if(obj.username==='admin'&&obj.password==='12345678'){
      return {
        name:"测试用户",
        role:"测试者",
      }
    }
    console.log(obj);
  });
})(process.env.NODE_ENV);