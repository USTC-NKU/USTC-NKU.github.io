Date.now||(Date.now=function(){return(new Date).getTime()}),function(){"use strict";for(var t=["webkit","moz"],e=0;e<t.length&&!window.requestAnimationFrame;++e){var i=t[e];window.requestAnimationFrame=window[i+"RequestAnimationFrame"],window.cancelAnimationFrame=window[i+"CancelAnimationFrame"]||window[i+"CancelRequestAnimationFrame"]}if(/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)||!window.requestAnimationFrame||!window.cancelAnimationFrame){var s=0;window.requestAnimationFrame=function(t){var e=Date.now(),i=Math.max(s+16,e);return setTimeout(function(){t(s=i)},i-e)},window.cancelAnimationFrame=clearTimeout}}(),function(t){t.snowfall=function(e,i){function s(s,n,a,r){this.x=s,this.y=n,this.size=a,this.speed=r,this.step=0,this.stepSize=h(1,10)/100,i.collection&&(this.target=m[h(0,m.length-1)]);var p=null;i.image?(p=document.createElement("img"),p.src=i.image):(p=document.createElement("div"),t(p).css({background:i.flakeColor})),t(p).attr({"class":"snowfall-flakes"}).css({width:this.size,height:this.size,position:i.flakePosition,top:this.y,left:this.x,fontSize:0,zIndex:i.flakeIndex}),t(e).get(0).tagName===t(document).get(0).tagName?(t("body").append(t(p)),e=t("body")):t(e).append(t(p)),this.element=p,this.update=function(){if(this.y+=this.speed,this.y>l-(this.size+6)&&this.reset(),this.element.style.top=this.y+"px",this.element.style.left=this.x+"px",this.step+=this.stepSize,y===!1?this.x+=Math.cos(this.step):this.x+=y+Math.cos(this.step),i.collection&&this.x>this.target.x&&this.x<this.target.width+this.target.x&&this.y>this.target.y&&this.y<this.target.height+this.target.y){var t=this.target.element.getContext("2d"),e=this.x-this.target.x,s=this.y-this.target.y,n=this.target.colData;if(void 0!==n[parseInt(e)][parseInt(s+this.speed+this.size)]||s+this.speed+this.size>this.target.height)if(s+this.speed+this.size>this.target.height){for(;s+this.speed+this.size>this.target.height&&this.speed>0;)this.speed*=.5;t.fillStyle=o.flakeColor,void 0==n[parseInt(e)][parseInt(s+this.speed+this.size)]?(n[parseInt(e)][parseInt(s+this.speed+this.size)]=1,t.fillRect(e,s+this.speed+this.size,this.size,this.size)):(n[parseInt(e)][parseInt(s+this.speed)]=1,t.fillRect(e,s+this.speed,this.size,this.size)),this.reset()}else this.speed=1,this.stepSize=0,parseInt(e)+1<this.target.width&&void 0==n[parseInt(e)+1][parseInt(s)+1]?this.x++:parseInt(e)-1>0&&void 0==n[parseInt(e)-1][parseInt(s)+1]?this.x--:(t.fillStyle=o.flakeColor,t.fillRect(e,s,this.size,this.size),n[parseInt(e)][parseInt(s)]=1,this.reset())}(this.x+this.size>d-c||this.x<c)&&this.reset()},this.reset=function(){this.y=0,this.x=h(c,d-c),this.stepSize=h(1,10)/100,this.size=h(100*i.minSize,100*i.maxSize)/100,this.element.style.width=this.size+"px",this.element.style.height=this.size+"px",this.speed=h(i.minSpeed,i.maxSpeed)}}function n(){for(r=0;r<a.length;r+=1)a[r].update();p=requestAnimationFrame(function(){n()})}var a=[],o={flakeCount:35,flakeColor:"#ffffff",flakePosition:"absolute",flakeIndex:999999,minSize:1,maxSize:2,minSpeed:1,maxSpeed:5,round:!1,shadow:!1,collection:!1,collectionHeight:40,deviceorientation:!1},i=t.extend(o,i),h=function(t,e){return Math.round(t+Math.random()*(e-t))};t(e).data("snowfall",this);var r=0,l=t(e).height(),d=t(e).width(),c=0,p=0;if(i.collection!==!1){var f=document.createElement("canvas");if(f.getContext&&f.getContext("2d"))for(var m=[],w=t(i.collection),g=i.collectionHeight,r=0;r<w.length;r++){var u=w[r].getBoundingClientRect(),x=t("<canvas/>",{"class":"snowfall-canvas"}),z=[];if(u.top-g>0){t("body").append(x),x.css({position:i.flakePosition,left:u.left+"px",top:u.top-g+"px"}).prop({width:u.width,height:g});for(var v=0;v<u.width;v++)z[v]=[];m.push({element:x.get(0),x:u.left,y:u.top-g,width:u.width,height:g,colData:z})}}else i.collection=!1}for(t(e).get(0).tagName===t(document).get(0).tagName&&(c=25),t(window).bind("resize",function(){l=t(e)[0].clientHeight,d=t(e)[0].offsetWidth}),r=0;r<i.flakeCount;r+=1)a.push(new s(h(c,d-c),h(0,l),h(100*i.minSize,100*i.maxSize)/100,h(i.minSpeed,i.maxSpeed)));i.round&&t(".snowfall-flakes").css({"-moz-border-radius":i.maxSize,"-webkit-border-radius":i.maxSize,"border-radius":i.maxSize}),i.shadow&&t(".snowfall-flakes").css({"-moz-box-shadow":"1px 1px 1px #555","-webkit-box-shadow":"1px 1px 1px #555","box-shadow":"1px 1px 1px #555"});var y=!1;i.deviceorientation&&t(window).bind("deviceorientation",function(t){y=.1*t.originalEvent.gamma}),n(),this.clear=function(){t(".snowfall-canvas").remove(),t(e).children(".snowfall-flakes").remove(),cancelAnimationFrame(p)}},t.fn.snowfall=function(e){return"object"==typeof e||void 0==e?this.each(function(i){new t.snowfall(this,e)}):"string"==typeof e?this.each(function(e){var i=t(this).data("snowfall");i&&i.clear()}):void 0}}(jQuery);

jQuery(document).ready(function($){
	$(document).snowfall({image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAApCAYAAACPzoEeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjczMzExNTNEM0JFODExRUE4ODU2Qzk5NTAyNEMyODUwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjczMzExNTNFM0JFODExRUE4ODU2Qzk5NTAyNEMyODUwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzMzMTE1M0IzQkU4MTFFQTg4NTZDOTk1MDI0QzI4NTAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzMzMTE1M0MzQkU4MTFFQTg4NTZDOTk1MDI0QzI4NTAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5NKA/bAAAHlElEQVR42tya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", flakeCount:20, minSpeed:1, minSize:8, maxSize:20,});
	$(document).snowfall({image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAiCAYAAADLTFBPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk5MDA0OTU3M0JFODExRUFCNjI0ODgyRDQ3QkM0NjY5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk5MDA0OTU4M0JFODExRUFCNjI0ODgyRDQ3QkM0NjY5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTkwMDQ5NTUzQkU4MTFFQUI2MjQ4ODJENDdCQzQ2NjkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTkwMDQ5NTYzQkU4MTFFQUI2MjQ4ODJENDdCQzQ2NjkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6H7QgDAAAGxklEQVR42syY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", flakeCount:20, minSpeed:1, minSize:8, maxSize:20,});
	$(document).snowfall({image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAcCAYAAACDBoQZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA2NTdERjRBM0JFODExRUE4ODExRkZFQ0YwRDAzNEZFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA2NTdERjRCM0JFODExRUE4ODExRkZFQ0YwRDAzNEZFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDY1N0RGNDgzQkU4MTFFQTg4MTFGRkVDRjBEMDM0RkUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDY1N0RGNDkzQkU4MTFFQTg4MTFGRkVDRjBEMDM0RkUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6srpAJAAADoUlEQVR42oxWbUhTURh+zu1Ot+XUqTlXadNp0XehtZIgKrIPoyAoiCCowIoS+l1EZP+CfgRBEPQngkDIIKIi+iAwKEH6zpA00Upnc7NNt9qu93TOuR/bTa29cDjc8/Gc533e9z3nki0ndyBbe5C7fBfeDtZimbczvrk64Wgf+BlrOvxu74UjcT4vZw004vagbqANs9nH/F4439oJVibheHbvKBu5ytdI2YLReYtPIDiHwFdBkPQTMdiTCzikgLEmK7D7hasDZGT0NEqcMEGmsKzASCjZMt2c7ePo4qzBhOg/vjeguAjw/05PhBm7ENNdpeVCz/+BiUUveq+grJpCjaRd5EAxBYhQ4FvIS/01vv8z+55qgWeOFy4WdK6Xu4pY5kcUwhuJ0RX/BHvQOXEIM+xN8BZRc/Crkl6QjGr9aAh43dU4Ldj9DxMBqHnXUFiiMwhr/VCQChcN40DcFFLHJZGm0okE4zeQWwXBijNIxYgpOtcqplg3xaJCNwtYq7tWxqdwG+xV1VhaQIVWXBebi05yz2SnnUOevCy2gOU/6jiARLQevmL9RJ2Bm6Td5eA/ZG1A8WSUiFomWdJgXLoGZzVM0TkLEoaZ+Ya7RiSnrYCQ7bjoaz2ae8aGiKrPswSNOqy7SyYyykQakkytQsFNkEuBnHxrtNz6ecNRKxO+NjQj7eXGwIhYmd/TX4kcZz0KqVUrbi6HxiqWSI/NUiiUYQsw6f0S1o7tG65BKg9mXnEbDBOMj6dZcXeLZSqaYWMMkIOW215F/RVfNDCba9ekzDVcmBnRWP19UKaVezv2RjoVSehVmL9KDBqn8tDLQQY0Uy+jmKUWLYcxF+M7fG0imkKvgdRKMcHF50CGHlz8IfvUjA1bU9GtLGpoF2CpbfUbYBsD8kq1vJr1Wosi1ys+pDUjskYt8p7rxfak1s69aDwoknmHLyAUOf0EVbKKRlVFkS7+N+YVD45eNpbcWmLvTqzffsNMWnHtLizVS2YJxTuXBFJP4CwDuvrZg8Gyn6eMaBlBYN/xnb5mg5XGjF27KJtH0cfQeJT6GaP2zwSBSgq7O13MmUBcgnVLW3ffvfXQkseIjLek6mZTWR58w9KXpzDEzTnm3Iim/XvQ1adFkWd8QZjdZ8MEtYu6E80Hj+HcU+vD868X/c75m37yuPWU7X1kK36pXlEZntyOZHPT/p1n9vVMesWy+T24ffZ6kf3S5ZrEuvIC5XnfE56gU637I8AAI0d0ahnOqAQAAAAASUVORK5CYII=", flakeCount:30, minSpeed:1, minSize:8, maxSize:20,});
	$(document).snowfall({image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFBNzUwREIyNjlDODExRUJBN0JDQTY4MDBBMTAxNzBBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFBNzUwREIzNjlDODExRUJBN0JDQTY4MDBBMTAxNzBBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MUE3NTBEQjA2OUM4MTFFQkE3QkNBNjgwMEExMDE3MEEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MUE3NTBEQjE2OUM4MTFFQkE3QkNBNjgwMEExMDE3MEEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5Ongo6AAAENElEQVR42ryXe2iVZRyAz9lOEy9bZtZiMmfphGETy2tLYlFpKUUFRZdVpBBEkViRQqHRjVLKMijyjxWUkKHdoBAtzWllNSdzy7LLzJlDp6XVtixbp+eNR3o5bnV2iL3wnO/7zvdefu/v+n7JdDqdyKENgWoYAa/CT32eISycA8vS/7T7c5kjL4fdFsEb0AHHoABu6eskuSx8FrwL3ZCERaq+X1T9YKTqx3OZI5mlcw12h0ej/zbCSBidi3fmZanaI9AEpdH/6+Ft75PR/1dCebaqngYzYKr3sVrOhj2qdTUUwCbYC22wGSZBHlxtvy77Zar4Vhj2t5b5GQ8d8Cm0Ql0PA950wlqfz4GX4TU4FwbC8MjuTZAfjV8Li6EF6mFcik1P14aTVcJwVZeOksVdhk+xqt8OjTAIGuyX8noIHtYnQjsJZsqvcCacF6SZL02RxE9Hkp7v/SjfLYeZ0Ay7oAaqoBGecfdl8JzjlkTzHjLhXBekXKZkt8PH7maE10740Pdht5vgIHwH+WrlMxgvi93VHrjQeA9aWQtj4Az4Al5PReEyAbp8PgV+hHpYCLtVXbWL/akAISoq4QUog1ma7gL7XWafdGTGYf+WQB6FpTAUVqmmV2ACfKRX3wn3wg74HiphjX2fh2KfH+hpjWyyzBRYD+16/2y9/BEXfV87h7YVGmCsY/MNs//MXMEe8+E9+ARGaYbPVV94ngjjNM2pUGtZbINm7bkAnoh85ysTUPvxheKFQzhtsdqEtgqmQQvsdOENhsdNUHg8B8GLUKXt66AGtsLF0aYaFfaElNkdOVdov8Ef0qFAwZMPww/2Cf0PwM0u2KDnBw1tg7ei+epi1aai+zDodJhqGG3X/cc6aA1MUvX7oMSi8ZgCXKR21mmyWuedYog1ZVMWi0Ja877QRLFBB3oI1sFK+db+75hUQrvDseWm5BPWSPVSO6abDGpMl+VWqArYrP3qjfUinSupU90HV8BAuFR17+itOlUo2eBIqv3QCQuhxDSZMKzmGTYfGL8h8c+C2ywWg2Cbu6923krfl8ZxHBY9AoeNzWYr0V4nSqj6/SaWyfCN/QZEcVwVmSqUy3sU6mffH3UTZXnm1OvhaxhqCvwS5sBTMFvlFJqvuwytpIQwajWnX2M1Kzaen4QbotBr86A4N2ERz2wjM5zhcthn9YmPuPOi59GOPQBDMsbv9N0xr1flKcUK43iuErVGblDhEafE5JEwg5VaW8ui6pUwJBdluNJqE9IKnXN3LNW1vYTWDKUMdroEJloo2j2xbNTOp1mD09o1nqNASuybVZEIsbgFFkSThMT/kgeIARnHnOD9J/9fx9ueWosHhxtzGp3jgX5p5Ihzcpkjl0XvdsFu+AV+hzH98dEWPtSWGMOdHocO9sdH27PR10OxNbfP38epHB1rufG/y/LZ5/aXAAMADkVoDZf4rmYAAAAASUVORK5CYII=", flakeCount:50, minSpeed:1, minSize:8, maxSize:20,});
});

/* 
	参数说明：
	image      PNG图片地址
	flakeCount 数量
	minSpeed   速度
	minSize    最小尺寸
	maxSize    最大尺寸
 */