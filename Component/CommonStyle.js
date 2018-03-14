/**
 * Created by user on 16/5/26.
 */

var CommonStyle = {
    /***@return 用于大多数文字(次要标幅语,时间,备注)*/
    fontSize_9:9,
    /***用于大多数文字(小标题,模块描述)*/
    fontSize_12:12,
    /***用于大多数文字(列表次要信息,大段文字)*/
    fontSize_14:14,
    /***用于较重要的标题(个别突出信息等)*/
    fontSize_15:15,
    /***用于较重要的标题(模块标题,分类名称)*/
    fontSize_16:16,
    /***用于少数重要标题(导航标题,分类名称等)*/
    fontSize_18:18,

    /***@return 用于大多数文字(次要标幅语,时间,备注)*/
    fontSize_9_lh_15:{
        fontSize:9,
        lineHeight:15,
    },
    /***用于大多数文字(小标题,模块描述)*/
    fontSize_12_lh_20:{
        fontSize:12,
        lineHeight:20,
    },
    /***用于大多数文字(列表次要信息,大段文字)*/
    fontSize_14_lh_24:{
        fontSize:14,
        lineHeight:24,
    },
    /***用于较重要的标题(个别突出信息等)*/
    fontSize_15_lh_25:{
        fontSize:15,
        lineHeight:25,
    },
    /***用于较重要的标题(模块标题,分类名称)*/
    fontSize_16_lh_28:{
        fontSize:16,
        lineHeight:28,
    },
    /***用于少数重要标题(导航标题,分类名称等)*/
    fontSize_18_lh_30:{
        fontSize:18,
        lineHeight:30,
    },
    
    color_pageBackground:'#efefef',
    color_topReminder:'#FFB399',
    /***顶部导航栏文字颜色,高亮信息颜色,按钮颜色*/
    color_orange:'#ff9000',
    /***用于主要文字信息颜色,内页标题信息*/
    color_black:'#333333',
    /***用于普通级别段落信息*/
    color_light_black:'#666666',
    /***用于辅助,次要的文字信息*/
    color_gray:'#999999',
    /***分割线,用于模块等重要分割线*/
    color_light_gray:'#dadada',
    /***底色,用于模块等重要分割*/
    color_white_gray:'#efefef',
    /***警告色(删除,输入框报错)*/
    color_red:'#f22222',
    /***辅助色,紫色*/
    color_purple:'#8d6cea',
    /***辅助色,红色*/
    color_light_red:'#f76767',
    /***辅助色,黄色*/
    color_yellow:'#f4b423',
    /***辅助色,绿色*/
    color_green:'#95cd84',

    /***按钮*/
    btn_left_margin:10,
    btn_right_margin:10,
    btn_top_margin:15,
    btn_color:'#6EB8FE',
    btn_height:40,
    btn_borderRadius:5,
    btn_justifyContent:'center',
    btn_alignItems:'center',

    /***编辑框*/
    et_color:'#FFFFFF',
    et_height:35,
    et_margin_top:10,
    et_margin_left:10,
    et_margin_right:10,

}
module.exports = CommonStyle;
