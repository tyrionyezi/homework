/**
 * Created by yezi on 2017/12/19.
 */

let baseurl;
if(process.env.NODE_ENV == 'development'){

  baseurl = '/mock';
  baseurl = '/api';
  baseurl = 'http://localhost:8686/api';
  baseurl = 'http://127.0.0.1:3000';
}else{
  baseurl =  window.URLCONF;
}

export {
  baseurl,
}
