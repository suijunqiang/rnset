/**
 * Created by user on 16/6/3.
 */
import React,{
    Component,
} from 'react'

import {
    View,
    StyleSheet,
    Image,
    ScrollView,
    TouchableWithoutFeedback,

} from 'react-native';
import PropTypes from 'prop-types';

export default class PageView extends Component {
    constructor(props: any) {
        super(props);
    }
    static propTypes = {
        //stylec:View.propTypes.style,
        picList:PropTypes.array,
        pressImageAtIndex:PropTypes.func,
    }
    static defaultProps = {
        picList: [],
        style:{
            height:100,
        }
    }
    imagePress(index){
        if(this.props.pressImageAtIndex){
            this.props.pressImageAtIndex(index);
        }
    }
    renderImage(){
        if(this.props.picList){
            let returnItem= this.props.picList.map(function(item,i){
                let height = this.props.style.height?this.props.style.height:100;
                let margin = (i==0?{marginLeft:15}:{});
                return(
                    <TouchableWithoutFeedback key={i} onPress={this.imagePress.bind(this,i)}>
                        <Image style={[styles.img,margin,{width:height,height:height}]} source={{uri:item.picUrl}} />
                    </TouchableWithoutFeedback>
                )
            }.bind(this));
            return returnItem;
        }
    }
    
    render () {
        return (
            <ScrollView
                automaticallyAdjustContentInsets={false}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={[{height:100},this.props.style]}>
                {this.renderImage()}
            </ScrollView>
        )
    }
}
let styles = StyleSheet.create({
    button: {
        alignItems: 'center',
    },
    img: {
        marginRight:7,
        resizeMode:'cover',
    },
});