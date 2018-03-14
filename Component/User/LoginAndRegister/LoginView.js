/**
 *
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    Alert
} from 'react-native';

import BasePage from '../../Common/BasePage';
import PageView from '../../Common/PageView';
import Theme    from '../../Theme';
import NetController  from '../../../Core/Network/NetController';
import LoginUrl       from '../../../Core/Network/LoginUrl';
import UserCache        from '../../../Core/Cache/UserCache'
var DeviceInfo = require('react-native-device-info');
import UserView   from '../../../Component/User/User'

import RegisterView            from './LoginView_Register'
//获取Dimensions
var dimensions = require('Dimensions');
//获取window组件
var window = dimensions.get('window');
//获取宽度和高度
var screenWidth = window.width;
var screenHeight = window.height;
var TextInputHeight = 44;
var paddding = 8;
var MD5 = require("crypto-js/md5");

export default class LoginView extends BasePage {

    constructor (props) {
        console.log("LoginView");
        super (props);
        this.state = {
            userName:null,
            passwd:null,
            uuid:DeviceInfo.getDeviceId(),
        }
    }

    componentWillUnMount() {

        this.subscription.remove();
    }
    //componentWillReceiveProps(){
    //    this.back();
    //}
    componentDidMount () {

    }
    userNameChange(text){
        this.setState({

            userName:text
        })
    }
    passwdChange(text){
        this.setState({

            passwd:text
        })
    }
    uuidChange(text){

        this.setState({

            uuid:text
        })
    }
    setSuccessCallBack(){
        //getMobileAsync();
        //this.present(UserView);
        
        //this.back();
        this.navigator.pop();
    }
    gotoRegister(){

        this.present(RegisterView);
    }
    render() {
        return (
            <PageView fromPage={this} title={'登 录'} {...this.state}>
            <View style={styles.container}>
                <Image source={require('../img/head.png')} style={styles.header}/>
                <TextInput style={styles.username} autoCorrect={false} clearButtonMode={'while-editing'}
                           onChangeText={(text) => this.userNameChange(text)}
                           placeholder={'此处输入账号'} underlineColorAndroid={'#00000000'}/>
                <TextInput style={styles.password} autoCorrect={false} clearButtonMode={'while-editing'}
                           onChangeText={(text) => this.passwdChange(text)}
                           secureTextEntry={true} placeholder={'此处输入密码'}
                    //此方法去掉输入框（EditText）在Android下的默认下划线
                           underlineColorAndroid={'#00000000'}/>

                <TouchableOpacity
                    style={styles.style_view_commit}
                    onPress={ () => this.fetchData(this.state.userName, MD5(this.state.passwd), this.state.uuid)}>
                    <Text style={styles.login}>登 录</Text>
                </TouchableOpacity>


                <View style={styles.regView}>
                    <Text style={styles.noLogin}>无法登陆?</Text>
                    <TouchableOpacity
                        style = {{
                                justifyContent:'center',
                                alignItems:'center',
                                backgroundColor:'rgba(0,0,0,0)',
                            }}
                        onPress = {this.gotoRegister.bind(this)}>
                    <Text style={styles.reg}>新注册</Text>
                       </TouchableOpacity>
                </View>


            </View>
            </PageView>
        );
    }

    fetchData(userName, passwd, uuid) {
        console.log("Login fetchData");
        NetController.RegisterRequest(this,
            LoginUrl.registerLogin('GETEXISTUSER',userName,passwd,uuid),
            function (data,message) {//成功回调
                console.log(JSON.stringify(data)+'   \nMsg'+message);
                UserCache.setUserInfo(data.userInfo, this.setSuccessCallBack.bind(this));
            }.bind(this),function (code,message) {//失败回调

                if(code!=0){
                    Alert.alert(
                        '提示',
                        message,
                        [
                            {text: 'OK', onPress: () => console.log('OK Pressed!')},
                        ]
                    )
                }
                console.log(code+'   Msg'+message);
            }.bind(this),true,true,false);

    }
}
const getMobileAsync = async () => {
    const t = await UserCache.getMobile();
    console.log('Async moblie: '+t);
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    header:{
        marginTop:60,
        height:80,
        width:80,
        borderRadius:40
    },
    username:{
        width:screenWidth,
        height:44,
        backgroundColor:"white",
        paddingLeft:paddding,
        marginTop:26,
        textAlign:'center',
        fontSize:12,
        marginBottom:1,
        backgroundColor:'white',
    },
    password:{
        width:screenWidth,
        height:44,
        backgroundColor:"white",
        paddingLeft:paddding,
        textAlign:'center',
        fontSize:12

    },
    loginView:{
        width:screenWidth - 32,
        height:44,
        marginTop:26,
        backgroundColor:'#6EB8FE',
        justifyContent:"center",
        alignItems:"center",
        borderRadius:8
    },
    login:{

        color:'white',
        textAlign:'center',
        fontSize:16,
    },
    regView:{
        marginTop:16,
        width:screenWidth,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    noLogin:{
        color:"#6EB8FE",
        fontSize:14,
        marginLeft:16,
    },
    reg:{
        color:"#6EB8FE",
        fontSize:14,
        marginRight:16
    },
    other:{
        flexDirection:"row",
        width:screenWidth,
        paddingLeft:16,
        alignSelf:"flex-end",
        position:'absolute',
        bottom:10,
        alignItems:'center'
    },
    otherImg:{
        width:40,
        height:40,
        borderRadius:20,
        marginLeft:8
    },
    style_view_commit:{
        ...Theme.btn_style,
    },
});

module.exports = LoginView;