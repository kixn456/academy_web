/**
 * Created by Administrator on 2017/10/19.
 *@description
 *@author
 *@out
 */


export function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
}

export function isEmptyString(s){
    if(s==""||s==null){
        return true;
    }else{
        return false;
    }
}


export function GetRequest(params) {
    var url = location.search; //获取url中"?"符后的字串
    if(params){
        url=params;
    }
    console.log(url);
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        let  str = url.substr(1);
        let strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}


export function clone(obj){

        // Handle the 3 simple types, and null or undefined or function
        if (null == obj || "object" != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            var copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }
        // Handle Array or Object
        if (obj instanceof Array | obj instanceof Object) {
            var copy = (obj instanceof Array)?[]:{};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr))
                    copy[attr] = clone(obj[attr]);
            }
            return copy;
        }
        throw new Error("Unable to clone obj! Its type isn't supported.");

}

export function getRootPath()
{
    let curWwwPath = window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    let pathName = window.document.location.pathname;
    let pos = curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    let localhostPaht = curWwwPath.substring(0, pos);
    //获取带"/"的项目名，如：/uimcardprj
    let projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
   return localhostPaht+projectName+"/";

}