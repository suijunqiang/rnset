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
export default class KindlyReminder extends Component {

    static propTypes = {
        title:PropTypes.string,    //标题
        message: PropTypes.string, //展示的信息
        visible: PropTypes.bool,       //是否显示
        setVisible: PropTypes.func,       //是否显示
    }
    static defaultProps = {
        title:'温馨提示',
        message:'',
        visible:false,

    }
    setVisible(){
        console.log('setVisible');
        if(this.props.setVisible){
            this.props.setVisible();
        }
    }
    render () {
        return (
           <Modal
            animatied={true}
            transparent={true}
            visible={this.props.visible}
           >
               <TouchableWithoutFeedback onPress={this.setVisible.bind(this)}>
               <View style={styles.mainStyle}>
                   <Text style={styles.titleText}>{this.props.title}</Text>
                   <View style={styles.lineView}></View>
                   <Text style={styles.messageText}>{this.props.message}</Text>
                   <Image style={styles.imageStyle} source={require('./img/newDeleted.png')}/>
               </View>
               </TouchableWithoutFeedback>
           </Modal>
        )
    }
}
let styles = StyleSheet.create({
    //
    mainStyle:{
        flexDirection:'column',
        backgroundColor:'rgba(0,0,0,0.9)',
        alignItems:'center',
        justifyContent:'center',
        flex:1,
    },
    titleText:{
        fontSize:18,
        color:'white',
        width:Dimensions.get('window').width-40,
        textAlign:'center',
    },
    lineView:{
        height:0.5,
        backgroundColor:'white',
        width:Dimensions.get('window').width-40,
        marginTop:20,
        marginBottom:20,
    },
    messageText:{
        fontSize:14,
        color:'white',
        width:Dimensions.get('window').width-40,
        textAlign:'center',
        marginBottom:50,
    },
    imageStyle:{
        width:50,
        height:50,
        resizeMode:'contain',
        position:'absolute',
        bottom:30,
        left:(Dimensions.get('window').width-50)/2,
    }

});