"use strict";const e=require("../../../common/vendor.js"),s=require("../../../config.js"),t=require("../../../lib/markdown-it.min.js"),o=require("../../../lib/highlight/highlight-uni.min.js");require("../../../lib/html-parser.js");const{adpid:n}=s.config;var i=getApp();let r=[];const a=t.mt({html:!0,highlight:function(e,s){let t="";try{t=o.$e.highlightAuto(e).value}catch(l){t=a.utils.escapeHtml(e)}let n=t.split(/\n/).slice(0,-1).map(((e,s)=>""==e?"":'<li><span class="line-num" data-line="'+(s+1)+'"></span>'+e+"</li>")).join("");n='<ol style="padding: 0px 30px;">'+n+"</ol>",r.push(e);let i='<div style="background:#0d1117;margin-top: 5px;color: #888;padding:5px 0;border-radius: 5px;">';return i+=`<pre class="hljs" style="padding:0 8px;margin-bottom:5px;overflow: auto;display: block;border-radius: 5px;"><code>${n}</code></pre>`,i+="</div>",i}}),l={name:"uni-ai-msg",data:()=>({app:i,left:"-100px",top:"-100px",adpid:n,showMoreMenu:!1}),mounted(){},created(){console.log("msg:",this.msg)},props:{showCursor:{type:[Boolean,Number],default:()=>!1},isLastMsg:{type:Boolean,default:()=>!1},msg:{type:Object,default:()=>({content:"",isDelete:!1})}},computed:{msgContent(){return this.msg.content},nodes(){if(!this.msgContent)return;let e="";if(this.msgContent.split("```").length%2){let s=this.msgContent;"\n"!=s[s.length-1]&&(s+="\n"),s+=' <span class="cursor">|</span>',e=a.render(s)}else e=a.render(this.msgContent)+' \n <span class="cursor">|</span>';return e}},methods:{trOnclick(s){console.log(s);let{attrs:t}=s.detail.node;console.log({attrs:t});let{"code-data-index":o,class:n}=t;"copy-btn"==n&&e.index.setClipboardData({data:r[o],showToast:!1,success(){e.index.showToast({title:"复制成功",icon:"none"})}})},changeAnswer(){this.$emit("changeAnswer")},copy(){e.index.setClipboardData({data:this.msgContent,showToast:!1,success(){e.index.showToast({title:"复制成功",icon:"none"})}}),this.showMoreMenu=!1},removeMsg(){this.$emit("removeMsg"),this.showMoreMenu=!1}}};if(!Array){(e.resolveComponent("uni-dateformat")+e.resolveComponent("uni-icons"))()}Math||((()=>"../../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js")+(()=>"../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js"))();const c=e._export_sfc(l,[["render",function(s,t,o,n,i,r){return e.e({a:!o.msg.isDelete},o.msg.isDelete?{}:e.e({b:e.p({date:o.msg.create_time,format:"MM/dd hh:mm:ss"}),c:o.msg.isAi?"../../../static/images/ai.png":i.app.globalData.userInfo.avatar,d:o.msg.isAi},o.msg.isAi?e.e({e:r.nodes&&r.nodes.length},r.nodes&&r.nodes.length?{f:r.nodes,g:e.o(((...e)=>r.trOnclick&&r.trOnclick(...e)))}:{},{h:o.showCursor?1:""}):{i:e.t(r.msgContent)},{j:o.isLastMsg&&o.msg.isAi},o.isLastMsg&&o.msg.isAi?{k:e.o(r.changeAnswer),l:e.p({title:"换一个答案",color:"#ccc",type:"reload",size:"16"})}:{},{m:e.p({size:"12px",type:"more-filled",color:"#ccc"}),n:e.o((e=>i.showMoreMenu=!i.showMoreMenu)),o:i.showMoreMenu},i.showMoreMenu?{p:e.o(((...e)=>r.copy&&r.copy(...e))),q:e.o(r.removeMsg),r:e.p({type:"trash",size:"20",color:"#ccc"}),s:e.o((e=>i.showMoreMenu=!1))}:{},{t:o.msg.isAi?1:"",v:o.msg.isAi?"":1}))}]]);wx.createComponent(c);
