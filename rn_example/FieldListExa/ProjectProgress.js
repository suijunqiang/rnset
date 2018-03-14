/**
 * Created by user on 16/5/27.
 */
import React,{
    Component,
} from 'react'

import  {
    View,
    StyleSheet,
    ListView,
    Text,
    NativeMethodsMixin,
} from 'react-native';
import BasePage from '../../Component/Common/BasePage';
import PageView from '../../Component/Common/PageView';
import NetController from '../../Core/Network/NetController';
import Url from '../../Core/Network/Url';
import BListView from '../../Component/Common/BListView'
import RoutingLogSecondCell from './RoutingLogSecondCell';
import RoutingLogFirstCell from './RoutingLogFirstCell';
import RoutingLogHeader from './RoutingLogHeader';
import EmptyView           from '../../Component/Common/EmptyView'
import Reminder from '../../Component/Common/Reminder'

export default class ProjectProgress extends BasePage {
    lastComplateSection='';
    isScrolled=false;
    constructor (props) {
        super (props);
        this.state={
            ...this.state,
            projectId:props.projectId,
            trackId:props.trackId,
            netWorkData:{},
            useData:{},
            data:{},
            showReminder:true,
            hasLoaded:false,
        }
    }
    componentDidMount(){
        super.componentDidMount();
        NetController.requestWithAll(this,Url.projectProgressDetail(this.state.projectId,this.state.trackId),
            function (data,message) {
                let newData={};
                let useData={}
                if(data.milestoneList&&data.milestoneList.length>0){
                    data.milestoneList.forEach(function(item,i){
                        let rowArray=[];
                        item.phaseList.forEach(function(item,i){
                            rowArray[rowArray.length]=item;
                            rowArray=rowArray.concat(item.processList);
                        }.bind(this));
                        newData[i]=rowArray;
                        console.log('length========',rowArray.length);
                        useData[i]=[].concat(rowArray);
                    })
                }
                this.setState({
                    netWorkData:data,
                    useData:useData,
                    data:newData,
                    hasLoaded:true,
                })
            }.bind(this),function (code,message) {

            });
    }
    headerBtnPressd(sectionData,sectionID){
        let date=this.state.useData[sectionID];
        let listData= this.state.data;
        if(!this.state.data[sectionID]||this.state.data[sectionID].length===0){
            listData[sectionID]=date;
            this.setState({data:listData});
        }else{
            listData[sectionID]=[];
            this.setState({data:listData});
        }

    }
    renderSectionHeader(sectionData, sectionID){
        let sectionItem = this.state.netWorkData.milestoneList[sectionID];

        console.log('sectionItem=====header',sectionID,sectionItem);
        let ref=sectionID;

        return (<RoutingLogHeader text={sectionItem.resume}
                                  isOpen={sectionData&&sectionData.length>0} 
                                  buttonPressed={this.headerBtnPressd.bind(this,sectionData,sectionID)}
        />)
    }
    renderSeparator(sectionID, rowID, adjacentRowHighlighted){
        let isEnd = (rowID==this.state.data[sectionID].length-1);
        var marginLeft=isEnd?0:40;
        return (<View style={{height:0.5,backgroundColor:'#dadada',marginLeft:marginLeft}} key={''+rowID+sectionID} ref={'sectionID'+sectionID+'rowID'+rowID}></View>)
    }
    renderRow(rowData,sectionID,rowID){
        sectionID = parseInt(sectionID);
        rowID = parseInt(rowID);
        let isHead = (rowID==0);
        let isEnd = (rowID==this.state.data[sectionID].length-1);
        let position =(isHead&&isEnd)?4:(isHead?1:(isEnd?3:2));


        let frontState=false;
        let nextState=false;

        if(!isHead){
            let frontData=this.state.data[sectionID][rowID-1];
            frontState=(frontData.status==2);
        }

        if(!isEnd){

            let nextData=this.state.data[sectionID][rowID+1];
            nextState=(nextData.status==2);
        }
        if(rowData.status==2){
            this.lastComplateSection=sectionID;
        }
        if(rowData.phaseName){
            let message= '';
            if(sectionID===0&&rowID===0){
                message='业主到场交底';
            }else if(rowData.userCheck==1){
                message='业主到场验收';
            }
            return <RoutingLogFirstCell  position={position} frontState={frontState} nextState={nextState} selfState={rowData.status==2} message={rowData.phaseName} detailMessage={message}/>
        }else{
            return <RoutingLogSecondCell position={position} frontState={frontState} nextState={nextState} selfState={rowData.status==2} message={rowData.stepName}/>
        }

    }
    componentDidUpdate(prevProps,prevState){
        if(this.lastComplateSection>0&&!this.isScrolled){
            let y =0;
            for(let i = 0;i<this.lastComplateSection;i++){
                let rowCount = this.state.useData[i].length;
                y=y+40+rowCount*44.5;
            }
            this.refs.listView.scrollTo({x:0,y:y,animated:false});
            this.isScrolled=true;
        }


    }
    renderView(){

        if(this.state.hasLoaded){
            if(this.state.netWorkData.milestoneList&&this.state.netWorkData.milestoneList.length>0){
                return (<View style={{flex:1}}>

                        {this.state.showReminder&&this.state.netWorkData.workState!=="暂停"&&this.state.netWorkData.changeTime&&(<Reminder text={'更新日期:'+this.state.netWorkData.changeTime} isUseTimer={true} closeFunc={()=>{this.setState({showReminder:false})}}/>)}
                        {this.state.showReminder&&this.state.netWorkData.workState==="暂停"&&(<Reminder text={'施工暂停'} isShowClose={true} closeFunc={()=>{this.setState({showReminder:false})}}/>)}

                        <BListView
                            ref={'listView'}
                            style={styles.listView}
                            data={this.state.data}
                            initialListSize={20}
                            renderRow={this.renderRow.bind(this)}
                            renderSectionHeader={this.renderSectionHeader.bind(this)}
                            renderSeparator={this.renderSeparator.bind(this)}
                        />
                    </View>

                )
            }else{
                return (<EmptyView isShow={true} description={'暂无施工进度'}/>)
            }
        }

    }
    render () {
        return (
            <PageView fromPage={this} title={'施工进度'} {...this.state}>
                {this.renderView()}
            </PageView>
        )
    }
}
let styles = StyleSheet.create({
    listView:{
        flex:1,
        backgroundColor:'#f8f8f8'
    },

});