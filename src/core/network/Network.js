

import React, {
    Dimensions,
    Platform,
} from 'react-native';
import UserCache from '../cache/UserCache';
var DeviceInfo = require('react-native-device-info');
import Config from './Config'

export default class Network {

    static request(baseUrl,UrlParam,successCallback,failCallback){
        let url=UrlParam.url;
        let param=UrlParam.param;
        
        if (UrlParam.type==='GET'){
            console.log("Http GET");
            if(param){
                url = url+'?'
                for (let key of Object.keys(param)) {
                    url = url+encodeURIComponent(key)+'='+encodeURIComponent(param[key])+'&';
                }
                if (url.endsWith('&')){
                    url = url.substring(0,url.length-1);
                }
            }
            return Network.connect(baseUrl,UrlParam.type,url,null,successCallback,failCallback);
        }else {
            console.log("Http POST");
            return Network.connect(baseUrl,UrlParam.type,url,param,successCallback,failCallback);
        }
    }

    static connect(baseUrl,type,url,param,successCallback,failCallback){
        let requestUrl=baseUrl+url;
        let userAgent = {
            /*
            *%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
            * Attention here!
            * After npm install react-native-device-info
            * You have to run this react-native link react-native-device-info
            * if not follow actions will be failed.
            * %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
             */
            appVersion:DeviceInfo.getVersion(),
            buildVersion:DeviceInfo.getBuildNumber(),
            networkStatus:'',
            uuid:DeviceInfo.getUniqueID(),
            channel:(Platform.OS==='ios'?Config().channelIdIOS:Config().channelIdAndroid),
            mobelName:DeviceInfo.getDeviceId(),
            osVersion:DeviceInfo.getSystemVersion(),
            reOsVersion:DeviceInfo.getUserAgent(),
        }
        let xhr = new XMLHttpRequest();

        UserCache.getToken().then((TOKEN)=>{

            console.log('************************' +
                '\nRequest:' +
                '\nURL:'+(requestUrl+(requestUrl.indexOf('?')===-1?'?':'&')+'TOKEN='+TOKEN)+
                '\nParam:'+JSON.stringify(param) +
                '\nuserAgent:'+JSON.stringify(userAgent)+
                '\n************************');
            xhr.open(type,requestUrl,true);
            xhr.timeout = 15000;
            xhr.setRequestHeader("Content-Type",'application/json');
            xhr.setRequestHeader("Accept",'application/json');
            xhr.setRequestHeader("userAgent",JSON.stringify(userAgent));
            //xhr.setRequestHeader("TOKEN",TOKEN);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                    let response = xhr.responseText;
                    //let obj = JSON.parse(response);
                    let obj = eval('(' +response+')');
                    let resopnse = obj.response?obj.response:obj;
                    if(resopnse){
                        if(resopnse.code == 0){
                            if (successCallback){
                                successCallback(resopnse.data,resopnse.message);
                            }
                        }else{
                            if (failCallback){
                                failCallback(resopnse.code,resopnse.message)
                            }
                        }
                    }else{
                        console.log(xhr.responseText);
                        if (failCallback){
                            failCallback(-100,'网络请求失败')
                        }
                    }
                }else{
                    if(xhr.status !== 200&&!xhr._aborted){
                        console.log(xhr.responseText);
                        if (failCallback){
                            failCallback(-100,'网络请求失败')
                        }
                    }
                }
            };
            if (param){
                xhr.send(JSON.stringify(param));
            }else
            {
                xhr.send();
            }
        });



        return xhr;
    }

}
