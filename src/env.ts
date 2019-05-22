import mock from 'mockjs';

if(process.env.NODE_ENV === 'development'){
  console.log('development')
  mock.setup({
    timeout:'2000-6000',
  });
}