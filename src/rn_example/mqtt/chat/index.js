/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  AsyncStorage,
  FlatList,
} from 'react-native';

//import { FormLabel, FormInput,Button } from 'react-native-elements'

import init from 'react_native_mqtt';

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync : {
  }
});
const options1 = {
  host: 'iot.eclipse.org',
  port: 443,
  path: "/testTopic",
  // path: "uname",
  id: "id_" + parseInt(Math.random()*100000),
  topic: "testTopic"
}
const options = {
  host: 'suijunqiang.top',
  port: 8084,
  path: "/message",
  // path: "uname",
  id: "id_" + parseInt(Math.random()*100000),
  topic: "message",
  subscribe:"message"
}
client = new Paho.MQTT.Client(options.host, options.port, options.path);

export default class ChatMQTT extends Component {
  constructor(props){
    super(props)
    this.state={
      message: "",
      messageList: [],
      status: 'isFetching',
    }
    client.onConnectionLost = this.onConnectionLost;
    client.onMessageArrived = this.onMessageArrived;
    client.connect({
      onSuccess:this.onConnect,
      useSSL: true,
      timeout:3,
      onFailure:this.onFailure
    });
  }
  onConnect = () => {
    console.log("onConnect");
    this.setState({
      status: 'connected',
    })

    //client.subscribe('testTopic', { qos: 0 })
    client.subscribe('message', { qos: 0 })
    var message = new Paho.MQTT.Message("Welcome " + options.id);
    message.destinationName = options.topic;
    client.send(message);
  }
  onConnectionLost=(responseObject)=>{
    // setTimeout(this.onConnect,100)
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }
  onFailure = (err) => {
    console.log("Connect failed!")
    console.log(err)
    this.setState({
      status: 'failed',
    })
  }
  onMessageArrived = (message )=> {
    console.log("onMessageArrived:"+message.payloadString);
    newmessageList = this.state.messageList
    newmessageList.push(message.payloadString)
    this.setState({
      messageList: newmessageList,
    })
  }
  onChangeMessage = (text) => {
    this.setState({
      message: text
    })
  }
  sendMessage = () =>{
    var message = new Paho.MQTT.Message(options.id+":"+this.state.message);
    message.destinationName = options.topic;
    client.send(message);
  }
  renderRow = ({ item, index }) => {
    idMessage = item.split(":");
    console.log('>>>ITEM', item)
    return(
      <View 
        style={[
          styles.componentMessage,
          idMessage[0] == options.id ? styles.myMessageComponent : ( idMessage.length == 1 ? styles.introMessage : styles.messageComponent ),
        ]}
      >
        <Text style={idMessage.length == 1 ? styles.textIntro : styles.textMessage}>
          {item}
        </Text>
      </View>
    )
  }
  _keyExtractor = (item, index) => item + index;
  render() {
    const { status, messageList } = this.state;
    return (
      <View style={styles.container}>
        <Text>Message</Text>
        <TextInput onChangeText={this.onChangeMessage}/>
        <Button
          buttonStyle={{marginTop:16,}}
          icon={{name: 'send'}}
          title='SUMBMIT'
          backgroundColor={status === 'failed' ? 'red' : '#397af8'}
          onPress={this.sendMessage}
          loading={status === 'isFetching' ? true : false}
          disabled={status === 'isFetching' ? true : false}
          />
        <View style={styles.messageBox}>
          <FlatList
            data={messageList}
            renderItem={this.renderRow}
            keyExtractor={this._keyExtractor}
            extraData={this.state}
            />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:70,
    backgroundColor:'#FFF000',

  },
  messageBox:{
    margin:16,
    flex: 1,
  },
  myMessageComponent:{
    backgroundColor:'#000000',
    borderRadius:3,
    padding:5,
    marginBottom:5,
  },
  messageComponent:{
    marginBottom:5,
    backgroundColor:'#0075e2',
    padding:5,
    borderRadius:3,
  },
  introMessage:{

  },
  textIntro:{
    color:'black',
    fontSize:12,
  },
  textMessage:{
    color:'white',
    fontSize:16,
  },
});
