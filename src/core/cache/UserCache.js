
import React, {
    AsyncStorage,
} from 'react-native';
export default class UserCache{
    static userInfoKey  = 'userInfoKey';
    static userInfo = {};
    static isLoaded = false;
    static isLogined = false;

    constructor(){

        console.log('user cache');
    }


    static initData(){

        try {
            AsyncStorage.getItem(
                UserCache.userInfoKey,
                (error, result)=> {
                    if (error) {
                        console.log(error);
                        this.isLogined = false;
                        this.isLoaded  = false;
                    }
                    else {
                        console.log(result);
                        if(result){
                            if(JSON.parse(result).id>0){

                                this.isLogined = true;
                                this.userInfo  = result;
                                this.isLoaded  = true;
                            }else{

                                this.isLogined = false;
                                this.isLoaded  = false;
                            }
                        }else {

                            this.isLogined = false;
                            this.isLoaded  = false;
                        }
                        return result;
                    }
                });
        }
        catch (error) {
            console.log(error);
        }
    }



    static setUserInfo(information, successCallBack){
        try{
        AsyncStorage.setItem(
            UserCache.userInfoKey,
            JSON.stringify(information),
            (error)=>{
                if(error){

                    console.log(error);
                }else{
                    successCallBack();
                }
            }
        );
        this.userInfo = information;
        this.isLogined = true;
        } catch (error) {
            // Error saving data
            console.log(error);
        }


        //return Storage.set(UserCache.userInfoKey,info);
    };
    static initUserInfoStatus(successCallBack){
        console.log('initUserInfoStatus');
        try {
            AsyncStorage.getItem(
                UserCache.userInfoKey,
                (error, result)=> {
                    if (error) {
                        console.log(error);
                        this.isLogined = false;
                    }
                    else {
                        successCallBack(JSON.parse(result));
                        console.log(result);
                        if(JSON.parse(result).id>0){

                            this.isLogined = true;
                            this.userInfo  = result;
                        }else {

                            this.isLogined = false;
                        }
                        return result;
                    }
                });
        }
        catch (error) {
            console.log(error);
        }
    }
    static getUserInfo(successCallBack){

            try {
                AsyncStorage.getItem(
                    UserCache.userInfoKey,
                    (error, result)=> {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            console.log(result);
                            successCallBack(JSON.parse(result));
                            console.log(result);
                            return result;
                        }
                    });
            }
            catch (error) {
                console.log(error);
            }
            //return AsyncStorage.getItem(UserCache.userInfoKey);

    };

    static async isLogin(){
        if (!UserCache.isLoaded){
            await UserCache.initData();
        }
        return await new Promise(function (resolve, reject) {
            if(!UserCache.userInfo){
                resolve(false);
                return;
            }
            if(!UserCache.userInfo.toString().match("^\{(.+:.+,*){1,}\}$")){
                resolve(false);
            }else{

                if(!UserCache.userInfo||!JSON.parse(UserCache.userInfo).token){
                    resolve(false);
                }else {
                    resolve(true);
                }
            }

        });
    }

    static async getToken(){
        if (!UserCache.isLoaded){
            //await UserCache.initData();
        }
        return await new Promise(function (resolve, reject) {
            if(!UserCache.userInfo||!UserCache.userInfo.token){
                resolve('');
            }else {
                resolve(UserCache.userInfo.token);
            }

        });
    }
    static async getMobile(getMobileCallBack){
        try {
            AsyncStorage.getItem(
                UserCache.userInfoKey,
                (error, result)=> {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        //getMobileCallBack(JSON.parse(result).user.mobile);
                        console.log(result);
                        return result;
                    }
                });
        }
        catch (error) {
            console.log(error);
        }
    }
    static clear(logoutCallBack){
        console.log('clear');
        try {
            AsyncStorage.removeItem(
                UserCache.userInfoKey,
            (error)=>{
                if(!error){
                    logoutCallBack();
                    console.log('Remove success');
                    UserCache.initData();
                }
            }
        );

        }catch (error){
            console.log('Remove failed');
        }

    }

}