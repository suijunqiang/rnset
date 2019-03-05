/**
 * Created by user on 16/5/25.
 */

import React,{
    Component,
} from 'react'

import {
    StyleSheet,
    View,
    WebView,
    Dimensions,
    Platform,
    //Toast
} from 'react-native';

import BasePage    from '../../../components/common/BasePage';
import PageView    from '../../../components/common/PageView';
import NetWorkTool from '../../../core/network/NetWorkTool';

var WEBVIEW_REF = 'webview';

const HTML = `
<!DOCTYPE html>
<html>
  <head>
    <title>HTML字符串</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=320, user-scalable=no">
    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
        font: 62.5% arial, sans-serif;
        background: #ccc;
      }
      h1 {
        padding: 45px;
        margin: 0;
        text-align: center;
        color: #33f;
      }
    </style>
  </head>
  <body>
    <h1>加载静态的HTML文本信息</h1>
  </body>
</html>
`;

export default class FileManager extends BasePage {
    handleMethod(isConnected){
        console.log('test', (isConnected ? 'online' : 'offline'));
    }
    constructor (props) {

        super (props);

        this.state = {
            ...this.state,
            uri:'http://www.suijunqiang.top:3000',
            title:'文件管理',
        }
        NetWorkTool.checkNetworkState((isConnected)=>{
            if(!isConnected){
                //Toast.show(NetWorkTool.NOT_NETWORK);
            }
        });

    }
    componentWillMount() {
        NetWorkTool.removeEventListener(NetWorkTool.TAG_NETWORK_CHANGE,this.handleMethod);
    }
    componentWillUnmount() {
        NetWorkTool.removeEventListener(NetWorkTool.TAG_NETWORK_CHANGE,this.handleMethod);
    }
    webOnError (err) {

        //this.refs[WEBVIEW_REF].reload();
    }
    webStartLoad (res) {


    }
    render() {

        return (

            <PageView fromPage={this} {...this.state}>
            <View style={styles.container}>
                <WebView
                    ref={WEBVIEW_REF}
                    //html={HTML}
                    source = {{uri:this.state.uri}}
                    startInLoadingState={true}
                    //source = {{html:HTML}}
                    onError = {this.webOnError.bind(this)}
                    automaticallyAdjustContentInsets={true}
                    style={styles.webView}
                    onLoadStart = {this.webStartLoad.bind(this)}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    scalesPageToFit = {true}
                />
                </View>
                </PageView>
        );
    }
}
var styles = StyleSheet.create({


    container: {
        flex: 1,
        backgroundColor:'#c13331',
        ...Platform.select({
            ios: {
                paddingTop:0
            },
            android: {
                paddingTop:0
            },
        }),
    },
    webView : {

        height:Dimensions.get('window').height - 64,
        width:Dimensions.get('window').width,
        //backgroundColor:'red',
    },
    webStyle:{

        paddingTop:Platform.OS === 'ios'?20:0,
    }
});

