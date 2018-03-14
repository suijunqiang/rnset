/**
 * Created by user on 16/5/27.
 */
import React,{
    Component,
} from 'react'

import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Image,
    Text,
} from 'react-native';
import PropTypes from 'prop-types';
import CommomStyle from '../../CommonStyle'

export default class MessageCell extends Component {

    static propTypes = {
        //返回按钮设置
        title: PropTypes.string,//返回按钮的标题
        content: PropTypes.string, // 返回按钮的方法,只有在特殊要求的情况下才传入
        createTime:PropTypes.string, // 是否隐藏返回按钮

        cellClickFunc: PropTypes.func,      //点击事件


    }
    static defaultProps = {
        title:'',
        content:'',
        createTime:'',

    }

    render () {
        return (
            <TouchableWithoutFeedback onPress={this.props.cellClickFunc}>
            <View style={styles.mainStyle}>
                <View style={styles.titleView}>
                    <Image source={require('../img/icon_message.png')} style={styles.iconStyle}/>
                    <Text style={styles.title}>{this.props.title}</Text>
                </View>
                <Text style={styles.message}>{this.props.content}</Text>
                <Text style={styles.time}>{this.props.createTime}</Text>
            </View>
            </TouchableWithoutFeedback>
        )
    }
}
let styles = StyleSheet.create({
    //
    mainStyle:{
        flexDirection:'column',
        backgroundColor:'white',
        paddingLeft:16,
        overflow:'hidden',
    },
    titleView:{
        flexDirection:'row',
        marginTop:16,
        marginBottom:16,
        alignItems:'center',
    },
    iconStyle:{
        width:16,
        height:15,
        resizeMode:'contain',
    },
    title:{
        marginLeft:10,
        fontSize:CommomStyle.fontSize_16,
        color:CommomStyle.color_black,
    },
    message:{
        marginBottom:18,
        fontSize:CommomStyle.fontSize_14,
        color:CommomStyle.color_gray,
    },
    time:{
        fontSize:12,
        position:'absolute',
        top:12,
        right:10,
        color:CommomStyle.color_light_black,

    },

});