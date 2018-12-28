function f1(){
    //存储promise对象的数组

let promiseArr = [];

//图片地址数组

let imageList = [];

//将图片地址的上传的promise对象加入到promiseArr

for (let i = 0; i < imageList.length; i++) {

  let promise = new Promise((resolve, reject) => {

    //微信图片上传

    wx.uploadFile({

      url: 'https://xxx.xxx.xxx/api/uploadImage',

      filePath: imageList[i],

      name: 'file',

      success: function(res) {

        //可以对res进行处理，然后resolve返回

        resolve(res);

      },

      fail: function (error) {

        reject(error);

      },

      complete: function (res) {

      },

    })

  });

  promiseArr.push(promise)

}

//Promise.all处理promiseArr数组中的每一个promise对象

Promise.all(promiseArr).then((result) => {

  //对返回的result数组进行处理

})

}


//处理微信小程序一次只能10次并发发起请求


function fn2(){
    //顺序处理函数

function sequenceTasks(tasks) {

    //记录返回值
  
    function recordValue(results, value) {
  
      results.push(value);
  
      return results;
  
    }
  
    let pushValue = recordValue.bind(null, []);
  
    let promise = Promise.resolve();
  
    // 处理tasks数组中的每个函数对象
  
    for (let i = 0; i < tasks.length; i++) {
  
      let task = tasks[i];
  
      promise = promise.then(task).then(pushValue);
  
    }
  
    return promise;
  
  }
  
   
  
  //函数数组，每个函数的返回值是一个promise对象
  
  let promiseFuncArr = [];
  
  //图片地址数组
  
  let imageList = [];
  
  //将图片地址的上传的函数加入到promiseFuncArr数组中
  
  for (let i = 0; i < imageList.length; i++) {
  
    let promiseTemp = function(){
  
      return new Promise((resolve, reject) => {
  
        //微信图片上传
  
        wx.uploadFile({
  
          url: 'https://xxx.xxx.xxx/api/uploadImage',
  
          filePath: imageList[i],
  
          name: 'file',
  
          success: function(res) {
  
            //可以对res进行处理，然后resolve返回
  
            resolve(res);
  
          },
  
          fail: function (error) {
  
            reject(error);
  
          },
  
          complete: function (res) {
  
          },
  
        })
  
      });
  
    };
  
    promiseFuncArr.push(promiseTemp)
  
  }
  
   
  
  sequenceTasks(promiseFuncArr).then((result) => {
  
    //对返回的result数组进行处理
  
  });
  
}

function fn3(){
    function sequenceTasks(tasks) {

        //记录返回值
      
        function recordValue(results, value) {
      
          results.push(value);
      
          return results;
      
        }
      
        let pushValue = recordValue.bind(null, []);
      
        return tasks.reduce(function (promise, task) {
      
          return promise.then(task).then(pushValue);
      
        }, Promise.resolve());
      
      }
}