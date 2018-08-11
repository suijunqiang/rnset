/**
 * Created by user on 16/5/30.
 */
import React,{
    Component,
} from 'react'

import {
    View,
    StyleSheet,
    Image,
    Dimensions,
    Modal,
    Text,
    TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import CommonStyle from '../../components/CommonStyle'
export default class RoutingLogFirstCell extends Component {
    constructor(props: any) {
        super(props);
    }
    static propTypes = {
        frontState:PropTypes.bool, //上边一行的状态
        selfState:PropTypes.bool,  //自己的状态
        nextState:PropTypes.bool,  //下边一行的状态
        position:PropTypes.number,//1,在头部 2,上下都有 3,在底部,4上下都没有
        message:PropTypes.string, //显示的信息
        detailMessage:PropTypes.string, //显示的描述信息
    }
    static defaultProps = {
        frontState: false,
        selfState:false,
        nextState: false,
        position:2,
        message:'',
        detailMessage:'',
    }
    componentDidMount(){
    }

    render () {
        return (
            <View style={styles.mainStyle}>
                <View style={styles.progressBase}>
                    <View style={styles.progressView}>
                        {<View style={[styles.line,styles.topLine,!this.props.frontState||!this.props.selfState?styles.disableColor:{},(this.props.position===1||this.props.position===4)?styles.clearColor:{}]}></View>}
                         <View style={[styles.shadowView,!this.props.selfState?styles.disableShadowColor:{}]}>
                             <View style={[styles.icon,!this.props.selfState?styles.disableColor:{}]}></View>
                         </View>
                        {<View style={[styles.line,styles.bottomLine,!this.props.nextState||!this.props.selfState?styles.disableColor:{},(this.props.position===3||this.props.position===4)?styles.clearColor:{}]}></View>}
                    </View>
                </View>

                <Text style={styles.message} numberOfLines={2}>{this.props.message}</Text>
                <Text style={styles.detailMessage}>{this.props.detailMessage}</Text>
            </View>
        )
    }
}

let styles = StyleSheet.create({
    //
    mainStyle:{
        flexDirection:'row',
        height:44,
        alignItems:'center',
    },
    progressBase:{
        flexDirection:'column',
        alignItems:'stretch',
        alignSelf:'stretch',
        width:40,
    },
    progressView:{
        flexDirection:'column',
        width:40,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'flex-start',
        flex:1,

    },
    line:{
        width:1,
        flex:1,
        backgroundColor:CommonStyle.color_orange,
        
    },
    topLine:{
        marginTop:-0.5,  
    },
    bottomLine:{
        marginBottom:-0.5,
    },
    shadowView:{
        backgroundColor:'rgba(255,144,0,0.5)',
        borderRadius:7,
    },
    icon:{
        width:7,
        height:7,
        backgroundColor:CommonStyle.color_orange,
        borderRadius:3.5,
        margin:3.5,

    },
    message:{
        fontSize:CommonStyle.fontSize_12,
        color:CommonStyle.color_light_black,
        flex:1
    },
    detailMessage:{
        fontSize:CommonStyle.fontSize_9,
        color:CommonStyle.color_orange,
        marginRight:15,

    },
    disableColor:{
        backgroundColor:CommonStyle.color_light_gray,
    },
    disableShadowColor:{
        backgroundColor:'rgba(218,218,218,0.5)',
        // backgroundColor:'black',
    },

    clearColor:{
        backgroundColor:'rgba(0,0,0,0)',
    }
});