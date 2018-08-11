/**
 * Created by user on 16/6/6.
 */
var LoginUrl = {

    //market/get-actions-by-status
    //{"status":"5"}

    /***
     * 获取验证码的接口,用于手机验证码登录
     * @param mobile 手机号
     * @returns {{url: string, type: string, param: {mobile: *}}}
     */
    sendVerifyCode(mobile){
        return {
            url:'/login/send-verify-code',
            type:'POST',
            param:{
                mobile:mobile,
            }
        }
    },
    /**
     * 用户登录接口(可用于验证码登录和账号登录)
     * @param mobile     手机号
     * @param verifyCode 验证码(如果是密码登录可不填此项)
     * @param password   密码  (如果是账号)
     * @param clientType 手机类型  3是IOS 
     * @returns {{url: string, type: string, param: {mobile: *, verifyCode: *, password: *, clientType: *}}}
     */
    loginWithCode(mobile,verifyCode,clientType){
        return {
            url:'/login/login-by-verify-code',
            type:'POST',
            param:{
                mobile:mobile,
                verifyCode:verifyCode,
                clientType:clientType,
            }
        }
    },
    loginWithPassword(mobile,password,clientType){
        return {
            url:'/login/login-by-mobile-pwd',
            type:'POST',
            param:{
                mobile:mobile,
                password:password,
                clientType:clientType,
            }
        }
    },
    /***
     * 注册
     * @param mobile      手机号
     * @param password    密码
     * @param verifyCode  验证码
     * @param regClientType  手机类型 3是IOS 4Android
     * @returns {{url: string, type: string, param: {mobile: *, password: *, verifyCode: *, regClientType: *}}}
     */
    register(mobile,password,verifyCode,regClientType){
        return {
            url:'/user/register',
            type:'POST',
            param:{
                user:{
                    mobile:mobile,
                    password:password,
                    regClientType:regClientType
                },
                verifyCode:verifyCode
            }
        }
    },
    /***
     * 找回密码
     * @param mobile      手机号
     * @param newPassword    密码
     * @param verifyCode  验证码
     * @returns {{url: string, type: string, param: {mobile: *, password: *, verifyCode: *, regClientType: *}}}
     */
    updatePassword(mobile,newPassword,verifyCode){
        return {
            url:'/user/update-password',
            type:'POST',
            param:{
                mobile:mobile,
                newPassword:newPassword,
                verifyCode:verifyCode
            }
        }
    },
    /***
     * 首页的广告banner
     * @param status 状态 默认传 5
     * @returns {{url: string, type: string, param: {status: *}}}
     */
    marketGetActions(status){
        return {
            url:'/market/get-actions-by-status',
            type:'POST',
            param:{
                status:status,
            }
        }
    },
    registerLogin(fun,userName,userPwd,uuid){
        return {
            url:'/register/mobile/register_mobile.php',
            type:'GET',//so far only GET available, I have no idea why.
            param:{
                username:userName,
                password:userPwd,
                uuid:uuid,
                function:fun,
            }
        }
    },

};

module.exports = LoginUrl;