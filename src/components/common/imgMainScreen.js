
/**
 * B&Q  Image viewer modules
 * https://www.b-and-qchina.com
 * SJQ
 * */

'use strict';

import BasePage            from '../../components/common/BasePage';
import PageView            from '../../components/common/PageView';
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} = React;

var Viewer      = require('./imageViewer.js');
var picList     = [];
var picTextList = [];
var creatImages = (imageUri,key) =>  <Image style = {{width:Dimensions.get('window').width
													  ,height:Dimensions.get('window').height}}
													   resizeMode={'contain'}
													   source={{uri : imageUri}} />
export default class  imgMainScreen  extends BasePage {

	constructor (props) {
		super (props);
		console.log('props',props)

		if(this.props.imgList===undefined){

			console.log('this.props.imgList is undefined');
		}else{
			if(picList===undefined){

				for(var i=0; i<this.props.imgList.length;i++){
					picList.push(this.props.imgList[i].picUrl);
					picTextList.push(this.props.imgList[i].showText===undefined?'':this.props.imgList[i].showText)
				}
			}else{

				picList.length     = 0;
				picTextList.length = 0;

				for(var i=0; i<this.props.imgList.length;i++){
					picList.push(this.props.imgList[i].picUrl);
					picTextList.push(this.props.imgList[i].showText===undefined?'':this.props.imgList[i].showText)
				}
			}
		}
	}

	componentDidMount(){
		super.componentDidMount();

		console.log('componentDidMount');
	}

	 _onBackClick(){
	    this.props.navigator.pop();
   }

  render() {
    return (
		<PageView fromPage={this} title={''} {...this.state} navStyle={styles.navStyle} titleStyle={styles.titleStyle}>

			<View>
			<Viewer data={picList} index={this.props.index} picTextList={picTextList} height={Dimensions.get('window').height - 68} width={Dimensions.get('window').width} key={this.props.key} />
			</View>

		</PageView>
    )
  }
}
var styles = StyleSheet.create({
	swiperBack: {
		backgroundColor: 'black',
		flex: 1,
	},
	navStyle:{
		backgroundColor:'black',
	},
	titleStyle:{
		color:'white',
		fontSize:14,
	},
	swiperBar: {

		backgroundColor: 'black',
		height: 44,
		width: Dimensions.get('window').width,
		justifyContent: 'center',
		flexDirection: 'row',
	},BQHeaderBackArrow:{
		paddingLeft: 15,
		width:22,
		height:35,
	},

	dotViewStyle: {
		backgroundColor: 'rgba(255,255,255,0.5)',
		width: 8,
		height: 8,
		borderRadius: 4,
		marginLeft: 3,
		marginRight: 3,
		marginTop: 3,
		marginBottom: 3
	},
	activeDotStyle: {

		backgroundColor: 'white',
		width: 8,
		height: 8,
		borderRadius: 4,
		marginLeft: 3,
		marginRight: 3,
		marginTop: 3,
		marginBottom: 3,
	},
	paginationStyle: {
		bottom: 3,
		left: null,
		right: 6,
	},
	BQHeaderViewAndroid: {
		height: 68,
		//height: Platfrom.OS === 'ios' ? 68 : 48,
		paddingTop: 15,
		paddingLeft: 15,
		//paddingTop: Platfrom.OS === 'ios' ? 20 : 0,
		backgroundColor: '#7073ca',
		alignItems: 'center',
		flexDirection: 'row',
	},
	BQHeaderViewAndroidImg: {
		height: 68,
		//height: Platfrom.OS === 'ios' ? 68 : 48,
		paddingTop: 20,
		paddingLeft: 15,
		//paddingTop: Platfrom.OS === 'ios' ? 20 : 0,
		backgroundColor: '#000000',
		alignItems: 'center',
		flexDirection: 'row',
	},
	BQHeaderViewTitle:{
		textAlign: 'center',
		fontSize: 18,
		flex:2,
		color:'white',
	},
})

/*

	<Swiper
		style = {styles.swiperBack}
		height={Dimensions.get('window').height - 68}
		autoplay={false}
		onMomentumScrollEnd={function(e, state, context){console.log('index:', state.index)}}
		dot={<View style={styles.dotViewStyle}/>}
		activeDot={<View style={styles.activeDotStyle}/>}
		paginationStyle={styles.paginationStyle}
		loop={true} key={this.props.key}>
	  {this.props.imgList.map(creatImages)}

	</Swiper>
*/


// <Viewer data={this.props.imgList} height={550} width={370} key={this.props.key} />
module.exports = imgMainScreen;
