/**
 * Created by user on 16/6/14.
 */
import RNStorage from 'react-native-storage';

export default class Storage{
    static storage=new RNStorage({
        // 最大容量，默认值1000条数据循环存储
        size: 1000,

        // 数据过期时间，默认一整天（1000 * 3600 * 24秒），设为null则永不过期
        defaultExpires: null,
        // 读写时在内存中缓存数据。默认启用。
        enableCache: true,
        // 如果storage中没有相应数据，或数据已过期，
        // 则会调用相应的sync同步方法，无缝返回最新数据。
        sync : {
            // 同步方法的具体说明会在后文提到
        }
    });

    static set(key,value,expires){
        if(expires){
            return Storage.storage.save({
                key: key,  //注意:请不要在key中使用_下划线符号!
                rawData: value,
                expires: expires
            });
        }else
        {
            return Storage.storage.save({
                key: key,  //注意:请不要在key中使用_下划线符号!
                rawData: value
            });
        }
    }
    static get(key){
        return Storage.storage.load({
            key: key,
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
            autoSync: false,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用同步方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true
        });

    }
    static remove(key){
        return Storage.storage.remove({
            key:key
        });
    }
    static clear(key){
        return Storage.storage.clearMapForKey(key);
    }
}