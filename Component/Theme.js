/**
 * Created by SJQ on 9/6/16.
 */

import {
    Platform,
    Dimensions,

} from 'react-native';
import CommonStyle from './CommonStyle'
module.exports = {
    btn_style:{
        width:Dimensions.get('window').width,
        marginTop:CommonStyle.btn_top_margin,
        marginLeft:CommonStyle.btn_left_margin,
        marginRight:CommonStyle.btn_right_margin,
        backgroundColor:CommonStyle.btn_color,
        height:CommonStyle.btn_height,
        borderRadius:CommonStyle.btn_borderRadius,
        justifyContent:CommonStyle.btn_justifyContent,
        alignItems:CommonStyle.btn_alignItems,
    },
    et_style:{
        backgroundColor:CommonStyle.et_color,
        height:CommonStyle.et_height,
        marginLeft:CommonStyle.et_margin_left,
        marginRight:CommonStyle.et_margin_right,
    },

    //NavBar
    nb_main_style:{
        flexDirection:'column',
        backgroundColor:'white',
        paddingTop:Platform.OS === 'ios'?20:0,
    },
    nb_container: {
        height:44,
        flexDirection:'row',
        width:Dimensions.get('window').width,

    },
    nb_backBtnStyle : {
        justifyContent:'center',
        alignItems:'center',
        height:44,
        width:44,
    },
    nb_backItemTextStyle : {
        color:'white',
        fontSize:14,
    },
    nb_titleStyle : {
        position:'absolute',
        height:44,
        top:0,
        right:44,
        left:44,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    mb_titleTextStyle : {
        color:'black',
        fontSize:18,
        textAlign:'center',
        flex:1,
    },
    nb_backImage : {
        height:20,
        width:11,
        resizeMode:'contain',
    },
    nb_rightView:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
        paddingRight:3,
    },
    nb_rightBtn:{
        height:44,
        marginRight:5,
        alignItems:'center',
        justifyContent:'center',
    },
    nb_rightImg:{
        height:20,
        width:30,
        resizeMode:'contain',
    },
    nb_rightText:{
        color:'white',
        fontSize:14,
    },
};