(function(){var b=YAHOO.util.Dom,u=YAHOO.util.Event;var n=Alfresco.util.encodeHTML,f=Alfresco.util.userProfileLink;Alfresco.PeopleFinder=function(v){Alfresco.PeopleFinder.superclass.constructor.call(this,"Alfresco.PeopleFinder",v,["button","container","datasource","datatable","json"]);this.userSelectButtons={};this.searchTerm="";this.singleSelectedUser="";this.selectedUsers={};this.notAllowed={};this.following={};YAHOO.Bubbling.on("personSelected",this.onPersonSelected,this);YAHOO.Bubbling.on("personDeselected",this.onPersonDeselected,this);return this};YAHOO.lang.augmentObject(Alfresco.PeopleFinder,{VIEW_MODE_DEFAULT:"",VIEW_MODE_COMPACT:"COMPACT",VIEW_MODE_FULLPAGE:"FULLPAGE"});YAHOO.lang.extend(Alfresco.PeopleFinder,Alfresco.component.Base,{options:{siteId:"",viewMode:Alfresco.PeopleFinder.VIEW_MODE_DEFAULT,singleSelectMode:false,showSelf:true,minSearchTermLength:1,maxSearchResults:100,setFocus:false,addButtonLabel:null,addButtonSuffix:"",dataWebScript:"",userId:""},userSelectButtons:null,searchTerm:null,singleSelectedUser:null,selectedUsers:null,notAllowed:null,isSearching:false,followingAllowed:false,following:null,onReady:function s(){var w=this;if(this.options.viewMode==Alfresco.PeopleFinder.VIEW_MODE_COMPACT){b.addClass(this.id+"-body","compact");b.removeClass(this.id+"-results","hidden")}else{if(this.options.viewMode==Alfresco.PeopleFinder.VIEW_MODE_FULLPAGE){b.setStyle(this.id+"-results","height","auto");b.removeClass(this.id+"-help","hidden");Alfresco.util.Ajax.jsonGet({url:Alfresco.constants.PROXY_URI+"api/subscriptions/"+encodeURIComponent(this.options.userId)+"/following",successCallback:{fn:function(A){if(A.json.people){var D={};var C=A.json.people;for(var B=0;B<C.length;B++){D[C[B].userName]=true}w.following=D}w.followingAllowed=true},scope:this}})}else{b.setStyle(this.id+"-results","height","300px");b.removeClass(this.id+"-results","hidden")}}this.widgets.searchButton=Alfresco.util.createYUIButton(this,"search-button",this.onSearchClick);var z=Alfresco.constants.PROXY_URI+YAHOO.lang.substitute(this.options.dataWebScript,this.options);z+=(z.indexOf("?")<0)?"?":"&";this.widgets.dataSource=new YAHOO.util.DataSource(z,{responseType:YAHOO.util.DataSource.TYPE_JSON,connXhrMode:"queueRequests",responseSchema:{resultsList:"people"}});this.widgets.dataSource.doBeforeParseData=function y(F,C){var B=C;if(C){var A=C.people,D,E;if(A.length>w.options.maxSearchResults){A=A.slice(0,w.options.maxSearchResults-1)}if(!w.options.showSelf){for(D=0,E=A.length;D<E;D++){if(A[D].userName==Alfresco.constants.USERNAME){A.splice(D,1);break}}}w.notAllowed={};if(C.notAllowed){w.notAllowed=Alfresco.util.arrayToObject(C.notAllowed)}B={people:A}}return B};this._setupDataTable();var x=b.get(this.id+"-search-text");var v=new YAHOO.util.KeyListener(x,{keys:YAHOO.util.KeyListener.KEY.ENTER},{fn:function(A,B,C){w.onSearchClick();u.stopEvent(B[1]);return false},scope:this,correctScope:true},YAHOO.env.ua.ie>0?YAHOO.util.KeyListener.KEYDOWN:"keypress");v.enable();if(this.options.setFocus){x.focus()}},fnRenderCellAvatar:function a(){var w=this;return function v(z,y,A,B){b.setStyle(z.parentNode,"width",A.width+"px");var x=Alfresco.constants.URL_RESCONTEXT+"components/images/no-user-photo-64.png";if(y.getData("avatar")!==undefined){x=Alfresco.constants.PROXY_URI+y.getData("avatar")+"?c=queue&ph=true"}z.innerHTML='<img class="avatar" src="'+x+'" alt="avatar" />'}},fnRenderCellDescription:function c(){var w=this;return function v(G,J,D,A){var F=J.getData("userName"),z=F,H=J.getData("firstName"),I=J.getData("lastName"),x=J.getData("userStatus"),B=J.getData("userStatusTime");if((H!==undefined)||(I!==undefined)){z=H?H+" ":"";z+=I?I:""}var E=J.getData("jobtitle")||"",y=J.getData("organization")||"";var C='<h3 class="itemname">'+f(F,z,'class="theme-color-1" tabindex="0"')+' <span class="lighter">('+n(F)+")</span></h3>";if(E.length!==0){if(w.options.viewMode==Alfresco.PeopleFinder.VIEW_MODE_COMPACT){C+='<div class="detail">'+n(E)+"</div>"}else{C+='<div class="detail"><span>'+w.msg("label.title")+":</span> "+n(E)+"</div>"}}if(y.length!==0){if(w.options.viewMode==Alfresco.PeopleFinder.VIEW_MODE_COMPACT){C+='<div class="detail">&nbsp;('+n(y)+")</div>"}else{C+='<div class="detail"><span>'+w.msg("label.company")+":</span> "+n(y)+"</div>"}}if(x!==null&&w.options.viewMode!==Alfresco.PeopleFinder.VIEW_MODE_COMPACT){C+='<div class="user-status">'+n(x)+" <span>("+Alfresco.util.relativeTime(Alfresco.util.fromISO8601(B.iso8601))+")</span></div>"}G.innerHTML=C}},fnRenderCellActions:function p(){var v=this;return function w(B,z,C,E){b.setStyle(B.parentNode,"width",C.width+"px");b.setStyle(B.parentNode,"text-align","right");var A=z.getData("userName"),D='<span id="'+v.id+"-action-"+A+'"></span>';B.innerHTML=D;if(v.options.viewMode!==Alfresco.PeopleFinder.VIEW_MODE_FULLPAGE){var x=new YAHOO.widget.Button({type:"button",label:(v.options.addButtonLabel?v.options.addButtonLabel:v.msg("button.add"))+" "+v.options.addButtonSuffix,name:v.id+"-selectbutton-"+A,container:v.id+"-action-"+A,tabindex:0,disabled:A in v.notAllowed,onclick:{fn:v.onPersonSelect,obj:z,scope:v}});v.userSelectButtons[A]=x;if((A in v.selectedUsers)||(v.options.singleSelectMode&&v.singleSelectedUser!=="")){v.userSelectButtons[A].set("disabled",true)}}if(v._renderFollowingActions(z)){var y=v.following[A];var x=new YAHOO.widget.Button({type:"button",label:y?v.msg("button.unfollow"):v.msg("button.follow"),name:v.id+"-followbutton-"+A,container:v.id+"-action-"+A,tabindex:0});x.set("onclick",{fn:y?v.onPersonUnfollow:v.onPersonFollow,obj:{record:z,button:x},scope:v})}}},_renderFollowingActions:function t(v){return(this.followingAllowed&&this.options.viewMode===Alfresco.PeopleFinder.VIEW_MODE_FULLPAGE&&this.options.userId!==v.getData("userName"))},_setupDataTable:function i(){var w=[{key:"avatar",label:"Avatar",sortable:false,formatter:this.fnRenderCellAvatar(),width:this.options.viewMode==Alfresco.PeopleFinder.VIEW_MODE_COMPACT?36:70},{key:"person",label:"Description",sortable:false,formatter:this.fnRenderCellDescription()},{key:"actions",label:"Actions",sortable:false,formatter:this.fnRenderCellActions(),width:80}];this.widgets.dataTable=new YAHOO.widget.DataTable(this.id+"-results",w,this.widgets.dataSource,{renderLoopSize:Alfresco.util.RENDERLOOPSIZE,initialLoad:false,MSG_EMPTY:this.msg("message.instructions")});this.widgets.dataTable.doBeforeLoadData=function v(x,y,z){if(y.results){this.renderLoopSize=Alfresco.util.RENDERLOOPSIZE}return true};this.widgets.dataTable.subscribe("rowMouseoverEvent",this.widgets.dataTable.onEventHighlightRow);this.widgets.dataTable.subscribe("rowMouseoutEvent",this.widgets.dataTable.onEventUnhighlightRow)},clearResults:function e(){if(this.widgets.dataTable){var v=this.widgets.dataTable.getRecordSet().getLength();this.widgets.dataTable.deleteRows(0,v)}b.get(this.id+"-search-text").value="";this.singleSelectedUser="";this.selectedUsers={}},onPersonSelect:function d(v,x){var w=x.getData("userName");YAHOO.Bubbling.fire("personSelected",{eventGroup:this,userName:w,firstName:x.getData("firstName"),lastName:x.getData("lastName"),email:x.getData("email")})},onPersonFollow:function l(w,y){var x=y.record.getData("userName");y.button.set("disabled",true);var v=this;Alfresco.util.Ajax.request({url:Alfresco.constants.PROXY_URI+"api/subscriptions/"+encodeURIComponent(this.options.userId)+"/follow",method:Alfresco.util.Ajax.POST,dataObj:[x],requestContentType:Alfresco.util.Ajax.JSON,successCallback:{fn:function(z){y.button.set("label",v.msg("button.unfollow"));y.button.set("onclick",{fn:v.onPersonUnfollow,obj:{record:y.record,button:y.button},scope:v});v.following[x]=true;y.button.set("disabled",false)},scope:this},failureCallback:{fn:function(A){var z=Alfresco.util.parseJSON(A.serverResponse.responseText);Alfresco.util.PopupManager.displayPrompt({title:this._msg("message.failure"),text:z.message});y.button.set("disabled",false)},scope:this}})},onPersonUnfollow:function m(w,y){var x=y.record.getData("userName");y.button.set("disabled",true);var v=this;Alfresco.util.Ajax.request({url:Alfresco.constants.PROXY_URI+"api/subscriptions/"+encodeURIComponent(this.options.userId)+"/unfollow",method:Alfresco.util.Ajax.POST,dataObj:[x],requestContentType:Alfresco.util.Ajax.JSON,successCallback:{fn:function(z){y.button.set("label",v.msg("button.follow"));y.button.set("onclick",{fn:v.onPersonFollow,obj:{record:y.record,button:y.button},scope:v});v.following[x]=false;y.button.set("disabled",false)},scope:this},failureCallback:{fn:function(A){var z=Alfresco.util.parseJSON(A.serverResponse.responseText);Alfresco.util.PopupManager.displayPrompt({title:this._msg("message.failure"),text:z.message});y.button.set("disabled",false)},scope:this}})},onSearchClick:function q(w,x){var v=b.get(this.id+"-search-text").value;if(v.replace(/\*/g,"").length<this.options.minSearchTermLength){Alfresco.util.PopupManager.displayMessage({text:this.msg("message.minimum-length",this.options.minSearchTermLength)});return}this.userSelectButtons={};this._performSearch(v)},onPersonSelected:function g(x,v){var z=v[1];if(z&&(z.userName!==undefined)){var y=z.userName;this.selectedUsers[y]=true;this.singleSelectedUser=y;if(this.options.singleSelectMode){for(var w in this.userSelectButtons){if(this.userSelectButtons.hasOwnProperty(w)){this.userSelectButtons[w].set("disabled",true)}}}else{if(this.userSelectButtons[y]){this.userSelectButtons[y].set("disabled",true)}}}},onPersonDeselected:function o(x,v){var y=v[1];if(y&&(y.userName!==undefined)){delete this.selectedUsers[y.userName];this.singleSelectedUser="";if(this.options.singleSelectMode){for(var w in this.userSelectButtons){if(this.userSelectButtons.hasOwnProperty(w)){this.userSelectButtons[w].set("disabled",false)}}}else{if(this.userSelectButtons[y.userName]){this.userSelectButtons[y.userName].set("disabled",false)}}}},_setDefaultDataTableErrors:function h(v){var w=Alfresco.util.message;v.set("MSG_EMPTY",w("message.empty","Alfresco.PeopleFinder"));v.set("MSG_ERROR",w("message.error","Alfresco.PeopleFinder"))},_performSearch:function r(v){if(!this.isSearching){this.isSearching=true;this._setDefaultDataTableErrors(this.widgets.dataTable);this.widgets.dataTable.set("MSG_EMPTY",this.msg("message.searching"));this.widgets.dataTable.deleteRows(0,this.widgets.dataTable.getRecordSet().getLength());var w=function y(A,B,C){if(this.options.viewMode!=Alfresco.PeopleFinder.VIEW_MODE_COMPACT){if(b.hasClass(this.id+"-results","hidden")){b.removeClass(this.id+"-results","hidden");b.addClass(this.id+"-help","hidden")}}this._enableSearchUI();this._setDefaultDataTableErrors(this.widgets.dataTable);this.widgets.dataTable.onDataReturnInitializeTable.call(this.widgets.dataTable,A,B,C)};var x=function z(B,C){this._enableSearchUI();if(C.status==401){window.location.reload()}else{try{var A=YAHOO.lang.JSON.parse(C.responseText);this.widgets.dataTable.set("MSG_ERROR",A.message);this.widgets.dataTable.showTableMessage(A.message,YAHOO.widget.DataTable.CLASS_ERROR)}catch(D){this._setDefaultDataTableErrors(this.widgets.dataTable)}}};this.searchTerm=v;this.widgets.dataSource.sendRequest(this._buildSearchParams(v),{success:w,failure:x,scope:this});this.widgets.searchButton.set("disabled",true);YAHOO.lang.later(2000,this,function(){if(this.isSearching){if(!this.widgets.feedbackMessage){this.widgets.feedbackMessage=Alfresco.util.PopupManager.displayMessage({text:Alfresco.util.message("message.searching",this.name),spanClass:"wait",displayTime:0})}else{if(!this.widgets.feedbackMessage.cfg.getProperty("visible")){this.widgets.feedbackMessage.show()}}}},[])}},_enableSearchUI:function j(){if(this.widgets.feedbackMessage&&this.widgets.feedbackMessage.cfg.getProperty("visible")){this.widgets.feedbackMessage.hide()}this.widgets.searchButton.set("disabled",false);this.isSearching=false},_buildSearchParams:function k(v){return"filter="+encodeURIComponent(v)+"&maxResults="+this.options.maxSearchResults}})})();