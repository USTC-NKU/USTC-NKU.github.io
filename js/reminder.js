"use strict";
/** 提示弹窗 **/

// 问候语
var now, hour;
now = new Date(), hour = now.getHours()
if (hour < 6) {
    var hello = "凌晨了";
} else if (hour < 9) {
    var hello = "早上好";
} else if (hour < 12) {
    var hello = "上午好";
} else if (hour < 14) {
    var hello = "中午好";
} else if (hour < 17) {
    var hello = "下午好";
} else if (hour < 19) {
    var hello = "傍晚好";
} else if (hour < 22) {
    var hello = "晚上好";
} else {
    var hello = "夜深啦";
}

// 复制提醒

window.addEventListener("copy", function() {
    iziToast.info({
        timeout: 3000, // 关闭弹窗的时间
        closeOnEscape: 'true', // 允许使用Esc键关闭弹窗
        transitionIn: 'bounceInLeft', // 弹窗打开动画
        transitionOut: 'fadeOutRight', // 弹窗关闭动画
        displayMode: '1', // 替换已经打开的弹窗
        layout: '2', // Medium模式
        position: 'topRight', // 弹窗位置
        icon: 'fa fa-copy', // 图标类名
        backgroundColor: '#30343f', // 弹窗背景色
        title: '复制成功', // 通知标题
        message: '请遵守 CC BY-NC-SA 4.0 协议' // 通知消息内容
    });
})

//欢迎问候
window.addEventListener('load', function () {
    if(sessionStorage.getItem("isReload4")){
      return true
    }else{
    setTimeout(function () {
      iziToast.show({
        timeout: 2500,
        closeOnEscape: 'true',
        transitionIn: 'bounceInDown',
        transitionOut: 'fadeOutUp',
        displayMode: 'replace',
        layout: '2',
        position: 'topCenter',
        icon: 'iconfont icon-twitch-fill',
        backgroundColor: '#ffc93e',
        title: hello,
        message: '旅行者，欢迎您的到来'
      });
    }, 500);
    sessionStorage.setItem("isReload4",true)
  }
}, false)

//欢迎回来
var OriginTitle = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        document.title = 'USTC-茶靡花开';
        titleTime = setTimeout(function () {
            document.title = OriginTitle;
        }, 3000);
    }
    else {
      if(sessionStorage.getItem("isReload3")){
        return true
      }else{
      sessionStorage.setItem("isReload3", true)
      setTimeout(function () {
      iziToast.info({
        timeout: 3000,
        closeOnEscape: 'true',
        transitionIn: 'bounceInUp',
        transitionOut: 'fadeOutDown',
        displayMode: '0',
        layout: '2',
        position: 'bottomCenter',
        icon: 'fa fa-comment-alt-smile',
        backgroundColor: 'var(--heo-ahoverbg)',
        title: 'Welcome Back',
        message: '花径不曾缘客扫，蓬门今始为君开'
      });
      }, false);
    }
  }
});

//关注我们
// window.addEventListener('load', function () {
//   if(sessionStorage.getItem("isReload2")){
//     return true
//   }else{
//   sessionStorage.setItem("isReload2", true)
//   setTimeout(function () {
//     iziToast.show({
//       timeout: false,
//       closeOnEscape: 'true',
//       transitionIn: 'flipInX',
//       transitionOut: 'flipOutX',
//       displayMode: 'replace',
//       layout: '1',
//       position: 'center',
//       iconUrl: '/img/favicon.png',
//       backgroundColor: 'var(--heo-ahoverbg)',
//       message: '你已经在本站浏览一分钟了，喜欢就关注吧'
//     });
//   }, 60000);
// }
// }, false)

// //更新提示
// window.addEventListener('load', function () {
//     //用于判断是否第一次加载
//     if(sessionStorage.getItem("isReload1")){
//       //若显示已经加载过
//       return true
//     }else{
//       //若为第一次加载
//       sessionStorage.setItem("isReload1", true)
//     setTimeout(function () {
//       SAONotify('Update Tips','最新版本已上线，即将为您更新');
//     }, 10000);
//     }
// }, false)


// // 关闭通知栏
// function cancelNotify(){
//     var notifyWindow = document.getElementById('SAO-Notify');
//     notifyWindow.style.animation = 'flashClose 1.5s ease alternate ';
//     setTimeout(function() {
//         notifyWindow.remove();
//     }, 1e3);
// }
