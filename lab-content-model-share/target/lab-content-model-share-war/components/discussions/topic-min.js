(function(){var c=YAHOO.util.Dom,A=YAHOO.util.Event,t=YAHOO.util.Element;var u=Alfresco.util.encodeHTML;Alfresco.DiscussionsTopic=function(B){this.name="Alfresco.DiscussionsTopic";this.id=B;this.widgets={};this.modules={};this.tagId={id:0,tags:{}};Alfresco.util.ComponentManager.register(this);Alfresco.util.YUILoaderHelper.require(["datasource","json","connection","event","button","menu","editor"],this.onComponentsLoaded,this);YAHOO.Bubbling.on("tagSelected",this.onTagSelected,this);return this};Alfresco.DiscussionsTopic.prototype={options:{siteId:"",containerId:"discussions",topicId:""},topicData:null,widgets:null,modules:null,tagId:null,busy:false,setOptions:function g(B){this.options=YAHOO.lang.merge(this.options,B);return this},setMessages:function n(B){Alfresco.util.addMessages(B,this.name);return this},onComponentsLoaded:function o(){A.onContentReady(this.id,this.onReady,this,true)},onReady:function f(){var B=this;var C=function D(G,F){var E=YAHOO.Bubbling.getOwnerByTagName(F[1].anchor,"div");if(E!==null){var H="";H=E.className;if(typeof B[H]=="function"){B[H].call(B,B.topicData.name);F[1].stop=true}}return true};YAHOO.Bubbling.addDefaultAction("topic-action-link-div",C);Alfresco.util.tags.registerTagActionHandler(this);Alfresco.util.rollover.registerHandlerFunctions(this.id,this.onTopicElementMouseEntered,this.onTopicElementMouseExited,this);this._loadTopicData()},_loadTopicData:function k(){var C=function D(E){var G=E.json;if(G){this.topicData=G.item;this.renderUI();this._fireTopicDataChangedEvent()}else{var F=YAHOO.lang.substitute(Alfresco.constants.URL_PAGECONTEXT+"site/{site}/discussions-topiclist",{site:this.options.siteId});window.location=F}};var B=YAHOO.lang.substitute(Alfresco.constants.URL_SERVICECONTEXT+"components/forum/post/site/{site}/{container}/{topicId}",{site:this.options.siteId,container:this.options.containerId,topicId:this.options.topicId});Alfresco.util.Ajax.request({url:B,successCallback:{fn:C,scope:this},failureMessage:this._msg("message.loadtopicdata.failure")})},renderUI:function e(){var B=c.get(this.id+"-topic-view-div");var C=this.renderTopic(this.topicData);B.innerHTML=C;Alfresco.util.rollover.registerListenersByClassName(this.id,"topic","div")},renderTopic:function z(D){var C="";C+='<div id="'+this.id+'-topicview" class="node topic topicview">';C+='<div class="nodeEdit">';if(D.permissions.reply){C+='<div class="onAddReply"><a href="#" class="topic-action-link-div">'+this._msg("action.reply")+"</a></div>"}if(D.permissions.edit){C+='<div class="onEditTopic"><a href="#" class="topic-action-link-div">'+this._msg("action.edit")+"</a></div>"}if(D.permissions["delete"]){C+='<div class="onDeleteTopic"><a href="#" class="topic-action-link-div">'+this._msg("action.delete")+"</a></div>"}C+="</div>";C+='<div class="authorPicture">'+Alfresco.util.people.generateUserAvatarImg(D.author)+"</div>";C+='<div class="nodeContent">';C+='<div class="nodeTitle"><a href="'+Alfresco.util.discussions.getTopicViewPage(this.options.siteId,this.options.containerId,D.name)+'">'+u(D.title)+"</a> ";if(D.isUpdated){C+='<span class="theme-color-2 nodeStatus">('+this._msg("post.updated")+")</span>"}C+="</div>";C+='<div class="published">';C+='<span class="nodeAttrLabel">'+this._msg("post.createdOn")+": </span>";C+='<span class="nodeAttrValue">'+Alfresco.util.formatDate(D.createdOn)+"</span>";C+='<span class="separator">&nbsp;</span>';C+='<span class="nodeAttrLabel">'+this._msg("post.author")+": </span>";C+='<span class="nodeAttrValue">'+Alfresco.util.people.generateUserLink(D.author)+"</span>";C+="<br />";if(D.lastReplyBy){C+='<span class="nodeAttrLabel">'+this._msg("post.lastReplyBy")+": </span>";C+='<span class="nodeAttrValue">'+Alfresco.util.people.generateUserLink(D.lastReplyBy)+"</span>";C+='<span class="separator">&nbsp;</span>';C+='<span class="nodeAttrLabel">'+this._msg("post.lastReplyOn")+": </span>";C+='<span class="nodeAttrValue">'+Alfresco.util.formatDate(D.lastReplyOn)+"</span>"}else{C+='<span class="nodeAttrLabel">'+this._msg("replies.label")+": </span>";C+='<span class="nodeAttrValue">'+this._msg("replies.noReplies")+"</span>"}C+="</div>";C+='<div class="userLink">'+Alfresco.util.people.generateUserLink(D.author)+" "+this._msg("said")+":</div>";C+='<div class="content yuieditor">'+D.content+"</div>";C+="</div>";C+='<div class="nodeFooter">';C+='<span class="nodeAttrLabel replyTo">'+this._msg("replies.label")+": </span>";C+='<span class="nodeAttrValue">('+D.totalReplyCount+")</span>";C+='<span class="separator">&nbsp;</span>';C+='<span class="nodeAttrLabel tagLabel">'+this._msg("tags.label")+": </span>";if(D.tags.length>0){for(var B=0;B<D.tags.length;B++){if(B>0){C+=", "}C+=Alfresco.util.tags.generateTagLink(this,D.tags[B])}}else{C+='<span class="nodeAttrValue">'+this._msg("tags.noTags")+"</span>"}C+="</div></div></div>";return C},onAddReply:function v(C,B,D){YAHOO.Bubbling.fire("addReplyToPost",{postRef:this.topicData.nodeRef})},onEditTopic:function i(){window.location.href=Alfresco.constants.URL_PAGECONTEXT+"site/"+this.options.siteId+"/discussions-createtopic?topicId="+this.options.topicId},onDeleteTopic:function w(){var C=this;Alfresco.util.PopupManager.displayPrompt({title:this._msg("message.confirm.delete.title"),text:this._msg("message.confirm.delete",u(this.topicData.title)),buttons:[{text:this._msg("button.delete"),handler:function D(){this.destroy();C._deleteTopicConfirm.call(C)}},{text:this._msg("button.cancel"),handler:function B(){this.destroy()},isDefault:true}]})},_deleteTopicConfirm:function m(){if(!this._setBusy(this._msg("message.wait"))){return}var B=function B(D){var E=YAHOO.lang.substitute(Alfresco.constants.URL_PAGECONTEXT+"site/{site}/discussions-topiclist",{site:this.options.siteId});window.location=E};var C=YAHOO.lang.substitute(Alfresco.constants.PROXY_URI+"api/forum/post/site/{site}/{container}/{topicId}?page=discussions-topicview",{site:this.options.siteId,container:this.options.containerId,topicId:encodeURIComponent(this.options.topicId)});Alfresco.util.Ajax.request({url:C,method:"DELETE",responseContentType:"application/json",successMessage:this._msg("message.delete.success"),successCallback:{fn:B,scope:this},failureMessage:this._msg("message.delete.failure"),failureCallback:{fn:function(D){this._releaseBusy()},scope:this}})},onTagSelected:function q(D,C){var E=C[1];if(E&&(E.tagName!==null)){var B=YAHOO.lang.substitute(Alfresco.constants.URL_PAGECONTEXT+"site/{site}/discussions-topiclist?filterId={filterId}&filterOwner={filterOwner}&filterData={filterData}",{site:this.options.siteId,filterId:"tag",filterOwner:"Alfresco.TagFilter",filterData:encodeURIComponent(E.tagName)});window.location=B}},_loadEditForm:function a(){Alfresco.util.Ajax.request({url:Alfresco.constants.URL_SERVICECONTEXT+"modules/discussions/topic/edit-topic",dataObj:{htmlid:this.id+"-form"},successCallback:{fn:this.onEditFormLoaded,scope:this},failureMessage:this._msg("message.loadeditform.failure")})},onEditFormLoaded:function p(B){var F=this.id+"-form";var E=this.topicData;var C=c.get(this.id+"-topic-edit-div");C.innerHTML=B.serverResponse.responseText;var D=YAHOO.lang.substitute(Alfresco.constants.PROXY_URI+"api/forum/post/site/{site}/{container}/{topicId}",{site:this.options.siteId,container:this.options.containerId,topicId:this.options.topicId});c.get(F+"-form").setAttribute("action",D);c.get(F+"-site").setAttribute("value",this.options.siteId);c.get(F+"-container").setAttribute("value",this.options.containerId);c.get(F+"-title").setAttribute("value",E.title);c.get(F+"-content").value=E.content;this._registerEditTopicForm(E,F)},_registerEditTopicForm:function l(C,D){if(this.modules.tagLibrary==undefined){this.modules.tagLibrary=new Alfresco.module.TagLibrary(D);this.modules.tagLibrary.setOptions({siteId:this.options.siteId})}this.modules.tagLibrary.setTags(this.topicData.tags);this.widgets.okButton=new YAHOO.widget.Button(D+"-submit",{type:"submit"});this.widgets.cancelButton=new YAHOO.widget.Button(D+"-cancel",{type:"button"});this.widgets.cancelButton.subscribe("click",this.onEditFormCancelButtonClick,this,true);this.widgets.editor=new YAHOO.widget.SimpleEditor(D+"-content",{height:"180px",width:"700px",dompath:false,animate:false,toolbar:Alfresco.util.editor.getTextOnlyToolbarConfig(this._msg)});this.widgets.editor.addPageUnloadBehaviour(this._msg("message.unsavedChanges.reply"));this.widgets.editor.render();var B=new Alfresco.forms.Form(D+"-form");B.setSubmitElements(this.widgets.okButton);B.setAjaxSubmitMethod(Alfresco.util.Ajax.PUT);B.setAJAXSubmit(true,{successMessage:this._msg("message.savetopic.success"),successCallback:{fn:this.onEditFormSubmitSuccess,scope:this},failureMessage:this._msg("message.savetopic.failure"),failureCallback:{fn:this.onEditFormSubmitFailure,scope:this}});B.setSubmitAsJSON(true);B.doBeforeFormSubmit={fn:function(E,F){this.widgets.cancelButton.set("disabled",true);this.widgets.editor.saveHTML();this.modules.tagLibrary.updateForm(D+"-form","tags");this.widgets.feedbackMessage=Alfresco.util.PopupManager.displayMessage({text:Alfresco.util.message(this._msg("message.submitting")),spanClass:"wait",displayTime:0})},scope:this};this.modules.tagLibrary.initialize(B);B.init();this._showEditView()},onEditFormSubmitSuccess:function y(B,C){this._releaseBusy();this.topicData=B.json.item;this.renderUI();this._hideEditView();this._fireTopicDataChangedEvent()},onEditFormSubmitFailure:function d(B,C){this._releaseBusy();this.widgets.cancelButton.set("disabled",false)},onEditFormCancelButtonClick:function(C,B){this._hideEditView()},_hideEditView:function(){var C=c.get(this.id+"-topic-edit-div");var B=c.get(this.id+"-topic-view-div");c.addClass(C,"hidden");c.removeClass(B,"hidden");C.innerHTML=""},_showEditView:function(){var C=c.get(this.id+"-topic-edit-div");var B=c.get(this.id+"-topic-view-div");c.addClass(B,"hidden");c.removeClass(C,"hidden")},onTopicElementMouseEntered:function h(C,B){var D=this.topicData.permissions;if(!(D.edit||D["delete"])){return}c.addClass(B[1].target,"over")},onTopicElementMouseExited:function b(C,B){c.removeClass(B[1].target,"over")},_fireTopicDataChangedEvent:function x(){var B={topicRef:this.topicData.nodeRef,topicTitle:this.topicData.title,topicId:this.topicData.name};YAHOO.Bubbling.fire("topicDataChanged",B)},_setBusy:function s(B){if(this.busy){return false}this.busy=true;this.widgets.busyMessage=Alfresco.util.PopupManager.displayMessage({text:B,spanClass:"wait",displayTime:0});return true},_releaseBusy:function j(){if(this.busy){this.widgets.busyMessage.destroy();this.busy=false;return true}else{return false}},_msg:function r(B){return Alfresco.util.message.call(this,B,"Alfresco.DiscussionsTopic",Array.prototype.slice.call(arguments).slice(1))}}})();