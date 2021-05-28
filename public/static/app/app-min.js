/*
录音
https://github.com/xiangyuecn/Recorder
src: app-support/app.js,app-support/app-ios-weixin-support.js,app-support/app-native-support.js
*/
!function(){"use strict";var n=/MicroMessenger/i.test(navigator.userAgent),u=window.RecordAppBaseFolder||"/Recorder/dist/",e=window.OnRecordAppInstalled,l=[{Key:"Native",Support:function(e){e(!1)},Config:{}},{Key:"IOS-Weixin",Support:function(e){d.AlwaysUseWeixinJS||!Recorder.Support()?e(n):e(!1)},Config:{WxReady:function(e){e(null,"未实现IOS-Weixin.Config.WxReady")},DownWxMedia:function(e,n,t){t("下载素材接口DownWxMedia未实现")},AMREngine:[{url:u+"engine/beta-amr.js",check:function(){return!Recorder.prototype.amr}}]},ExtendDefault:!0},{Key:"Default",Support:function(e){e(!0)},Config:{paths:[{url:u+"recorder-core.js",check:function(){return!window.Recorder}},{url:u+"engine/mp3.js",check:function(){return!Recorder.prototype.mp3}}]}}],t=l[0],o=l[1],f=l[2];f.RequestPermission=function(e,n){var t=Recorder();t.open(function(){t.close(),e()},n)},f.Start=function(e,n,t){var o=d.__Rec;null!=o&&o.close(),d.__Rec=o=Recorder({type:e.type,sampleRate:e.sampleRate,bitRate:e.bitRate,onProcess:function(e,n,t,o){d.ReceivePCM(e[e.length-1],n,t,o)}}),o.appSet=e,o.open(function(){o.start(),n()},function(e){t(e)})},f.Stop=function(t,n){var o=d.__Rec;if(o){var r=function(){for(var e in o.close(),o.set)o.appSet[e]=o.set[e];d.__Rec=null};o.stop(function(e,n){r(),d.BlobRead(e,n,t)},function(e){r(),n(e)})}else n("未开始录音")};var d={LM:"2019-4-23 14:51:14",Current:0,IsWx:n,BaseFolder:u,AlwaysUseWeixinJS:!1,Platforms:{Native:t,Weixin:o,Default:f},Js:function(r,i,a,e){var s=(e=e||window).document,c=function(e){if(e>=r.length)i();else{var n=r[e],t=n.url;if(!1!==n.check()){var o=s.createElement("script");o.setAttribute("type","text/javascript"),o.setAttribute("src",t),o.onload=function(){c(e+1)},o.onerror=function(e){a("请求失败:"+(e.message||"-")+"，"+t)},s.body.appendChild(o)}else c(e+1)}};c(0)},BlobRead:function(e,n,t){var o=new FileReader;o.onloadend=function(){t({mime:e.type,duration:n,data:(/.+;\s*base64\s*,\s*(.+)$/i.exec(o.result)||[])[1]})},o.readAsDataURL(e)},ReceivePCM:function(e,n,t,o){d.OnProcess&&d.OnProcess([e],n,t,o)},Install:function(t,o){var r=d.__reqs||(d.__reqs=[]);r.push({s:t,f:o}),t=function(){i("s",arguments)},o=function(e,n){i("f",arguments)};var i=function(e,n){for(var t=0;t<r.length;t++)r[t][e].apply(null,n);r.length=0};if(!(1<r.length)){var a=0,s=function(n,e){if(n.IsInit)e();else{var t=n.Config.paths||[{url:u+"app-support/app-"+n.Key.toLowerCase()+"-support.js",check:function(){}}];d.Js(t,function(){n.IsInit=!0,e()},function(e){e="初始化js库失败："+e,console.log(e,n),o(e)})}},c=function(n){if(n)d.Current=n,t();else{var e=function(){n.Support(function(e){e?s(n,function(){c(n)}):(a++,c())})};(n=l[a]).ExtendDefault?s(f,e):e()}};c(d.Current)}},RequestPermission:function(n,t){d.Install(function(){var e=d.Current;console.log("开始请求"+e.Key+"录音权限"),e.RequestPermission(function(){console.log("录音权限请求成功"),n()},function(e,n){console.log("录音权限请求失败："+e+",isUserNotAllow:"+n),t(e,n)})},function(e){console.log("Install失败",e),t(e)})},Start:function(e,n,t){var o=d.Current;if(o){e||(e={});var r={type:"mp3",sampleRate:16e3,bitRate:16};for(var i in r)e[i]||(e[i]=r[i]);o.Start(e,function(){console.log("开始录音",e),n()},function(e){console.log("开始录音失败："+e),t(e)})}else t("需先调用RequestPermission")},Stop:function(i,n){var e=d.Current;e?e.Stop(function(e){for(var n=atob(e.data),t=n.length,o=new Uint8Array(t);t--;)o[t]=n.charCodeAt(t);var r=new Blob([o],{type:e.mime});console.log("结束录音"+r.size+"b "+e.duration+"ms",r),i(r,e.duration)},function(e){console.log("结束录音失败："+e),n(e)}):n("需先调用RequestPermission")}};window.RecordApp=d,e&&e()}(),function(){"use strict";var R=RecordApp,e=R.Platforms.Weixin,g=e.Config;e.IsInit=!0;var r={};e.RequestPermission=function(t,o){g.WxReady(function(e,n){r.wx=null,n?o("微信JsSDK准备失败："+n):(r.wx=e,t())})},e.Start=function(e,n,t){var o=r.wx;o?(o.startRecord({success:function(){r.startTime=Date.now(),r.start=e,n()},fail:function(e){t("无法录音："+e.errMsg)}}),r.timeout=[],r.err="",o.onVoiceRecordEnd({complete:function(e){var n=Date.now();r.timeout.push({res:e,duration:n-r.startTime,time:n}),console.log("微信录音超时，正在重启..."),o.startRecord({success:function(){r.startTime=Date.now(),console.log("已接续录音,中断"+(Date.now()-n)+"ms")},fail:function(e){var n="无法接续录音："+e.errMsg;console.error(n,e),r.err=n}})}})):t("请先调用RequestPermission")},e.Stop=function(l,n){var f=function(e){n("录音失败："+(e.errMsg||e))},d=r.start;if(d){r.start=null;var p={list:[]};d.DownWxMediaData=p;var u=function(){var r=p.list;if(r[0].duration)l(r[0]);else{var i=[],a=0,s=0,c=0,u=function(){if(c||(c=Date.now()),s>=r.length)return p.decodeTime=Date.now()-c,void function(){a||(a=Date.now());for(var e=[],n=0;n<i.length;n++)for(var t=i[n],o=0;o<t.length;o++)e.push(t[o]);var r=Recorder(d).mock(e,8e3);r.stop(function(e,n){for(var t in p.encodeTime=Date.now()-a,r.set)d[t]=r.set[t];R.BlobRead(e,n,l)},f)}();var e=r[s];e.duration=m[s].duration,e.isAmr=!0;for(var n=atob(e.data),t=n.length,o=new Uint8Array(t);t--;)o[t]=n.charCodeAt(t);Recorder.AMR.decode(o,function(e){i.push(e),s++,u()},function(e){f("AMR音频"+(s+1)+"无法解码:"+e)})};if(Recorder.AMR)u();else{console.log("加载AMR转换引擎");var e=Date.now();R.Js(g.AMREngine,function(){p.amrEngineLoadTime=Date.now()-e,u()},function(){f("加载AMR转换引擎失败")})}}},v=[],t=function(){for(var n=[],e=0;e<m.length;e++)n.push(m[e].res.localId);console.log("结束录音共"+n.length+"段，开始上传下载");var t=0,o=0,r=function(){p.downTime=Date.now()-o,u()},i=function(){if(o||(o=Date.now()),t>=v.length)r();else{var e=v[t];g.DownWxMedia({mediaId:e,transform_mediaIds:v.join(","),transform_type:d.type,transform_bitRate:d.bitRate,transform_sampleRate:d.sampleRate},function(e){p.list.push(e),e.duration?r():/amr/i.test(e.mime)?(t++,i()):f("微信服务器返回了未知音频类型："+e.mime)},function(e){f("下载音频失败："+e)})}},a=0,s=function(){if(a>=n.length)return p.uploadTime=Date.now()-c,void i();var e=n[a];console.log("微信录音片段"+a+" wx.playVoice({localId:'"+e+"'})"),wx.uploadVoice({localId:e,isShowProgressTips:0,fail:f,success:function(e){var n=e.serverId;console.log("serverId:"+n),v.push(n),a++,s()}})},c=Date.now();s()},m=r.timeout;return r.err?(console.error(r.err,m),void f("录制失败，已录制"+m.length+"分钟，但后面出错："+r.err)):m.length&&Date.now()-m[m.length-1].time<900?(r.wx.stopRecord(),void t()):void r.wx.stopRecord({fail:f,success:function(e){var n=Date.now();m.push({res:e,duration:n-r.startTime,time:n}),t()}})}f("未开始录音")}}(),function(){"use strict";var s=RecordApp,e=s.Platforms.Native;e.Config;e.IsInit=!0,window.top.NativeRecordReceivePCM=function(e,n,t){for(var o,r=e.length,i=0,a=0;a<r;a++)i+=Math.abs(e[a]);o=(i/=r)<1251?Math.round(i/1250*10):Math.round(Math.min(100,Math.max(0,100*(1+Math.log10(i/1e4))))),s.ReceivePCM(e,o,n,t)},e.RequestPermission=function(e,n){n("未实现RequestPermission调用App原生接口")},e.Start=function(e,n,t){t("未实现Start调用App原生接口")},e.Stop=function(e,n){n("未实现Stop调用App原生接口")}}();