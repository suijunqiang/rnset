'use strict';

import React, {} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text
} from 'react-native';

let style = { position: 'absolute', backgroundColor: '#F00' };

const movable = {
  backgroundColor: 'green',
  width: 100,
  height: 100,
  position: 'absolute'
}

var Thumb = React.Component({
  getInitialState: function () {

    console.log('Thumb image');
    return {
      movablePosition: {}
    }
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    return false;
  },

  getImageSize: function() {
    return {
      height: this.props.height,
      width: this.props.width
    }
  },

  render: function() {
    return (
      <View style={styles.thumb}>
        <Image style={this.getImageSize()} source={{uri:this.props.uri}} resizeMode={'contain'}></Image>

      </View>
    );
  }
});

var ImageViewer = React.Component({
  createThumbRow: function(uri, i) {
    return <Thumb key={i} uri={uri} width={this.props.width} height={this.props.height}/>;
  },

  getInitialState: function() {
      return {
        index: this.props.index,
        contextText: this.props.picTextList[this.props.index],
      };
  },

  componentDidMount:function(){
     this.setState({index:this.props.index});
     this.setState({contextText: this.props.picTextList[this.props.index]});
  },
  createPointRow: function(filled, i) {
    if (filled) {
      return <View key={i} style={{marginLeft: 5, width: 10, height: 10, borderRadius: 5, backgroundColor: '#FFFFFF'}}></View>;
    } else {
      return <View key={i} style={{marginLeft: 5, width: 10, height: 10, borderRadius: 5, backgroundColor: '#A8A8A8'}}></View>;
    }
  },

  onScroll: function(a) {
    var i = Math.round(a.nativeEvent.contentOffset.x / this.props.width) ;
    this.setState({index: i});
    this.setState({contextText:this.props.picTextList===undefined?'':this.props.picTextList[i]});
    
  },

  render: function() {
    var points = [];
    for (var i = 1; i <= this.props.data.length; i++) {
      if (i == this.state.index) {
        points.push(true);
      } else {
        points.push(false);
      }
    }

    return (
      <View style={{backgroundColor: '#000000',flex:1}}>

        <View style={{flex:1}}>
          <Text style={styles.titleText}>{this.state.index + 1}/{this.props.data.length}</Text>
        </View>
        <View>
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onScroll={this.onScroll}
            scrollEventThrottle={1}
            bounces={false}>
            {this.props.data.map(this.createThumbRow)}
          </ScrollView>
        </View>

        <View style={{top: -40, backgroundColor: 'rgba(255,250,0,0)'}}>
          <Text style={styles.contentText}>{this.state.contextText}</Text>
        </View>
      </View>
    );
  },
});


var styles = StyleSheet.create({
  thumb: {
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  mainImageBox: {
    backgroundColor: 'rgba(0,0,0,0)',
    alignSelf: 'center',
    paddingLeft:15,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  container: {
    backgroundColor: 'red',
    flex: 1
  },
  contentText:{
    top: -40,
    backgroundColor: 'rgba(0,0,0,0)',
    color:'white',
  },
  titleText:{
    top: -35,
    textAlign:'center',
    backgroundColor: 'rgba(0,0,0,0)',
    color:'white',
  }

});


/*

 <GestureView
 style={movable}
 gestures={[drag, pinch]}
 toStyle={(layout) => {
 return {
 top: layout.y,
 left: layout.x,
 width: layout.width,
 height: layout.height,
 transform: [{rotate: `${layout.rotate}deg`}]
 }
 }}
 onError={console.error.bind(console)}>
 <View style={{top: -40, backgroundColor: 'rgba(255,250,0,250)'}}>
 <Text>Hello......................</Text>
 </View>
 </GestureView>

 */
module.exports = ImageViewer;
