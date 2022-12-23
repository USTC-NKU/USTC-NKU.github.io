function SAONotify(title,message,action){
    //样式文件
    var tempstyle = `#SAO-Notify{z-index:9999;background:url("https://ts1.cn.mm.bing.net/th/id/R-C.4543a31b940dc7a7b5614517c0465088?rik=jfaixkfBTPJzvA&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f05%2fPictures-christmas-wallpapers-hd.jpg&ehk=mYZCVsNvfL5wNU924wUVj%2b4JGZtC7ZRIDrcWt0roxkc%3d&risl=&pid=ImgRaw&r=0");background-size:cover;font-family:'SAOUI',Langar,-apple-system,sans-serif;font-weight:bolder;text-shadow:0.5px 0.5px 0.5px#888;height:240px;width:350px;position:fixed;bottom:0;right:0;left:0;top:0;margin:auto auto;border-radius:5px;box-shadow:2px 2px 10px#888;display:block;animation:flashOpen 1s ease alternate}.notify-title{background:rgba(249,249,249,0.8);color:rgba(60,60,61,0.7);height:60px;width:100%;display:block;font-size:20px;text-align:center;border-top-left-radius:5px;border-top-right-radius:5px;padding-top:10px}.notify-alert::-webkit-scrollbar{display:none}.notify-alert{background: rgba(244,255,253,0.7);color:rgba(60,60,61,0.7);height:120px;overflow:scroll;width:100%;display:flex;justify-content:space-around;align-items:center;box-shadow:0px 0px 15px#bcbcbc inset;animation: led 3s ease-in infinite}.notify-button{background:rgba(249,249,249,0.8);height:60px;width:100%;display:block;text-align:center;border-bottom-left-radius:5px;border-bottom-right-radius:5px;padding-top:12.5px}.notify-confirm{background:rgba(47,121,212,0);border-radius:50%;display:inline-block;width:36px;height:36px;margin-inline:60px;border:1px solid;border-color:#2f79d4}.notify-confirm button{background:#2f79d4;text-align:center;border-radius:50%;font-size:18px;color:#fff;display:block;width:30px;height:30px;margin:2px}.notify-cancel{background:rgba(203,55,73,0);border-radius:50%;display:inline-block;width:36px;height:36px;margin-inline:60px;border:1px solid;border-color:#cb3749}.notify-cancel button{background:#cb3749;text-align:center;border-radius:50%;font-size:18px;font-weight:bolder;color:#fff;display:block;width:30px;height:30px;margin:2px}.notify-receive{background:rgba(47,121,212,0);border-radius:50%;display:inline-block;width:36px;height:36px;margin-inline:60px;border:1px solid;border-color:#eda60c}.notify-receive button{background:#eda60c;text-align:center;border-radius:50%;font-size:18px;color:#fff;display:block;width:30px;height:30px;margin:2px}@-moz-keyframes flashOpen{from{transform:rotateX(90deg)}to{transform:rotateX(0deg)}}@-webkit-keyframes flashOpen{from{transform:rotateX(90deg)}to{transform:rotateX(0deg)}}@-o-keyframes flashOpen{from{transform:rotateX(90deg)}to{transform:rotateX(0deg)}}@keyframes flashOpen{from{transform:rotateX(90deg)}to{transform:rotateX(0deg)}}@-moz-keyframes flashClose{from{transform:rotateX(0deg)}to{transform:rotateX(90deg)}}@-webkit-keyframes flashClose{from{transform:rotateX(0deg)}to{transform:rotateX(90deg)}}@-o-keyframes flashClose{from{transform:rotateX(0deg)}to{transform:rotateX(90deg)}}@keyframes flashClose{from{transform:rotateX(0deg)}to{transform:rotateX(90deg)}}@keyframes led {0% {-webkit-box-shadow: 0 0 4px #ca00ff;box-shadow: 0 0 4px #ca00ff;}25% {-webkit-box-shadow: 0 0 16px #00b5e5;box-shadow: 0 0 16px #00b5e5;}50% {-webkit-box-shadow: 0 0 4px #00f;box-shadow: 0 0 4px #00f;}75% {-webkit-box-shadow: 0 0 16px #b1da21;box-shadow: 0 0 16px #b1da21;}to {-webkit-box-shadow: 0 0 4px red;box-shadow: 0 0 4px red;}}`;
    //若定义了action执行代码片段，则输出有双选项的弹窗
    if (action){
      var template =`<div id="SAO-Notify"><style>` + tempstyle +`</style><div class="notify-title">` + `${title}` + `</div><div class="notify-alert"> `+ `${message}` + `</div><div class="notify-button"><span class="notify-confirm"><button class="fa fa-check-circle-o" type="button" name="confirm" onclick="clickAudio();setTimeout(` + `${action}` + `,500);cancelNotify()"></button></span><span class="notify-cancel"><button class="fa fa-times" type="button" name="cancel" onclick="panelAudio();cancelNotify()"></button></span></div><audio id="SAO-Notify-Panel" src="https://npm.elemecdn.com/akilar-candyassets/audio/Panel.mp3"></audio><audio id="SAO-Notify-Click" src="https://npm.elemecdn.com/akilar-candyassets/audio/Click.mp3"></audio>
      </div>`
    } else { //若未定义action代码片段，则仅输出单选项的弹窗
      var template =`<div id="SAO-Notify"><style>` + tempstyle +`</style><div class="notify-title">` + `${title}` + `</div><div class="notify-alert"> `+ `${message}` + `</div><div class="notify-button"><span class="notify-receive"><button class="fa fa-check-circle-o" type="button" name="receive" onclick="panelAudio();cancelNotify()"></button></span></div><audio id="SAO-Notify-Panel" src="https://fastly.jsdelivr.net/gh/USTC-NKU/CDN/welcome.wav" muted></audio><audio id="SAO-Notify-Click" src="https://npm.elemecdn.com/akilar-candyassets/audio/Click.mp3"></audio>
      </div>`
    };
  
    document.body.insertAdjacentHTML('beforeend',template);
}
  
  
//按钮确认选项音效
function clickAudio() {
    var clickAudio = document.getElementById("SAO-Notify-Click");
    if (clickAudio) {
        clickAudio.play();//有音频时播放
    }
}
//按钮取消选项音效
function panelAudio() {
    var panelAudio = document.getElementById("SAO-Notify-Panel");
    if (panelAudio) {
        panelAudio.play();//有音频时播放
    }
}
// 关闭通知栏
function cancelNotify(){
    var notifyWindow = document.getElementById('SAO-Notify');
    notifyWindow.style.animation = 'flashClose 1.5s ease alternate ';
    setTimeout(function() {
        notifyWindow.remove();
    }, 1e3);
}