(function(){var h=YAHOO.util.Dom,l=YAHOO.util.Event,b=YAHOO.util.Element;Alfresco.FormUI=function g(m,n){Alfresco.FormUI.superclass.constructor.call(this,"Alfresco.FormUI",m,["button","menu","container"]);this.parentId=n;this.buttons={};this.formsRuntime=null;this.eventGroup=m;YAHOO.Bubbling.on("metadataRefresh",this.onFormRefresh,this);YAHOO.Bubbling.on("mandatoryControlValueUpdated",this.onMandatoryControlValueUpdated,this);YAHOO.Bubbling.on("registerValidationHandler",this.onRegisterValidationHandler,this);YAHOO.Bubbling.on("addSubmitElement",this.onAddSubmitElement,this);return this};YAHOO.extend(Alfresco.FormUI,Alfresco.component.Base,{options:{mode:"edit",enctype:"multipart/form-data",fields:[],fieldConstraints:[],arguments:{}},buttons:null,formsRuntime:null,onReady:function a(){if(this.options.mode!=="view"){if(h.get(this.id+"-submit")!==null){this.buttons.submit=Alfresco.util.createYUIButton(this,"submit",null,{type:"submit"});h.get(this.id+"-submit-button").name="-"}if(h.get(this.id+"-reset")!==null){this.buttons.reset=Alfresco.util.createYUIButton(this,"reset",null,{type:"reset"});h.get(this.id+"-reset-button").name="-"}if(h.get(this.id+"-cancel")!==null){this.buttons.cancel=Alfresco.util.createYUIButton(this,"cancel",null);h.get(this.id+"-cancel-button").name="-"}YAHOO.Bubbling.fire("formContentReady",this);this.formsRuntime=new Alfresco.forms.Form(this.id);this.formsRuntime.setSubmitElements(this.buttons.submit);if(this.options.enctype==="application/json"){this.formsRuntime.setAJAXSubmit(true,{successCallback:{fn:this.onJsonPostSuccess,scope:this},failureCallback:{fn:this.onJsonPostFailure,scope:this}});this.formsRuntime.setSubmitAsJSON(true)}for(var r=0;r<this.options.fields.length;r++){var n=this.options.fields[r],m=h.get(this.parentId+"_"+n.id+"-help-icon");if(m){Alfresco.util.useAsButton(m,this.toggleHelpText,n.id,this)}}for(var t=0;t<this.options.fieldConstraints.length;t++){var q=this.options.fieldConstraints[t];var p=q.event.split(",");for(var s=0;s<p.length;s++){var o=p[s].replace(" ","");this.formsRuntime.addValidation(q.fieldId,q.handler,q.params,o,q.message)}}YAHOO.Bubbling.fire("beforeFormRuntimeInit",{eventGroup:this.eventGroup,component:this,runtime:this.formsRuntime});this.formsRuntime.init();YAHOO.Bubbling.fire("afterFormRuntimeInit",{eventGroup:this.eventGroup,component:this,runtime:this.formsRuntime})}},toggleHelpText:function f(n,m){Alfresco.util.toggleHelpText(this.parentId+"_"+m+"-help")},onJsonPostSuccess:function d(m){Alfresco.util.PopupManager.displayPrompt({text:m.serverResponse.responseText})},onJsonPostFailure:function j(m){var n=this.msg("form.jsonsubmit.failed");if(m.json&&m.json.message){n=n+": "+m.json.message}Alfresco.util.PopupManager.displayPrompt({text:n})},onFormRefresh:function k(n,m){if(this.options.arguments){var r=this.options.arguments.itemKind,q=this.options.arguments.itemId,p=this.options.arguments.formId;if(r&&q){var s=function(u,t){Alfresco.util.populateHTML([t.parentId,u.serverResponse.responseText])};var o={htmlid:this.parentId,formUI:false,mode:this.options.mode,itemKind:r,itemId:q,formId:p};Alfresco.util.Ajax.request({url:Alfresco.constants.URL_SERVICECONTEXT+"components/form",dataObj:o,successCallback:{fn:s,obj:this,scope:this},scope:this,execScripts:true})}}},onMandatoryControlValueUpdated:function c(n,m){if(this.formsRuntime){this.formsRuntime.validate()}},onRegisterValidationHandler:function e(o,n){if(this.formsRuntime){var m=n[1];if(m&&m.fieldId&&m.handler){this.formsRuntime.addValidation(m.fieldId,m.handler,m.args,m.when,m.message)}}},onAddSubmitElement:function i(n,m){var o=m[1];if(this.formsRuntime!=null){this.formsRuntime.addSubmitElement(o)}}})})();Alfresco.util.updateMultiSelectListValue=function(f,a,g){var d=YUIDom.get(f);if(d!==null){var b=new Array();for(var c=0,e=d.options.length;c<e;c++){if(d.options[c].selected){b.push(d.options[c].value)}}YUIDom.get(a).value=b.join(",");if(g){YAHOO.Bubbling.fire("mandatoryControlValueUpdated",this)}}};Alfresco.util.toggleHelpText=function(b){var a=YUIDom.get(b);if(a){if(a.style.display!="block"){a.style.display="block"}else{a.style.display="none"}}};