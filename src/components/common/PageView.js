/**
 * Created by user on 16/5/26.
 */
import React,{
    Component,
} from 'react'

import {
    Platform,
    View,
    StyleSheet,
    Text,

} from 'react-native';
//import NavBar from './NavBar';
import CommonStyle from '../CommonStyle';
import Load from './Load';
import NoWifi from './NoWifi';
import PropTypes from 'prop-types';


let ins_top = Platform.select({
    ios: 0,
    android: 0,
});
export default class PageView extends Component {

    static propTypes = {
        fromPage:PropTypes.object,    //所在页面
        hiddenNav: PropTypes.bool,       //是否隐藏Nav

        //返回按钮设置
        backBtnTitle: PropTypes.string,//返回按钮的标题
        backFunction: PropTypes.func, // 返回按钮的方法,只有在特殊要求的情况下才传入
        hiddenBackBtn:PropTypes.bool, // 是否隐藏返回按钮


        title: PropTypes.string,      //标题
        titleStyle:Text.propTypes.style,    //自定义标题样式
        rightBtnItems:PropTypes.array,//右边的按钮 格式[{title:'',imageSource:'',func:func}]

        isShowLoad:PropTypes.bool,        //是否显示Load
        isShowNoWifi:PropTypes.bool,      //是否显示网络错误页
        wifiCallback:PropTypes.func,      //点击wifi重试按钮

        showReminder:PropTypes.bool,      //是否显示提示,
        reminderText:PropTypes.string,    //提示消息,
        hideReminder:PropTypes.func,      //隐藏reminder
    }
    static defaultProps = {
        hiddenNav: false,
        titleStyle:{},
        hiddenBackBtn: false,
        title: '',
        rightBtnItems: [],
        isShowLoad:false,
        isShowNoWifi:false,
        showReminder:false,
        reminderText:'',
    }

    constructor (props) {
        console.log('');
        super (props);
        this.state = {
            userName:null,
            //dataSource:ds.cloneWithRows(listInfo),
        }
        if(this.props.hiddenNav){
            ins_top = Platform.select({
                ios: 20,
                android: 0,
            });
        }else{
        }

    }

    componentDidMount () {

        this.setState({
            userName:''
        })
    }
    showLoad(){
        if (this.props.isShowLoad){
            return (<Load/>)
        }
    }
    showNoWifi(){
        if (this.props.isShowNoWifi){
            return (<NoWifi resetFunc={this.props.wifiCallback}/>)
        }
    }
    showNav(){
        console.log('showNav：'+this.props.hiddenNav);
        ins_top;
        //if(!this.props.hiddenNav){
           // return (<NavBar {...this.props}/>);
            //console.log('showNav：'+this.hiddenNav);
        //}
    }

    render() {
        return (
            <View style={styles.mainStyle}>
                {this.showNav()}
                {this.props.showReminder &&
                    <View style={styles.topReminderStyle}>
                        <Text style={styles.topReminderTextStyle}> {this.props.reminderText} </Text>
                        <Text style={styles.topReminderXStyle}
                         onPress = {this.props.hideReminder}
                        >x</Text>
                    </View>
                }
                <View style={styles.container}>
                    {this.props.children}
                    {this.showNoWifi()}
                    {this.showLoad()}
                </View>
            </View>
        )
    }
}
let styles = StyleSheet.create({
    //
    mainStyle:{
        flexDirection:'column',
        marginTop:ins_top,
        backgroundColor:CommonStyle.color_pageBackground,
        flex:1
    },
    container:{
        flex:1,
    },
    topReminderStyle:{
        height:15,
        backgroundColor:CommonStyle.color_topReminder,
        flexDirection:'row',
    },
    topReminderTextStyle:{
        fontSize:10,
        flex:1,
        alignItems:'center'
    },
    topReminderXStyle:{
        fontSize:12,
        marginRight:10,
    }

});