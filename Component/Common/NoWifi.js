/**
 * Created by user on 16/5/28.
 */
import React,{
    Component,
} from 'react'

import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,

} from 'react-native';
import PropTypes from 'prop-types';
import CommonStyle from '../CommonStyle';
export default class NoWifi extends Component {

    static propTypes = {
        resetFunc: PropTypes.func,    //需要重新请求的方法
    }
    render () {
        return (
            <View style={styles.mainStyle}>
                <Image style={styles.imageStyle} source={require('./img/icon_wifi.png')}/>
                <Text style={styles.textStyle}>当前网络有问题,请稍后再试</Text>
                <TouchableOpacity style={styles.btnStyle} onPress={this.props.resetFunc}>
                    <View style={styles.btnViewStyle}>
                        <Text style={styles.btnText}>刷新一下</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
let styles = StyleSheet.create({
    //
    mainStyle:{
        flexDirection:'column',
        backgroundColor:CommonStyle.color_pageBackground,
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
        justifyContent:'center',
        alignItems:'center',
    },
    imageStyle:{
        width:60,
        height:43,
        resizeMode:'contain',
    },
    textStyle:{
        marginTop:20,
        fontSize:16,
        color:'#999999',
        marginBottom:50,
    },
    btnStyle:{
        marginBottom:100,
    },
    btnViewStyle:{
        width:180,
        height:38,
        borderRadius:2,
        borderWidth:1,
        borderColor:'#ff9000',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',

    },
    btnText:{
        fontSize:16,
        color:'#ff9000',
    }

});