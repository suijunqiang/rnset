/**
 * Created by user on 16/5/27.
 */
var ConfigData = {
  // environment:'production',
//    environment:"staging",
    // environment:"dev",
   environment:"skybureau",
    production:{
        environment:'production',
        domain:'http://192.168.251.12:3000/apis/3/dms',
        loginDomain:'http://192.168.251.188:8080/service-container/apis',

        umengAnalyticsKeyIOS:'575e1f9b67e58ebb65000232',
        umengAnalyticsKeyAndroid:'575e4cc6e0f55a805c001bfc',

        channelIdIOS:'AppStore',
        channelIdAndroid:'production',

        umengPushKeyIOS:'575e1f9b67e58ebb65000232',
        umengPushKeyAndroid:'575e4cc6e0f55a805c001bfc',
        umengPushSecretAndroid:'db87c9ddb1c4d8d2bd796f0c067cd779',
        
        codePushIOS:'',
        codePushAndroid:'',
    },
    staging:{
        environment:"staging",
        domain:'http://192.168.251.16:8100/dms-user',
        loginDomain:'http://192.168.251.188:8080/service-container/apis',

        umengAnalyticsKeyIOS:'575e1f9b67e58ebb65000232',
        umengAnalyticsKeyAndroid:'575e4cc6e0f55a805c001bfc',

        channelIdIOS:'staging',
        channelIdAndroid:'staging',
        
        umengPushKeyIOS:'575e1f9b67e58ebb65000232',
        umengPushKeyAndroid:'575e4cc6e0f55a805c001bfc',
        umengPushSecretAndroid:'db87c9ddb1c4d8d2bd796f0c067cd779',
        
        
        codePushIOS:'',
        codePushAndroid:'',
    },
    dev:{
        environment:"dev",
        domain:'http://192.168.251.12:3000/apis/3/dms',
        loginDomain:'http://192.168.251.188:8080/service-container/apis',

        umengAnalyticsKeyIOS:'575e1f9b67e58ebb65000232',
        umengAnalyticsKeyAndroid:'575e4cc6e0f55a805c001bfc',
        
        channelIdIOS:'dev',
        channelIdAndroid:'dev',
        
        
        umengPushKeyIOS:'575e1f9b67e58ebb65000232',
        umengPushKeyAndroid:'575e4cc6e0f55a805c001bfc',
        umengPushSecretAndroid:'db87c9ddb1c4d8d2bd796f0c067cd779',

        codePushIOS:'',
        codePushAndroid:'',
    },
    skybureau:{
        environment:"skybureau",

        domain:'http://www.skybureau.cn/bandq/user/dms',
        loginDomain:'http://www.skybureau.cn/bandq/user/service-container/apis',
        registerUser:'http://www.skybureau.cn/php/mobile',
    },

};


function Config(){
    return ConfigData[ConfigData.environment];
}

module.exports = Config;
