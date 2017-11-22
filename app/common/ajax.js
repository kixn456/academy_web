/**
 * @ajax quest by server;
 */

export function getRootPath()
{
	//获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    let curWwwPath = window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    let pathName = window.document.location.pathname;
    let pos = curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    let localhostPaht = curWwwPath.substring(0, pos);
    //获取带"/"的项目名，如：/uimcardprj
    let projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    //return (localhostPaht + projectName);
	//return "http://127.0.0.1:9088"
	return "http://www.chunzeacademy.com:8080/";//发布 8081用户中心（注册登录）

	//imgserver
	//images.chunzeacademy.com
	//upload
	//files.chunzeacademy.com
}
export function ajaxPost(serverUrl,postData,funSuccess,funError,async=true)
{

	$.ajax({
	    url:serverUrl,
	    type:'POST', //GET
	    async:async,    //或false,是否异步
	    data:JSON.stringify(postData),
	    contentType:'application/json;charset=UTF-8',
	    timeout:100000,    //超时时间
	    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
	    beforeSend:function(xhr){
	        var transid = sessionStorage.getItem("transid");
			if(transid)
			{
				xhr.setRequestHeader('userTransid', transid);
			}
	    },

	    success:function(data,textStatus,jqXHR){
	    	funSuccess(data,textStatus);
	    },
	    error:function(xhr,textStatus){

	    	funError(xhr,textStatus);
	    }
	});
}

export function ajaxGet(serverUrl,postData,funSuccess,funError,async=true)
{
	$.ajax({
	    url:serverUrl,
	    type:'GET', //GET
	    async:async,    //或false,是否异步
	    data:postData,
	    timeout:10000,    //超时时间
	    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
	    success:function(data,textStatus,jqXHR){
	    	funSuccess(data,textStatus);
	    },

	    error:function(xhr,textStatus){
	    	funError(xhr,textStatus);
	    }
	});
}