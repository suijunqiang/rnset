/**
 * Created by user on 16/5/27.
 */
import React,{
    Component,
} from 'react'

import {
    View,
    StyleSheet,
    ListView,
    Text,
    Navigator,
    InteractionManager,
    ScrollView, Switch
} from 'react-native';
import BListView from '../../Common/BListView';
import BasePage from '../../Common/BasePage';
import PageView from '../../Common/PageView';
import MessageCell from './MessageCell';
import NetController from '../../../Core/Network/NetController';
import Url from '../../../Core/Network/Url';
import KindlyReminder from './../KindlyReminder';


import {Theme, NavigationPage, ListRow, NavigationBar, Label} from 'teaset';

export default class MessageList extends BasePage {
    constructor (props) {
        super (props);
        this.state={
            ...this.state,
            data:{},
        }
    }

    renderNavigationBar() {
        return (
            <NavigationBar
                title={"MessageList"}
                leftView={ <NavigationBar.BackButton  onPress={() => this.navigator.pop()} />}
            />
        );
    }
    componentDidMount(){
        super.componentDidMount();
        InteractionManager.runAfterInteractions(()=>{
            NetController.requestWithAll(this,Url.msgList('111111'),
                function (data,message) {
                    this.setState({data:data.msgList});
                }.bind(this),function (code,message) {

                });
        });



    }

    toNew(images,index){
      //  this.push(ImgMainScreen,{imgList:images,index:index})
    }

    cellClickFunc(rowID){

        if(rowID==='0'){
            // NetController.requestWithAll(this,Url.fieldList2('1'),
            //         function (data,message) {
            //             console.log('data',data);
            //             if(data.nextType===2){
            //                 this.push(FieldManagement,{data:data.nextData});
            //             }
            //         }.bind(this),function (code,message) {
            //
            //     });



        }else {
            //this.push(RoutingLog);
        }

    }
    renderRow(rowData,sectionID,rowID){
        return (<MessageCell {...rowData} cellClickFunc={this.cellClickFunc.bind(this,rowID)}/>);
    }
    renderHeader(){
        return (<View style={{height:0,backgroundColor:'rgba(0,0,0,0)'}}></View>)
    }
    renderPage () {

        return (
            <PageView fromPage={this} {...this.state}>
            <ScrollView style={{flex: 1}}>
                <BListView
                    data={this.state.data}
                    renderRow={this.renderRow.bind(this)}
                    renderSectionHeader={this.renderHeader.bind(this)}
                />
                <KindlyReminder
                    title={'温馨提示'}
                    message={'温馨提示,温馨提示'}
                    visible = {this.state.kindlyReminderVisible}
                    setVisible={()=>{
                    console.log('setVisible');
                    this.setState({kindlyReminderVisible:false})
                    }
                    }
                />

            </ScrollView>
            </PageView>
        )
    }
}
let styles = StyleSheet.create({
    listView:{
        flex:1,
        // backgroundColor:CommonStyle.color_purple,

    }

});