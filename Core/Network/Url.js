/**
 * Created by user on 16/5/27.
 */

/*
var msgList               = '/u/msg/list.do';
var projectList           = '/project/search.do';
var fieldList             = '/u/project/to.do?userId=1';
var projectProgressDetail = '/u/project/progress/detail.do';
var checkList             = '/u/project/check/list.do?projectId=1';
var appUpdate             = '/u/app/version/check.do';
*/


var msgList               = '/u/msg/list.php';
var projectList           = '/project/search.php';
var fieldList             = '/u/project/todo.php?userId=';
var fieldList2            = '/u/project/to2.php?userId=';
var projectProgressDetail = '/u/project/progress/detail.php';
var checkList             = '/u/project/check/list.php?projectId=';
var appUpdate             = '/u/app/version/check.php';
var registerUser          = '/u/app/version/check.php';


var Url = {

    msgList(userId){
        return {
            url:msgList,
            type:'GET',
            param:{
                userId:userId,
            }
        }
    },
    projectList(userName,qObj,accessToken,pageSize,curPage){
        return {
            url:projectList,
            type:'GET',
            param:{
                userName:userName,
                qObj:qObj,
                accessToken:accessToken,
                pageSize:pageSize,
                curPage:curPage
            }
        }
    },
     /**
     * 
     * @returns {{url: string, type: string, param: {}}}
     */
    fieldList2(userId:string){
        return {
            url:fieldList2,
            type:'GET',
        }
    },
    /**
     * 
     * @returns {{url: string, type: string, param: {}}}
     */
    fieldList(userId:string){
        return {
            url:fieldList,
            type:'GET',
            param:{
            }
        }
    },
    projectProgressDetail(projectId:string){
        return {

            url:projectProgressDetail,
            type:'GET',
            param:{
                projectId:projectId,
            }
        }
    },
    /**
     *
     * @returns {{url: string, type: string, param: {}}}
     */
    checkList(projectId:string){
        return {
            url:checkList,
            type:'GET',
            param:{
            }
        }
    },
    appUpdate(version:string){
        return {
            url:appUpdate,
            type:'GET',
            param:{
                version:version
            }
        }
    },
    registerUser(userName,userPwd,uuid){
    return {
        url:projectList,
        type:'GET',
        param:{
            userName:userName,
            userPwd:userPwd,
            uuid:uuid,
        }
    }
},
};

module.exports = Url;
