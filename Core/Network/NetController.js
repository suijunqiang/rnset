/**
 * Created by user on 16/5/27.
 */

import  React,{} from 'react-native';
import Network from './Network';
import Config from './Config';
import UserCache from '../Cache/UserCache';
export default class NetController {



    /***
     * 包含load,message,noWifi 的请求
     * @param fromPage 所在页面
     * @param UrlParam url和参数
     * @param successCallback  成功回调
     * @param failCallback     失败回调
     */
    static requestWithAll(fromPage,UrlParam,successCallback,failCallback){
        NetController.request(fromPage,UrlParam,successCallback,failCallback,true,true,true);
    }

    /***
     * 可以自由设置load,message,noWifi 的请求
     * @param fromPage 所在页面
     * @param UrlParam url和参数
     * @param successCallback  成功回调
     * @param failCallback     失败回调
     */
    static request(fromPage,UrlParam,successCallback,failCallback,isLoad,showMessage,isShowNoWifi){
        let baseUrl=Config().domain;
        NetController.requestWithBaseUrl(baseUrl,fromPage,UrlParam,successCallback,failCallback,isLoad,showMessage,isShowNoWifi);
    }

    /***
     * 登录模块的请求(包含登录,获取验证码,注册,找回密码)
     * @param fromPage 所在页面
     * @param UrlParam 请求
     * @param successCallback
     * @param failCallback
     */
    static loginRequestWithAll(fromPage,UrlParam,successCallback,failCallback){
        NetController.loginRequest(fromPage,UrlParam,successCallback,failCallback,true,true,true);
    }
    /***
     * 登录模块的请求,可以自由设置load,message,noWifi 的请求
     * @param fromPage 所在页面
     * @param UrlParam url和参数
     * @param successCallback  成功回调
     * @param failCallback     失败回调
     */
    static loginRequest(fromPage,UrlParam,successCallback,failCallback,isLoad,showMessage,isShowNoWifi){
        let baseUrl=Config().loginDomain;
        NetController.requestWithBaseUrl(baseUrl,fromPage,UrlParam,successCallback,failCallback,isLoad,showMessage,isShowNoWifi);
    }
    static RegisterRequest(fromPage,UrlParam,successCallback,failCallback,isLoad,showMessage,isShowNoWifi){
        let baseUrl=Config().registerUser;
        NetController.requestWithBaseUrl(baseUrl,fromPage,UrlParam,successCallback,failCallback,isLoad,showMessage,isShowNoWifi);
    }

    static requestWithBaseUrl(baseUrl,fromPage,UrlParam,successCallback,failCallback,isLoad,showMessage,isShowNoWifi){
        if(isLoad&&fromPage){
            fromPage.showLoad(isLoad);
        }
        console.log("SJQ requestWithBaseUrl");
        let xhr = Network.request(baseUrl,UrlParam,function (data,message) {
            console.log('************************' +
                '\n来源:'+(fromPage?fromPage.constructor.name:'无')+
                '\nResponse:' +
                '\nURL:'+UrlParam.url+
                '\nParam:'+JSON.stringify(UrlParam.param)+
                '\nmessage:'+message+
                '\ndata:'+JSON.stringify(data)+
                '\n************************');
            if(isLoad&&fromPage){
                fromPage.showLoad(false);
            }
            if(fromPage&&fromPage.state.isShowNoWifi){
                fromPage.showNoWifi(false);
            }
            if (successCallback){
                successCallback(data,message);
            }
        },function (code,message) {

            console.log('************************' +
                '\n来源:'+(fromPage?fromPage.constructor.name:'无')+
                '\nResponse:' +
                '\nURL:'+UrlParam.url+
                '\nParam:'+JSON.stringify(UrlParam.param),
                '\ncode:'+code,'message:'+message+
                '\n************************');

            if (code==5&&fromPage){ //当用户信息不正确的情况下,返回到首页
                fromPage.backToHome();
                UserCache.clear();
            }else{
                if(isLoad&&fromPage){
                    fromPage.showLoad(false);
                }
                if(showMessage&&!(isShowNoWifi&&code===-100)){
                    //Toast.showShortBottom(message);
                }
                if(fromPage&&isShowNoWifi&&code===-100){
                    fromPage.showNoWifi(true,NetController.request.bind(NetController,fromPage,UrlParam,successCallback,failCallback,isLoad,showMessage,isShowNoWifi));
                }else if(fromPage&&fromPage.state.isShowNoWifi){
                    fromPage.showNoWifi(false);
                }
                if (failCallback){
                    failCallback(code,message)
                }
            }

        });
        if(fromPage){
            fromPage.requestList.push(xhr);
        }

    }

}
