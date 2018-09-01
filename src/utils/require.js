import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import store from '../store/store';
import Cache from './cache';
import {Message,Loading} from 'element-ui';
import indexURL from './url';
import config from './config';
import router from '../router/router';


axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? config.url.localTestUrl : config.url.productUrl;

async function ajaxRequest(url = '', data = {}, type = 'POST', isJson = false) {
  type = type.toUpperCase();
  url = indexURL[url];
  let token = store.state.token || Cache.getSession('token');
//  	lang = store.state.lang || Cache.getSession('bier_lang');

  if (type === 'GET') {
    return axios.get(url, {headers:{token},params: data});
  } else if (type === 'POST') {
    if (isJson) {
      return axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          token
        },
      });
    }
    return axios.post(url, qs.stringify(data), {
      headers: {token}
    });
  } else if (type === 'PUT') {
    return axios.put(url, data, {
      headers: {'Content-Type': 'application/json', token},
    });
  } else if (type === 'DELETE') {
    return axios.delete(url, {headers:{token}, params: data});
  }
}
function requestHandle(params, callback, load = null, errCB, responseCB) {
  let {url, data, type, flag} = params;

  const loading = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  ajaxRequest(url, data, type, flag).then(
    res => {
      let {data, success, total, message} = res.data;
      // console.log('requestHandle-[%s]->', url, res.data);
      if (success === 1) {
        typeof callback === 'function' && callback(res.data);
      } else {
        if (res.data.data && res.data.data.islogin) {
          Cache.removeSession('username');
          Cache.removeSession('token');
          router.push({name: 'login'});
          Message.error({
            message:'别处登录'
          });
        } else if (res.data.data && res.data.data.iscontinue) {
          typeof responseCB === 'function' && responseCB(res);
        } else {
          typeof responseCB === 'function' && responseCB(res);
          Message.error({
            message,
          });
        }
      }
      loading.close();
      load && load.close();
    },
    rej => {
      typeof errCB === 'function' && errCB();
      console.error('[%s] error', url, rej);
      Message.error({message: '网络错误'});
      load && load.close();
    }
  );
}
export default {
  ajaxRequest,
  requestHandle,
}
;
