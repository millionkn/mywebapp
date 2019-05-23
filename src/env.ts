export default (async(env)=>{
  if(env !== 'development'){return console.log("生产环境")}
  const mock = await import("mockjs");
  mock.setup({
    "timeout":"500-2000",
  });
})(process.env.NODE_ENV);