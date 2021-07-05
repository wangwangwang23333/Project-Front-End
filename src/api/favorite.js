/*
 * @Author: your name
 * @Date: 2021-07-05 20:16:52
 * @LastEditTime: 2021-07-05 23:33:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Project-Front-End\src\api\favorite.js
 */

import request from '@/utils/request'
import axios from 'axios'

export function getFavorite() {
  return request({
    url: '/CustomerFavorite',
    method: 'get',
  })
}
  

export function InsertFavorite(data) {
  let param=new URLSearchParams(data)
  
  return request({  
    url: '/CustomerFavorite',
    method: 'post',
    data:param
  })
}

// 还没有调通
// 调通了但返回false
export function DeleteFavorite(url, params) {
  console.log(url,params);
  return new Promise((resolve, reject) => {
      axios.delete(url, params)
          .then(res => {
              console.log(res);
              resolve(res.data);
              Loading.service(true).close();
              Message({message: '请求成功', type: 'success'});
          })
          .catch(err => {
              reject(err.data)
              Loading.service(true).close();
              Message({message: '加载失败', type: 'error'});
              // console.log("dead");
          })
  });
}



// export function getFavoriteImage(data){
  
// }

