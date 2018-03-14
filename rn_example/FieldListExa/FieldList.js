/**
 * Created by SJQ on 16/5/26.
 */
import React,{
    Component,
} from 'react'

import {
    View,
    ListView,
    StyleSheet,
    Image,
    TouchableHighlight,
    Text,
    Navigator,

} from 'react-native';

import BasePage         from '../../Component/Common/BasePage';
import PageView         from '../../Component/Common/PageView';
import NetController           from '../../Core/Network/NetController';
import Url                     from '../../Core/Network/Url';
import FieldManagement         from './FieldManagement';
import CheckList               from './CheckList';
import BListView           from '../../Component/Common/BListView';
import EmptyView           from '../../Component/Common/EmptyView'


const GONG_DI    = require('../img/gonDiIcon.png');
const location   = require('../img/field_2x.png');
const arrowRight = require('../img/xiayiye.png');
var ds           = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var listInfo     = [{id:1,info:'工地1', sale:'999套餐',image:GONG_DI,houseStyle:'欧式1－2',address:'龙阳路铁站889'}]

//import Map from '../../utils/Map';
//var listInfo;
var g_data;
export default class FieldList extends BasePage {
    constructor (props) {
        super (props);
        console.log('FieldList');
        this.state={
            ...this.state,
            data:props.data
        }
    }

    componentDidMount(){
        super.componentDidMount();
       
    }
    componentWillUnmount() {
        super.componentWillUnmount();
    }

    goToProjectFieldManagement(object){

        NetController.requestWithAll(this,
            Url.checkList(object.projectId),
            function (data,message) {
                if(data.nextType===2){
                    if(data.nextData===undefined){
                        Exceptions.Error_Alert('数据异常','暂无数据');
                        return;
                    }
                    this.push(FieldManagement,{data:data.nextData});

                }else if(data.nextType===3){
                    this.push(CheckList,{data:data.nextData});
                }
            }.bind(this),function (code,message) {//失败回调
            }.bind(this));

    }

    renderRow (object:object,sectionID: number, rowID: number) {

        return (
            <TouchableHighlight
                style={styles.listItemStyle}
                //onPress = {this.goToFieldManagement.bind(this)}
                //onPress = {this.goToCheckList.bind(this)}
                onPress = {this.goToProjectFieldManagement.bind(this, object)}
                underlayColor = {'rgba(0,0,0,0)'}>
                <View style={styles.cellContainer}>
                <View style={styles.rowStyle}>
                    <Image
                        style={styles.image}
                        source={location}
                        resizeMode={"contain"}/>
                    <Text style={styles.titleStyle}>
                        {object.mark}
                    </Text>
                    <Text style={styles.packgerStyle}>
                        {object.sellPackageStr}
                    </Text>
                </View>
                <View style={styles.rowCenterWrap}>
                    <Text style={styles.textGrayStyle}>
                        {object.houseArea+'㎡'+(object.style?('/'+object.style):'')}
                    </Text>
                    <Image
                        style  = {styles.jianTouStyle}
                        source = {arrowRight}
                    />
                </View>
                <View style={styles.rowWrap}>
                    <Text style={styles.textGrayStyle}>
                        {object.address}
                    </Text>
                </View>
                </View>
            </TouchableHighlight>
        )
    }
    renderView(){
        if(this.state.data.projectList.length>0){
            return (<BListView
                data={this.state.data}
                renderRow={this.renderRow.bind(this)}
            />)
        }else {
            return (<EmptyView isShow={true} description={'暂无工地信息'}/>)
        }
    }
    render () {
        return (
            <PageView fromPage={this} title={'工地列表'} {...this.state}>
                {this.renderView()}


            </PageView>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cellContainer : {
        height:120,
        backgroundColor:'#ffffff',
        borderBottomWidth:0.5,
        borderBottomColor:'#dadada',
    },
    listViewStyle: {
        backgroundColor: '#efefef'
    },
    listItemStyle : {
        backgroundColor:'#ffffff'
    },
    viewBarStyle : {
        height:10,
        backgroundColor:'#efefef'
    },
    bgImage : {
        alignItems:'center'
    },
    heardImage : {
        marginTop:34,
    },
    image:{
        width:20,
        height:20,
        marginLeft:24,
    },
    jianTouStyle : {
        marginRight:15,
        marginTop:5,
    },
    titleStyle : {
        marginLeft:24,
        marginTop:3,
        fontSize:16,
        color:'#333333',
    },
    packgerStyle : {
        marginLeft:10,
        marginTop:5,
        fontSize:12,
        color:'#666666',
        flexDirection :'row'
},
    rowStyle:{
        marginTop:12,
        flexDirection:'row',
    },
    rowWrap:{
        marginTop:13,
        flexWrap :'wrap'
    },
    textGrayStyle : {
    marginLeft:24,
        marginTop:3,
        fontSize:12,
        color:'#666666',
        flex:1,
    },
    rowCenterWrap:{
        marginTop:13,
        flexDirection :'row'
    }
});


