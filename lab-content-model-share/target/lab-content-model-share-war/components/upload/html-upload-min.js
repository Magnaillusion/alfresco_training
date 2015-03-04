(function(){var h=YAHOO.util.Dom,b=YAHOO.util.KeyListener;var e=Alfresco.util.encodeHTML;Alfresco.HtmlUpload=function(n){Alfresco.HtmlUpload.superclass.constructor.call(this,"Alfresco.HtmlUpload",n,["button","container"]);this.defaultShowConfig={siteId:null,containerId:null,destination:null,uploadDirectory:null,updateNodeRef:null,updateFilename:null,updateVersion:"1.0",mode:this.MODE_SINGLE_UPLOAD,onFileUploadComplete:null,overwrite:false,thumbnails:null,uploadURL:null,username:null,suppressRefreshEvent:false,adobeFlashEnabled:true,maximumFileSize:0};this.showConfig={};return this};YAHOO.extend(Alfresco.HtmlUpload,Alfresco.component.Base,{MODE_SINGLE_UPLOAD:1,MODE_SINGLE_UPDATE:2,defaultShowConfig:null,showConfig:null,versionSection:null,_fileName:null,_fileSize:null,_maximumFileSizeLimit:0,setMaximumFileSizeLimit:function c(n){this._maximumFileSizeLimit=n},getMaximumFileSizeLimit:function f(){return this._maximumFileSizeLimit},onReady:function m(){var r=this;h.removeClass(this.id+"-dialog","hidden");this.widgets.panel=Alfresco.util.createYUIPanel(this.id+"-dialog");this.widgets.titleText=h.get(this.id+"-title-span");this.widgets.singleUploadTip=h.get(this.id+"-singleUploadTip-span");this.widgets.singleUpdateTip=h.get(this.id+"-singleUpdateTip-span");this.widgets.filedata=h.get(this.id+"-filedata-file");this.widgets.filedata.contentEditable=false;this.widgets.siteId=h.get(this.id+"-siteId-hidden");this.widgets.containerId=h.get(this.id+"-containerId-hidden");this.widgets.destination=h.get(this.id+"-destination-hidden");this.widgets.username=h.get(this.id+"-username-hidden");this.widgets.updateNodeRef=h.get(this.id+"-updateNodeRef-hidden");this.widgets.uploadDirectory=h.get(this.id+"-uploadDirectory-hidden");this.widgets.overwrite=h.get(this.id+"-overwrite-hidden");this.widgets.thumbnails=h.get(this.id+"-thumbnails-hidden");this.widgets.description=h.get(this.id+"-description-textarea");this.widgets.minorVersion=h.get(this.id+"-minorVersion-radioButton");this.widgets.versionSection=h.get(this.id+"-versionSection-div");this.widgets.uploadButton=Alfresco.util.createYUIButton(this,"upload-button",null,{type:"submit"});this.widgets.cancelButton=Alfresco.util.createYUIButton(this,"cancel-button",this.onCancelButtonClick);var q=new Alfresco.forms.Form(this.id+"-htmlupload-form");this.widgets.form=q;YAHOO.util.Event.addListener(this.id+"-filedata-file","change",function(){if(this.files&&this.files.length>0){r._fileName=this.files[0].name;r._fileSize=this.files[0].size}});q.addValidation(this.id+"-filedata-file",Alfresco.forms.validation.mandatory,null,"change",this.msg("Alfresco.forms.validation.mandatory.message"));if(YAHOO.env.ua.ie==0){q.addValidation(this.id+"-filedata-file",function n(t,s){return !YAHOO.lang.isString(r._fileName)||Alfresco.forms.validation.nodeName({id:t.id,value:r._fileName},s)},null,"change",this.msg("message.illegalCharacters"));q.addValidation(this.id+"-filedata-file",function o(t,s){return s.maximumFileSizeLimit==0||!YAHOO.lang.isNumber(r._fileSize)||r._fileSize<=s.maximumFileSizeLimit},{maximumFileSizeLimit:this._maximumFileSizeLimit},"change",this.msg("message.maxFileFileSizeExceeded"));q.addValidation(this.id+"-filedata-file",function p(t,s){return !YAHOO.lang.isNumber(r._fileSize)||r._fileSize>0},null,"change",this.msg("message.zeroByteFileSelected"))}q.setSubmitElements(this.widgets.uploadButton);q.doBeforeFormSubmit={fn:function(){this.widgets.cancelButton.set("disabled",true);this.widgets.panel.hide();this.widgets.feedbackMessage=Alfresco.util.PopupManager.displayMessage({text:Alfresco.util.message("message.uploading",this.name),spanClass:"wait",displayTime:0,effect:null})},obj:null,scope:this};q.setAJAXSubmit(true,{});q.applyTabFix();q.init();this.widgets.escapeListener=new b(document,{keys:b.KEY.ESCAPE},{fn:this.onCancelButtonClick,scope:this,correctScope:true})},show:function l(n){this.showConfig=YAHOO.lang.merge(this.defaultShowConfig,n);if(this.showConfig.uploadDirectory===undefined&&this.showConfig.updateNodeRef===undefined){throw new Error("An updateNodeRef OR uploadDirectory must be provided")}if(this.showConfig.uploadDirectory!==null&&this.showConfig.uploadDirectory.length===0){this.showConfig.uploadDirectory="/"}this.widgets.escapeListener.enable();this._showPanel()},hide:function i(){this.onCancelButtonClick()},onUploadSuccess:function g(n){this.widgets.feedbackMessage.hide();var q=n.fileName?n.fileName:this.widgets.filedata.value;if(!this.showConfig.suppressRefreshEvent){YAHOO.Bubbling.fire("metadataRefresh",{currentPath:this.showConfig.path,highlightFile:q})}var o={successful:[{nodeRef:n.nodeRef,fileName:q,response:n}]};var p=this.showConfig.onFileUploadComplete;if(p&&typeof p.fn=="function"){p.fn.call((typeof p.scope=="object"?p.scope:this),o,p.obj)}},onUploadFailure:function k(o){this.widgets.feedbackMessage.hide();var n="message.failure."+o.status.code,p=Alfresco.util.message(n,this.name);if(p==n){p=o.status.code?o.status.code:Alfresco.util.message("message.failure",this.name)}Alfresco.util.PopupManager.displayPrompt({title:Alfresco.util.message("message.failure",this.name),text:p})},onCancelButtonClick:function d(){this.widgets.escapeListener.disable();this.widgets.panel.hide()},_applyConfig:function a(){var s;if(this.showConfig.mode===this.MODE_SINGLE_UPLOAD){s=Alfresco.util.message("header.singleUpload",this.name)}else{if(this.showConfig.mode===this.MODE_SINGLE_UPDATE){s=Alfresco.util.message("header.singleUpdate",this.name)}}this.widgets.titleText.innerHTML=s;if(this.showConfig.mode===this.MODE_SINGLE_UPDATE){var q=Alfresco.util.message("label.singleUpdateTip",this.name,{"0":this.showConfig.updateFilename});this.widgets.singleUpdateTip.innerHTML=q;h.removeClass(this.widgets.versionSection,"hidden");var o=(this.showConfig.updateVersion||"1.0").split("."),n=parseInt(o[0],10),r=parseInt(o[1],10);h.get(this.id+"-minorVersion").innerHTML=this.msg("label.minorVersion.more",n+"."+(1+r));h.get(this.id+"-majorVersion").innerHTML=this.msg("label.majorVersion.more",(1+n)+".0")}else{h.addClass(this.widgets.versionSection,"hidden")}if(this.showConfig.mode===this.MODE_SINGLE_UPDATE){h.removeClass(this.widgets.singleUpdateTip,"hidden");h.addClass(this.widgets.singleUploadTip,"hidden")}else{h.addClass(this.widgets.singleUploadTip,"hidden");if(this.showConfig.adobeFlashEnabled){h.removeClass(this.widgets.singleUploadTip,"hidden")}h.addClass(this.widgets.singleUpdateTip,"hidden")}this.widgets.cancelButton.set("disabled",false);this.widgets.filedata.value=null;var p=h.get(this.id+"-htmlupload-form");if(this.showConfig.uploadURL===null){p.action=Alfresco.constants.PROXY_URI+"api/upload.html"}else{p.action=Alfresco.constants.PROXY_URI+this.showConfig.uploadURL}this.widgets.siteId.value=this.showConfig.siteId;this.widgets.containerId.value=this.showConfig.containerId;this.widgets.destination.value=this.showConfig.destination;this.widgets.username.value=this.showConfig.username;if(this.showConfig.mode===this.MODE_SINGLE_UPDATE){this.widgets.updateNodeRef.value=this.showConfig.updateNodeRef;this.widgets.uploadDirectory.value="";this.widgets.overwrite.value="";this.widgets.thumbnails.value=""}else{this.widgets.updateNodeRef.value="";this.widgets.uploadDirectory.value=this.showConfig.uploadDirectory;this.widgets.overwrite.value=this.showConfig.overwrite;this.widgets.thumbnails.value=this.showConfig.thumbnails}},_showPanel:function j(){this.widgets.description.value="";this.widgets.minorVersion.checked=true;this._applyConfig();this.widgets.panel.show()}})})();