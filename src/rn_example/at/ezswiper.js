/**
 * Created by SJQ on 25/01/2018.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    Image
} from 'react-native';

const { height, width } = Dimensions.get('window');
import EZSwiper from 'react-native-ezswiper';

import BasePage         from '../../components/common/BasePage';
import PageView         from '../../components/common/PageView';
const images = [require(`./resource/0.jpg`),require(`./resource/1.jpg`),require(`./resource/2.jpg`),require(`./resource/3.jpg`),require(`./resource/4.jpg`),require(`./resource/5.jpg`),require(`./resource/6.jpg`),require(`./resource/7.jpg`),require(`./resource/8.jpg`)]

export default class App extends BasePage{
    constructor(props) {
        super(props)

    }

    renderHeader(){
        return (<View style={{height:0,backgroundColor:'rgba(0,0,0,0)'}}></View>)
    }
    renderTitle(title){
        return <Text style={{backgroundColor:'green'}}>{title}</Text>
    }

    renderRow(obj, index) {
        return (
            <View style={[styles.cell,{backgroundColor:index % 2 === 0 ? 'red' : 'yellow'}]}>
                <Text>{obj}</Text>
            </View>
        )
    }

    renderImageRow(obj, index) {
        return (
            <View style={[styles.cell,{backgroundColor: 'gray',overflow:'hidden'}]}>
                <Image
                    style={{position:'absolute',top:0,right:0,bottom:0,left:0,width: undefined, height: undefined}}
                    resizeMode={'contain'}
                    source={obj}/>
                <Text style={{backgroundColor:'transparent',color:'white'}}>{'Victoria\'s Secre ' + index}</Text>

            </View>
        )
    }


    onPressRow(obj, index) {
        console.log('onPressRow=>obj:'+ obj + ' ,index:' + index);
        alert('onPressRow=>obj:'+ obj + ' ,index:' + index);
    }

    onWillChange(obj, index) {
        console.log('onWillChange=>obj:'+ obj + ' ,index:' + index);
        // alert('onWillChange=>obj:'+ obj + ' ,index:' + index);
    }

    onDidChange(obj, index) {
        console.log('onDidChange=>obj:'+ obj + ' ,index:' + index);
        // alert('onDidChange=>obj:'+ obj + ' ,index:' + index);
    }

    render() {
        return (
            <PageView fromPage={this} title={'EZSwiper'} {...this.state}>
            <ScrollView style={[styles.container]} contentInsetAdjustmentBehavior="automatic">
                {this.renderTitle('test')}
                <EZSwiper style={[styles.swiper,{width: width,height: 150 }]}
                          dataSource={['0', '1' ,'2','3']}
                          width={ width }
                          height={150 }
                          renderRow={this.renderRow}
                          onPress={this.onPressRow}
                          onWillChange={this.onWillChange}
                          onDidChange={this.onDidChange}
                          ratio={0.6}
                          index={2}
                          horizontal={true}
                          loop={true}
                          autoplayTimeout={2}
                />
                {this.renderTitle('normal')}
                <EZSwiper style={[styles.swiper,{width: width,height: 150 }]}
                          dataSource={['0', '1' ,'2','3']}
                          width={ width }
                          height={150 }
                          renderRow={this.renderRow}
                          onPress={this.onPressRow}
                />
                {this.renderTitle('card: ratio={0.867}')}
                <EZSwiper style={[styles.swiper,{width: width,height: 150 }]}
                          dataSource={images}
                          width={ width }
                          height={150 }
                          renderRow={this.renderImageRow}
                          onPress={this.onPressRow}
                          ratio={0.867}
                />
                {this.renderTitle('card: ratio={0.867},loop={false},index={2},width: width - 100')}
                <EZSwiper style={[styles.swiper,{width: width - 100,height: 150,marginHorizontal:50 }]}
                          dataSource={['0', '1' ,'2','3','4']}
                          width={ width - 100}
                          height={150 }
                          renderRow={this.renderRow}
                          onPress={this.onPressRow}
                          ratio={0.867}
                          loop={false}
                          index={2}
                />
                {this.renderTitle('card: ratio={0.867},horizontal={false}aaaa')}
                <EZSwiper style={[styles.swiper,{width: width,height: 150 }]}
                          dataSource={['0', '1' ,'2','3']}
                          width={ width }
                          height={150 }
                          renderRow={this.renderRow}
                          onPress={this.onPressRow}
                          cardParams={{cardSide:width*0.867, cardSmallSide:150*0.867,cardSpace:width*(1-0.867)/2*0.2}}
                />
                {this.renderTitle('card: ratio={0.867},horizontal={false}')}
                <EZSwiper style={[styles.swiper,{width: width,height: 200 }]}
                          dataSource={['0', '1' ,'2','3']}
                          width={ width }
                          height={200 }
                          renderRow={this.renderRow}
                          onPress={this.onPressRow}
                          ratio={0.867}
                          horizontal={false}
                />
            </ScrollView>
                </PageView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    swiper: {
        backgroundColor: 'white',
    },
    cell: {
        backgroundColor: 'red',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
