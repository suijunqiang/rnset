/**
 * Created by SJQ on 05/02/2018.
 */


import React, {Component} from 'react';
import {Platform, View, ScrollView, Switch,Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import {Theme, NavigationPage, ListRow, NavigationBar, Label,TeaNavigator,KeyboardSpace} from 'teaset';
export default class BasePage extends NavigationPage {

    requestList = new Array();

    static propTypes = {
        ...BasePage.propTypes,
        title: PropTypes.string,
        showBackButton: PropTypes.bool,
        navigationBarInsets: PropTypes.bool,
    }; 
    static defaultProps = {
        ...BasePage.defaultProps,
        scene: TeaNavigator.SceneConfigs.PushFromRight,
        title: null,
        showBackButton: false,
        navigationBarInsets: true,
    };

    constructor(props) {
        super(props);
        console.log("SJQ: constructor");
        //disable the yellow warning or not when run our application on devices/simulator.
        console.disableYellowBox = true;

        this.screenWidth = Dimensions.get('window').width;
        Object.assign(this.state, {
            type: 'iOS',
            title: 'String',
            leftView: 'Back button',
            rightView: 'None',
            bgColor: 'Default',
            tintColor: 'Default',
            hidden: false,
            animated: true,
            statusBarStyle: 'Light Content',
            statusBarHidden: false,
            isShowLoad:false,
            isShowNoWifi:false,
            wifiCallback:this.wifiCallback,
            showReminder:false,
            reminderText:'',
            hideReminder:this.hideReminder.bind(this),
        });

    }
    buildProps() {
        let {navigationBarInsets, ...others} = super.buildProps();
        let {left: paddingLeft, right: paddingRight} = Theme.screenInset;
        let pageContainerStyle = [{
            flex: 1,
            paddingLeft,
            paddingRight,
            marginTop: navigationBarInsets ? (Theme.navBarContentHeight + Theme.statusBarHeight) : 0,
        }];
        return ({navigationBarInsets, pageContainerStyle, ...others});
    }

    onLayout(e) {
        let {width} = Dimensions.get('window');
        if (width != this.screenWidth) {
            this.screenWidth = width;
            this.forceUpdate();
        }
        this.props.onLayout && this.props.onLayout(e);
    }
    backToHome(){
        this.props.navigator.popToTop();
    }
    showLogin(){

    }
    back(){
        this.props.navigator.pop();
    }
    present(page,params,title){
        console.log('ertyuio');
        this.props.navigator.push({
            component:page,
            title:title,
            sceneConfig:Navigator.SceneConfigs.FloatFromBottom,
            //sceneConfig:NavigationExperimental.Navigator.SceneConfigs.FloatFromBottom,

            params:params,
        });
    }

    push(page,params,title){
        this.props.navigator.push({
            component:page,
            title:title,
            sceneConfig:Navigator.SceneConfigs.PushFromRight,
            //sceneConfig:NavigationExperimental.Navigator.SceneConfigs.PushFromRight,
            params:params,
        });
    }

    downKeyboard(){
        dismissKeyboard();
    }
    componentDidMount(){
    }
    componentWillUnmount(){
        this.requestList.forEach((request,i)=>{
            request.abort();
        });
        this.requestList.slice(0,this.requestList.length);

    }
    wifiCallback(){

    }
    showLoad(isShow){
        this.setState({
            isShowLoad:isShow,
        })
    }
    showNoWifi(isShow,callback){
        this.setState({
            isShowNoWifi:isShow,
            wifiCallback:callback,
        })
    }
    showReminder(str:string){
        this.setState(
            {
                reminderText:str,
                showReminder:true,
            }
        )
    }
    hideReminder(){
        this.setState(
            {
                showReminder:false,
            }
        )
    }

    get type() {
        switch (this.state.type) {
            case 'Auto': return Platform.OS;
            default: return this.state.type.toLowerCase();
        }
    }

    get style() {
        switch (this.state.bgColor) {
            case 'Default': return null;
            case 'Custom': return {backgroundColor: '#e75f35'};
        }
    }

    get tintColor() {
        switch(this.state.tintColor) {
            case 'Default': return null;
            case 'Custom': return '#3af455';
        }
    }

    get statusBarStyle() {
        switch(this.state.statusBarStyle) {
            case 'Default': return 'default';
            case 'Light Content': return 'light-content';
        }

    }

    renderLeftRightView(item) {
        switch (item) {
            case 'None':
                return null;
            case 'Back button':
                return (
                    <NavigationBar.BackButton
                        title={'    '}
                        onPress={() => this.navigator.pop()}
                    />
                );
            case 'Link button':
                return (
                    <NavigationBar.LinkButton title='Link' />
                );
            case 'Icon button':
                return (
                    <NavigationBar.IconButton icon={require('./icons/search.png')} />
                );
            case 'Two icon button':
                return (
                    <View style={{flexDirection: 'row'}}>
                        <NavigationBar.IconButton icon={require('./icons/edit.png')} />
                        <NavigationBar.IconButton icon={require('./icons/trash.png')} />
                    </View>
                );
        }
    }

    renderNavigationTitle() {
        let {title} = this.state;
        switch (title) {
            case 'String':
                return this.props.title;
            case 'Custom':
                let titleStyle = {
                    flex: 1,
                    paddingLeft: 4,
                    paddingRight: 4,
                    alignItems: this.type === 'ios' ? 'center' : 'flex-start',
                };
                return (
                    <View style={titleStyle}>
                        <Label style={{color: Theme.navTitleColor, fontSize: 15}} text='Title' />
                        <Label style={{color: Theme.navTitleColor, fontSize: 11}}  text='Secondary title' />
                    </View>
                );
        }
    }
    renderNavigationLeftView() {
        console.log("SJQ:" + this.state.leftView);
        return this.renderLeftRightView(this.state.leftView);
    }

    renderNavigationRightView() {
        return this.renderLeftRightView(this.state.rightView);
    }

    renderNavigationBar() {
        let {hidden, animated, statusBarHidden} = this.state;
        return (
            <NavigationBar
                style={this.style}
                type={this.type}
                title={this.renderNavigationTitle()}
                leftView={this.renderNavigationLeftView()}
                rightView={this.renderNavigationRightView()}
                tintColor={this.tintColor}
                hidden={hidden}
                animated={animated}
                statusBarStyle={this.statusBarStyle}
                statusBarHidden={statusBarHidden}
            />
        );
    }

    renderPage() {
        return null;

    }
    render() {
        let {autoKeyboardInsets, keyboardTopInsets, pageContainerStyle, onLayout, ...others} = this.buildProps();
        return (
            <View onLayout={e => this.onLayout(e)} {...others}>
                <View style={{flex: 1}} >
                    <View style={pageContainerStyle}>
                        {this.renderPage()}
                    </View>
                    {this.renderNavigationBar()}
                </View>
                {autoKeyboardInsets ? <KeyboardSpace topInsets={keyboardTopInsets} /> : null}
            </View>
        );
    }

}