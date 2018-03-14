

import React,{
    Component,
} from 'react'

import {
    View,
    Image,
    StyleSheet,
    Text,
    ScrollView,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import BasePage            from '../../Component/Common/BasePage';
import PageView            from '../../Component/Common/PageView';
import FieldManagementView from './FieldManagementView';
import ProjectProgress     from './ProjectProgress';
import EmptyView           from '../../Component/Common/EmptyView'
import NetController       from '../../Core/Network/NetController';
import Url                 from '../../Core/Network/Url';
import CommonStyle         from '../../Component/CommonStyle';
import ImgMainScreen       from '../../Component/Common/imgMainScreen';
import CheckList           from './CheckList';

export default class FieldManagement extends BasePage {

    static propTypes = {
        checkList:PropTypes.func,    //去相册的方法
    }
    static defaultProps = {
    }


    constructor (props) {
        super (props);
        console.log('props',props)
        this.state={
            ...this.state,
            projectId:props.data.projectId,
            data:props.data.checkContent,
        }
    }

    componentDidMount(){
        super.componentDidMount();
    }

    toNew(images,index){
        this.push(ImgMainScreen,{imgList:images,index:index})
    }

    toProgress(){
        let trackId ='';
        if(this.props.data.checkContent){
            trackId=this.props.data.checkContent.trackId
        }
        this.push(ProjectProgress,{projectId:this.state.projectId,trackId:trackId});
    }
    goToCheckList(){
        this.push(CheckList,{projectId:this.state.projectId});
    }
    render () {
        return (
            <PageView fromPage={this} title={'工地管理'} {...this.state}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustContentInsets={false}>
                    <View>
                        <TouchableWithoutFeedback onPress={this.toProgress.bind(this)}>
                            <View style={styles.headerView}>
                                <Image  style={styles.headerImg} resizeMode={'cover'} source={require('../img/field_progress.png')}/>
                                <Text style={styles.headerFirstText}>施工进度</Text>
                                <Text style={styles.headerSecondText}>计划一目了然,进度实时更新</Text>
                                <View style={styles.borderViewBase}>
                                    <View style={styles.borderView}><Text style={styles.headerThirdText}>了解详情</Text></View>
                                </View>
                            </View>

                        </TouchableWithoutFeedback>

                        <View style={styles.logTitle}>
                            <Text style={styles.firstText}>巡检日志</Text>

                            {this.state.data?(<TouchableWithoutFeedback onPress={this.goToCheckList.bind(this)}>
                                <View style={styles.moreView}><Text style={styles.secondText}>更多</Text></View>
                            </TouchableWithoutFeedback>):(<View></View>)}
                        </View>
                        <View>
                            {this.state.data?<FieldManagementView data={this.state.data} onPressImage={this.toNew.bind(this)}/>:<EmptyView isShow={true} description={'暂无巡检日志'}/>}
                        </View>
                    </View>
                </ScrollView>
            </PageView>
        )
    }
}
let styles = StyleSheet.create({
    listView:{
        flex:1,
    },
    headerView:{
        flexDirection:'column',
        backgroundColor:'rgba(0,0,0,0)',
        justifyContent:'center',
        paddingHorizontal:20,
        height:110,
    },
    headerImg:{
        position:'absolute',
        top:0,
        left:0,
        right:0,
        width:Dimensions.get('window').width,
        height:110,
    },
    headerFirstText:{
        fontSize:CommonStyle.fontSize_18,
        color:CommonStyle.color_orange,
        marginBottom:12,
    },
    headerSecondText:{
        fontSize:CommonStyle.fontSize_14,
        color:CommonStyle.color_light_black,
        marginBottom:10,
    },
    headerThirdText:{
        fontSize:CommonStyle.fontSize_9,
        color:CommonStyle.color_orange,
    },
    borderViewBase:{
        flexDirection:'row',
    },
    borderView:{
        borderWidth:1,
        borderColor:CommonStyle.color_orange,
        borderRadius:3,
        padding:2,
    },
    logTitle:{
        flexDirection:'row',
        backgroundColor:'white',
        borderBottomColor:CommonStyle.color_light_gray,
        borderBottomWidth:0.5,
        marginTop:14,
        paddingHorizontal:15,
        alignItems:'center',
        height:44,
    },
    firstText:{
        color:CommonStyle.color_black,
        fontSize:CommonStyle.fontSize_16,
        flex:1,
    },
    secondText:{
        fontSize:CommonStyle.fontSize_14,
        color:CommonStyle.color_gray,
    },
    moreView:{
        padding:10,
        flexDirection:'row',
        justifyContent:'center',
        marginRight:-15
    }

});
