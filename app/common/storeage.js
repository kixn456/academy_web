/**
 * Created by JeaStone on 2017/9/18.
 */

export default class Storage {

    /**
     * @extends {parent_type} get
     * @return {string||Object}
     * */

    static get(key){
       let localData=sessionStorage.getItem(key);
        if(localData!=null)
        {
            try{
                return localData=JSON.parse(localData);
            }catch (e){
                return false;
            }
        }else{
            return false;
        }
    }

    /**
     * @param {key,value} param_name
     * @type {type}
     *
     **/

    static set(key,value){
        if(typeof value=='object')
        {
            value=JSON.stringify(value);
        }
        sessionStorage.setItem(key,value)
    }

}
