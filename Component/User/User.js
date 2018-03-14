/**
 * Created by user on 16/4/8.
 */
import React,{
    Component,
} from 'react'

import {
    StyleSheet,
    Text,
    Navigator,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    ListView,
    DeviceEventEmitter,
    Platform,
    Dimensions,
    ScrollView,
} from 'react-native';
import { ListRow } from 'teaset';
import UserCache        from '../../Core/Cache/UserCache'
import BasePage         from '../../Component/Common/BasePage';
import PageView         from '../../Component/Common/PageView';
import Login            from './LoginAndRegister/LoginView';
import MessageList      from './Message/MessageList';
import NetController          from '../../Core/Network/NetController';
import Url                    from '../../Core/Network/Url';

import FieldList        from '../../rn_example/FieldListExa/FieldList';
import FieldManagement  from '../../rn_example/FieldListExa/FieldManagement';
import CheckList        from '../../rn_example/FieldListExa/CheckList';

const BG                = require('./img/bg.jpg');
const HEAD              = require('./img/head.png');
const NEXT              = require('./img/next.png');
const SETTINGS          = require('./img/settings.png');
const MSG               = require('./img/icon_message.png');
var ds                  = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class User extends BasePage {

    constructor (props) {
        console.log('');
        super (props);
        this.handleBack = this.handleBack.bind(this);
        this.state = {
            userName:null,
            //dataSource:ds.cloneWithRows(listInfo),
        }
    }

    componentWillUnMount() {

        this.subscription.remove();
    }

    getUserInfoAsync = async () => {
        await UserCache.getUserInfo(this.getSuccessCallBack.bind(this));
    }
     getSuccessCallBack(userInfo){
         console.log('ddd');
         if(userInfo===null){
             console.log('this is no userInfo storaged.');
         }else{

             this.setState({
                 userName:userInfo.user.name
             })
             //console.log('Async userInfo: '+JSON.stringify(userInfo));
             console.log(userInfo.user.name);
         }

     }
    refreshAAvatar () {
        console.log('');
        this.getUserInfoAsync().bind(this);
    }
    componentDidMount () {

        this.subscription = DeviceEventEmitter.addListener('longinFinish', this.refreshAAvatar.bind(this));
        this.getUserInfoAsync();
    }

    componentWillReceiveProps(){
        this.getUserInfoAsync();
    }
    handleBack(){
        console.log('handleBack');
        this.getUserInfoAsync();
    }
    getAccount () {

        if (this.state.userName){

            return (

                <View>
                    <View style={styles.account}>
                        <Text style={styles.accountText}>
                            {this.state.userName}
                        </Text>
                    </View>
                </View>
            )
        }
        else {

            return (
                <View
                    style = {{

                        flexDirection:'row',
                    }}
                >
                    <Text
                        style = {{

                            marginTop:20,
                            color:'white',
                            fontSize:16,
                            backgroundColor:'rgba(0,0,0,0)',
                        }}
                    >
                        请登录
                    </Text>

                    <Text
                        style = {{

                            marginTop:13.5,
                            color:'white',
                            fontSize:22,
                            backgroundColor:'rgba(0,0,0,0)',
                        }}
                    >
                         >
                    </Text>
                </View>
            )
        }

    }
    goToLogin () {
        //this.present(Login);
        this.navigator.push({view: <Login />});
        
    }

    goToFileManagment(){

        console.log('goToFileManagment');
        UserCache.isLogin().then((isLogin)=>{

            if(isLogin){
                console.log('isLogined');
                NetController.requestWithAll(this,Url.fieldList(),
                    function (data,message) {
                        console.log('data',data);
                        if(data.nextType===1){
                            this.navigator.push({data:data.nextData,view: <FieldManagement/>});//this.push(FieldList,{data:data.nextData});
                        }
                        else if(data.nextType===2){
                            if(data.nextData===undefined){
                                Exceptions.Error_Alert('数据异常','暂无数据');
                                return;
                            }
                            this.navigator.push({view:FieldManagement},{data:data.nextData});

                        }else if(data.nextType===3){
                            this.navigator.push({view:CheckList},{data:data.nextData});
                        }
                    }.bind(this),function (code,message){

                    });
            }else{

                console.log('not logined');
                this.goToLogin();
            }

        });
    }



   /* goToFieldList(){
        this.push(FieldList);

    }*/

    logoutCallBack(){
        console.log('logoutCallBack');

        this.setState({
            userName:''
        })
    }
    logout(){
        UserCache.clear(this.logoutCallBack.bind(this));

    }
    render() {
        
        return (
            <PageView fromPage={this}
                      hiddenNav={true}
                {...this.state}>
                <View style = {styles.container}>
                    <ImageBackground
                        style = {styles.bgImage}
                        source = {BG}>
                        <View>
                            <TouchableOpacity style = {styles.heardImage}>
                                <Image source = {HEAD} >
                                </Image>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style = {{
                                justifyContent:'center',
                                alignItems:'center',
                                backgroundColor:'rgba(0,0,0,0)',
                            }}
                                onPress = {this.state.userName?null:this.goToLogin.bind(this)}>
                                {this.getAccount()}
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>

                    <View style={styles.viewBarStyle}></View>

                    <ScrollView style={{flex: 1}}>
                        <ListRow title='消息' detail='消息列表' onPress={() => this.navigator.push({view: <MessageList />})} topSeparator='full' />
                        <ListRow title='自定义控件' detail='自定义控件' onPress={() => this.goToFileManagment()}  />

                    </ScrollView>
                    <TouchableOpacity style={styles.style_view_commit} onPress={this.logout.bind(this)}>
                        <Text style={{color:'#000000',fontSize:18}} >
                            退出登录
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.style_view_server_cell}>
                        <Text style={styles.style_server_cell} >
                            电话：13671906320
                        </Text>
                    </View>
                </View>
            </PageView>

        );
    }
}
var styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor:'#efefef'
    },
    bgImage : {
        alignItems:'center',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').width*340/750,
        //resizeMode:'stretch',
    },

    heardImage : {
        marginTop:34,
        justifyContent:'center',
        alignItems:'center',
    },

    nameText : {
        textAlign:'center',
        marginTop:15,
        fontSize:16,
        color:'#ffffff',
        width:150,
    },

    account: {
        marginTop:10,
        height:25,
        backgroundColor:'rgba(0,0,0,0.3)',
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center',
    },
    accountText : {
        fontSize:12,
        color:'#ffffff',
        width:150,
        textAlign:'center',
    },
    cellContainer : {
        flex: 1,
        flexDirection:'row',
        height:45,
        paddingTop:10,
        backgroundColor:'#ffffff',
        borderBottomWidth:0.5,
        borderBottomColor:'#dadada',
    },

    cellContainerEnd : {
        flex: 1,
        flexDirection:'row',
        height:45,
        marginLeft:15,
        backgroundColor:'rgba(0,0,0,0)',
        marginTop:10
    },
    image : {

        width:25,
        height:25,
        marginLeft:15,
    },

    titleStyle : {

        marginLeft:10,
        marginTop:3,
        fontSize:16,
        color:'#333333',
        flex:1,
    },
    nextStyle : {
        marginRight:15,
        marginTop:5,
    },
    listViewStyle : {
        backgroundColor:'#efefef'
    },
    listItemStyle : {
        backgroundColor:'#ffffff'
    },
    viewBarStyle : {
        height:10,
        backgroundColor:'#efefef'
    },
    style_view_commit:{
        marginLeft:18,
        marginRight:18,
        marginBottom:10,
        backgroundColor:'#efefef',
        height:45,
        borderRadius:5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:1,
        borderColor:'#dadada',

    },
    style_server_cell:{
        color:'#999999',
        fontSize:12,

    },
    style_view_server_cell:{
        justifyContent:'center',
        flexDirection:'row',
        marginBottom:28,
    }
});

