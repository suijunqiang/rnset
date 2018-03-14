/**
 * Created by user on 16/6/2.
 */
import React,{
    Component,
} from 'react'

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import PropTypes from 'prop-types';
import CommonStyle from '../../Component/CommonStyle';

export default class RoutingLogHeader extends Component {
    constructor(props: any) {
        super(props);
    }
    static propTypes = {
        text:PropTypes.string, //显示的字体
        buttonPressed:PropTypes.func,
        isOpen:PropTypes.bool, //是否是展开状态
    }
    static defaultProps = {
        text: '',
        isOpen:true,
    }
    componentDidMount(){
    }

    render () {
        return (
                <View style={styles.mainStyle} ref={this.props.ref}>
                    <Text style={styles.text}>{this.props.text}</Text>
                    <TouchableOpacity style={styles.button} onPress={this.props.buttonPressed}>
                        <Image style={styles.buttonImg} source={this.props.isOpen?require('../img/down.png'):require('../img/up.png')}/>
                    </TouchableOpacity>
                </View>

        )
    }
}

let styles = StyleSheet.create({
    //
    mainStyle:{
        height:40,
        backgroundColor:'rgb(255,255,255)',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth:0.5,
        borderBottomColor:'#dadada',
    },
    text:{
        color:CommonStyle.color_gray,
        fontSize:CommonStyle.fontSize_12
    },
    button:{
        position:'absolute',
        top:0,
        bottom:0,
        right:0,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        width:40,
    },
    buttonImg:{
        width:12,
        height:7,
        resizeMode:'contain'
    }

});