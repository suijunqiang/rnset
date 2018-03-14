/**
 * Created by SJQ on 16/5/26.
 */
import React,{
    Component,
} from 'react'

import{
    View,
    ListView,
    StyleSheet,
    Image,
    TouchableHighlight,
    Text,
    ScrollView,
    TouchableOpacity,
    Navigator,

} from 'react-native';

import BasePage            from '../../Component/Common/BasePage';
import PageView            from '../../Component/Common/PageView';
import NetController       from '../../Core/Network/NetController';
import Url                 from '../../Core/Network/Url';
import ImgMainScreen       from '../../Component/Common/imgMainScreen';
import FieldManagementView from './FieldManagementView';
import BScrollableTab    from '../../Component/Common/BScrollableTab';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import BListView           from '../../Component/Common/BListView';
import EmptyView           from '../../Component/Common/EmptyView'

var recentMilestoneId = '0';
export default class CheckList extends BasePage {
    constructor (props) {
        super (props);

        this.state={
            ...this.state,
            data:props.data,
            projectId:props.projectId,
        }
    }
    componentDidMount(){
        super.componentDidMount();
        if(!this.state.data){
            NetController.requestWithAll(this,
                Url.projectOnlineList(this.state.projectId),
                function (data,message) {
                    this.setState({
                        data:data.nextData,
                        recentMilestoneId:data.nextData.recentMilestoneId,
                    });

                }.bind(this),function (code,message) {//失败回调

                }.bind(this));
        }

    }
    componentWillUnmount() {
        super.componentWillUnmount();
    }


    toNew(images,index){
        this.push(ImgMainScreen,{imgList:images,index:index})
    }
    renderTab(){
        if(this.state.data&&this.state.data.recentMilestoneId){
            let index=0;
            this.state.data.milestones.map((item,i)=>{
                if(item.id===this.state.data.recentMilestoneId){
                    index=i;
                }
            });
            return (<ScrollableTabView style={styles.container} initialPage={index} renderTabBar={() => <BScrollableTab/>}>
                {this.renderView()}
            </ScrollableTabView>)
        }
    }
    renderRow(rowData,sectionID,rowID){
        return (<FieldManagementView key={''+rowID+'q'+sectionID} style={styles.container}  data={rowData}  onPressImage={this.toNew.bind(this)}/>)
    }
    renderView(){

        return this.state.data.milestones.map((item,i)=>{
            if(this.state.data.checks[item.id]&&this.state.data.checks[item.id].length>0){
                return (
                    <BListView
                        tabLabel={item.milestoneNick}
                        key = {item.id}
                        data={this.state.data.checks[item.id]?this.state.data.checks[item.id]:[]}
                        renderRow={this.renderRow.bind(this)}
                    />
                )
            }else{
                return (<EmptyView tabLabel={item.milestoneNick} key = {item.id}  isShow={true} description={'当前里程碑暂无巡检日志'}/>)
            }

        });
    }
    render(){
        return(
            <PageView fromPage={this} title={'巡检日志'} {...this.state}>
                {this.renderTab()}
            </PageView>
        )
    }
}

var styles = StyleSheet.create({
    tabView: {
        flex: 1,
        padding: 10,
        backgroundColor: 'rgba(222,222,222,0.01)',

    },
    container: {
        flex: 1,
    },

});