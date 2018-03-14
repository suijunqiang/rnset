/**
 * Created by user on 16/6/2.
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
    Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import CommonStyle from '../../Component/CommonStyle';
import ImageSwiper from '../../Component/Common/ImageSwiper'
export default class PageView extends Component {

    static propTypes = {
        data: PropTypes.object, //需要的数据
        onPressImage:PropTypes.func,
    }
    static defaultProps = {
        data:{},
    }
    renderPicWithText(){
        console.log('this.props.data.picWithText',this.props.data.picWithText);
        if(this.props.data.picWithText){
            let returnItem= this.props.data.picWithText.map(function(item,i){
                return (
                    <View key={i} >
                        <TouchableWithoutFeedback onPress={this.textImagePress.bind(this,i)}>
                            <Image style={styles.pic} source={{uri:item.url}}/>
                        </TouchableWithoutFeedback>
                        <View style={{flex:1}}>
                            <Text style={styles.picNode}>{'     '+item.note}</Text>
                            <Image style={styles.top} source={require('../img/icon_top.png')}/>
                        </View>

                    </View>
                )
            }.bind(this));
            return returnItem;
        }
    }
    renderImageSwiper(){
        console.log('renderImageSwiper');
        if(this.props.data.pic&&this.props.data.pic.length>0){
            return (<ImageSwiper style={styles.swiper} picList={this.props.data.pic} pressImageAtIndex={this.swiperImagePress.bind(this)}/>);
        }
    }
    swiperImagePress(index){
        let Images = [];
        let newIndex = index;
        if (this.props.data.picWithText){
            Images=Images.concat(this.props.data.picWithText);
            newIndex=newIndex+this.props.data.picWithText.length;
        }
        Images=Images.concat(this.props.data.pic);
        if(this.props.onPressImage){
            this.props.onPressImage(Images,newIndex);
        }
    }
    textImagePress(index){
        let Images = [];
        Images=Images.concat(this.props.data.picWithText);
        if (this.props.data.pic){
            Images=Images.concat(this.props.data.pic);
        }
        if(this.props.onPressImage){
            this.props.onPressImage(Images,index);
        }
    }
    // require('../../Project/Images/User/manager.png')
    render () {
        let lichengBeiIcon= require('../img/lichengbei1.png')
        if(this.props.data.milestoneId){
            switch (this.props.data.milestoneId){
                case 1 :{
                    lichengBeiIcon= require('../img//lichengbei1.png')
                }
                    break;
                case 2 :{
                    lichengBeiIcon= require('../img/lichengbei2.png')
                }
                    break;
                case 3 :{
                    lichengBeiIcon= require('../img/lichengbei3.png')
                }
                    break;
                case 4 :{
                    lichengBeiIcon= require('../img/lichengbei4.png')
                }
                    break;
                case 5 :{
                    lichengBeiIcon= require('../img/lichengbei5.png')
                }
                    break;
            }
        }

        return (
            <View style={styles.mainStyle}>
                <View style={styles.titleView}>
                    <Image style={styles.titleIcon} source={lichengBeiIcon}/>
                    <Text style={styles.titleText} numberOfLines={1}>{this.props.data.checkTimeStr+'  阶段:'+this.props.data.phase}</Text>
                </View>
                <View style={styles.picsView}>
                    <View style={styles.managerView}>
                        <Image style={styles.managerIcon} source={require('../img/manager.png')}/>
                        <View style={styles.managerTextView}>
                            <Text style={styles.managerText}>{this.props.data.checkerName}</Text>
                            <Text style={styles.managerJob}>{this.props.data.checkerRoleName}</Text>
                        </View>
                    </View>
                    <Text style={styles.node}>{this.props.data.note}</Text>
                    {this.renderPicWithText()}

                </View>
                {this.renderImageSwiper()}
            </View>
        )
    }
}
let styles = StyleSheet.create({
    //
    mainStyle:{
        flexDirection:'column',
        backgroundColor:'#f7f7f7',
        overflow:'hidden',
        paddingBottom:6,
    },
    titleView:{
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:15,
        paddingVertical:10,
        backgroundColor:'white',
    },
    picsView:{
        flexDirection:'column',
        marginTop:12,
        paddingHorizontal:15,
    },
    titleIcon:{
        width:20,
        height:20,
    },
    titleText:{
        fontSize:CommonStyle.fontSize_14,
        color:CommonStyle.color_black,
        marginLeft:10,
        flex:1,
    },
    managerView:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:16,
    },
    managerIcon:{
        width:40,
        height:40,
    },
    managerTextView:{
        flexDirection:'column',
        marginLeft:12,
    },
    managerText:{
        fontSize:CommonStyle.fontSize_14,
        color:CommonStyle.color_black,
        marginBottom:6,
    },
    managerJob:{
        fontSize:CommonStyle.fontSize_12,
        color:CommonStyle.color_gray,
    },
    node:{
        fontSize:16,
        lineHeight:20,
        flex:1,
        color:CommonStyle.color_black,
        marginBottom:14,
    },
    pic:{
        resizeMode:'cover',
        width:Dimensions.get('window').width-30,
        height:(Dimensions.get('window').width-30)*195/344,
        marginBottom:14,
        marginTop:0,

    },
    picNode:{
        marginBottom:14,
        flex:1,
        fontSize:16,
        lineHeight:20,
        color:CommonStyle.color_black,
    },
    swiper:{
        marginTop:0,
        paddingTop:0,
        marginBottom:14,
    },
    top:{
        width:16.5,
        height:10.5,
        position:'absolute',
        top:4,
        left:0,
    }
});