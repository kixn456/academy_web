/**
 * Created by ljunb on 16/5/27.
 */
let Util = {
    /*
     * fetch简单封装
     * url: 请求的URL
     * successCallback: 请求成功回调
     * failCallback: 请求失败回调
     *
     * */
    get: (url,successCallback, failCallback,data) => {
      let newData=data;
      let newUrl=url;
      if(newData)
      {
        newData=Util.exchangeParmaster(data);
      }else{
        newData=null;
      }

      if(newUrl.indexOf("?")>=0)
      {
          if(newData)
          {
              newUrl+="&"+newData;
          }
      }else{

        if(newData)
        {
          newUrl+="?"+newData;
        }
      }
        fetch(newUrl)
            .then((response) => response.text())
            .then((responseText) => {
                successCallback(JSON.parse(responseText));
            })
            .catch((err) => {
                failCallback(err);
            });
    },
    gets: (url, successCallback, failCallback,data) => {
          var request = new XMLHttpRequest();
          let newData=data;
          let newUrl=url;
          if(newData)
          {
            newData=Util.exchangeParmaster(data);
          }else{
            newData=null;
          }

          if(newUrl.indexOf("?")>=0)
          {
              if(newData)
              {
                  newUrl+="&"+newData;
              }
          }else{

            if(newData)
            {
              newUrl+="?"+newData;
            }
          }
        request.onreadystatechange = (e) => {

            if (request.readyState !== 4) {
                return;
            }


            if (request.status === 200) {
                  try{
                     successCallback(JSON.parse(request.responseText))
                  }catch(e){
                    alert(request.responseText);
                  }
            }else {

              if(failCallback)
              {
                  failCallback(e);
              }
                //console.warn('error');
            }
        };

        request.open('GET',newUrl);
        request.send();
    },

    getForPromise:(url) => {
        return new Promise((resolve,reject) => {
            fetch(url)
            .then((response) => response.text())
            .then((responseText) => {
                resolve(JSON.parse(responseText));
            })
             .catch((err) => {
                reject(new Error(err));
                console.warn(err);
            }).done();
        });
    },

     exchangeParmaster :(data)=> {

      var newParmaster="";
      var findIndex=0;
      for(var key in data){
        if(findIndex==0)
        {
            newParmaster+=key+"="+data[key];
        }else{
            newParmaster+="&"+key+"="+data[key];
        }
        findIndex++;
      }
      return newParmaster
    },
   post:(url,params,callback,failCallback)=>{

     let newParmaster=Util.exchangeParmaster(params);

     console.log(newParmaster);
      //fetch请求
      fetch(url,{
          'method': 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          'body':newParmaster
      })
      .then((response) => response.text())
      .then((responseJSON) => {
          //successCallback(JSON.parse(responseText));
          callback(JSON.parse(responseJSON))
      })
       .catch((err) => {
          failCallback(new Error(err));

      }).done();
  }
}
export default Util;
