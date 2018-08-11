/**
 * Created by user on 16/6/16.
 */
import React,{
    Component,
} from 'react'

import  {
    View,
    StyleSheet,
    Image,
    Text
} from 'react-native';
import PropTypes from 'prop-types';
import CommonStyle from '../CommonStyle';

export default class EmptyView extends Component {
    constructor(props: any) {
        super(props);
    }
    static propTypes = {
        isShow:PropTypes.bool,
        imageSource: PropTypes.oneOfType([
            PropTypes.shape({
            uri: PropTypes.string,
        }), PropTypes.number,]),
        description:PropTypes.string,
        subDescription:PropTypes.string,
    }
    static defaultProps = {
        isShow: false,
        imageSource:require('./img/icon_empty.png'),
        description:'暂无数据',
        subDescription:'',
    }

    render () {
        if(this.props.isShow){
            return (
                <View style={styles.mainStyle}>
                    <Image style={styles.icon} source={this.props.imageSource}/>
                    <Text style={styles.description}>{this.props.description}</Text>
                    <Text style={styles.subDescription}>{this.props.subDescription}</Text>
                </View>
            )
        }else {
            return (<View style={{width:0,height:0}}></View>);
        }

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
        alignItems:'center',
    },
    icon:{
        width:55,
        height:55,
        resizeMode:'contain',
        marginTop:80,
    },
    description:{
        ...CommonStyle.fontSize_15_lh_25,
        color:CommonStyle.color_black,
        marginTop:20,
        marginHorizontal:15,
    },
    subDescription:{
        ...CommonStyle.fontSize_14_lh_24,
        color:CommonStyle.color_light_black,
        marginTop:5,
        marginHorizontal:15,

    }

});