/**
 * Created by user on 16/5/27.
 */

import React,{
    Component,
} from 'react'

import  {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import PropTypes from 'prop-types';
import CommonStyle from '../CommonStyle';

export default class PageView extends Component {
    timerSecCount=0;
    static propTypes = {
        text:PropTypes.string,    //提示消息,
        closeFunc:PropTypes.func,   //点击隐藏按钮
        timerSec:PropTypes.number,  //倒计时需要的时间
        isUseTimer:PropTypes.bool,  //是否使用倒计时
        isShowClose:PropTypes.bool, //是否显示closeBtn
    }
    static defaultProps = {
        text:'',
        timerSec:3000,
    }
    componentDidMount(){
        if(this.props.isUseTimer){
            this.timer = setTimeout(
                () => {
                    clearTimeout(this.timer);
                    this.closeBtnPress();
                },
                this.props.timerSec
            );
        }

    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    closeBtnPress(){
     if(this.props.closeFunc){
         this.props.closeFunc();
     }
    }
    render () {
        let backgroundColor={backgroundColor:'#ffe4a3'}
        let textColor={color:'#ff9000'};
        if(this.props.isShowClose){
            backgroundColor={backgroundColor:'#ffe3e3'}
            textColor={color:'#f22222'};
        }
        return (
            <View style={[styles.topReminderStyle,backgroundColor]}>
                <Text style={[styles.topReminderTextStyle,textColor]}> {this.props.text} </Text>
                {this.props.isShowClose&&(<TouchableOpacity onPress = {this.closeBtnPress}>
                    <Image source={require('./img/btn_close.png')}/>
                </TouchableOpacity>)}

            </View>
        )
    }
}
let styles = StyleSheet.create({
    //
    topReminderStyle:{
        backgroundColor:CommonStyle.color_topReminder,
        flexDirection:'row',

        paddingHorizontal:15,
        height:24,
        alignItems:'center',
    },
    topReminderTextStyle:{
        fontSize:14,
        flex:1,
        textAlign:'center',
    },
    image:{
        width:25,
        height:25,
    }


});