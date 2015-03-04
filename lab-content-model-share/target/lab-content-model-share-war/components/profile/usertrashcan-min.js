(function(){var a=YAHOO.util.Dom,x=YAHOO.util.Event;var r=Alfresco.util.encodeHTML;Alfresco.UserTrashcan=function(y){Alfresco.UserTrashcan.superclass.constructor.call(this,"Alfresco.UserTrashcan",y,["button","container","datasource","datatable","paginator"]);this.searchText="";return this};YAHOO.extend(Alfresco.UserTrashcan,Alfresco.component.Base,{searchText:null,pageSize:50,skipCount:0,onReady:function d(){var z=this;this.widgets.empty=Alfresco.util.createYUIButton(this,"empty-button",this.onEmpty);this.widgets.search=Alfresco.util.createYUIButton(this,"search-button",this.onSearch);this.widgets.clear=Alfresco.util.createYUIButton(this,"clear-button",this.onClear);this.widgets.pageLess=Alfresco.util.createYUIButton(this,"paginator-less-button",this.onPageLess);this.widgets.pageMore=Alfresco.util.createYUIButton(this,"paginator-more-button",this.onPageMore);this.widgets.actionMenu=Alfresco.util.createYUIButton(this,"selected",this.onActionItemClick,{disabled:true,type:"menu",menu:"selectedItems-menu"});this.widgets.selectMenu=Alfresco.util.createYUIButton(this,"select-button",this.onSelectItemClick,{type:"menu",menu:"selectItems-menu"});var z=this;a.get(this.id+"-search-text").onkeypress=function(B){if(B.keyCode===YAHOO.util.KeyListener.KEY.ENTER){z.performSearch()}};var y=Alfresco.constants.PROXY_URI+"api/archive/workspace/SpacesStore";this.widgets.dataTable=new Alfresco.util.DataTable({dataTable:{container:this.id+"-datalist",columnDefinitions:[{key:"select",sortable:false,formatter:this.bind(this.renderCellSelect),width:16},{key:"thumbnail",sortable:false,formatter:this.bind(this.renderCellIcon),width:32},{key:"description",sortable:false,formatter:this.bind(this.renderCellDescription)},{key:"actions",sortable:false,formatter:this.bind(this.renderCellActions),width:250}]},dataSource:{url:y,initialParameters:"maxItems="+(this.pageSize+1),config:{responseSchema:{resultsList:"data.deletedNodes"},doBeforeParseData:function A(C,B){z.widgets.pageLess.set("disabled",((z.skipCount=B.paging.skipCount)===0));if(B.paging.totalItems>z.pageSize){B.data.deletedNodes.pop();z.widgets.pageMore.set("disabled",false)}else{z.widgets.pageMore.set("disabled",true)}return B}}}})},renderCellSelect:function p(A,z,B,C){a.setStyle(A.parentNode,"width",B.width+"px");var y=this;A.innerHTML='<input id="checkbox-'+z.getId()+'" type="checkbox" value="'+z.getData("nodeRef")+'">';A.firstChild.onclick=function(){y._updateSelectedItemsMenu()}},renderCellIcon:function m(B,A,C,D){a.setStyle(B.parentNode,"width",C.width+"px");var y=A.getData("name"),z=A.getData("nodeType");B.innerHTML='<span class="icon32"><img src="'+Alfresco.constants.URL_RESCONTEXT+"components/images/filetypes/"+Alfresco.util.getFileIcon(y,A.getData("isContentType")?"cm:content":z)+'" alt="'+r(y)+'" /></span>'},renderCellDescription:function k(E,H,B,y){var z=H.getData("firstName")+" "+H.getData("lastName");var C=Alfresco.constants.PROXY_URI_RELATIVE+"api/node/content/"+H.getData("nodeRef").replace(":/","")+"/"+encodeURIComponent(H.getData("name"));var D='<a href="'+Alfresco.constants.URL_PAGECONTEXT+"user/"+encodeURI(H.getData("archivedBy"))+'/profile">'+r(z)+"</a>";var G=this.msg("message.metadata",Alfresco.util.formatDate(Alfresco.util.fromISO8601(H.getData("archivedDate"))),D);var F=H.getData("isContentType")?'<a href="'+C+'?a=true">'+r(H.getData("name"))+"</a>":r(H.getData("name"));var A='<div class="name">'+F+'</div><div class="desc">'+G+'</div><div class="desc">'+r(H.getData("displayPath"))+"</div>";E.innerHTML=A},renderCellActions:function b(B,A,C,E){a.setStyle(B.parentNode,"vertical-align","middle");a.setStyle(B.parentNode,"text-align","right");var y=A.getData("nodeRef"),D=A.getData("name");this._createActionButton(B,y.split("/")[3],"button.recover",function(F,G){Alfresco.util.Ajax.request({url:Alfresco.constants.PROXY_URI+"api/archive/"+G.nodeRef.replace(":/",""),method:"PUT",successCallback:{fn:this._onRecoverSuccess,obj:G,scope:this},failureMessage:this.msg("message.recover.failure",D)})},{nodeRef:y,name:D});var z=this;this._createActionButton(B,y.split("/")[3],"button.delete",function(F,G){Alfresco.util.PopupManager.displayPrompt({title:z.msg("button.delete"),text:z.msg("message.delete.confirm"),buttons:[{text:z.msg("button.ok"),handler:function(){this.destroy();Alfresco.util.Ajax.request({url:Alfresco.constants.PROXY_URI+"api/archive/"+G.nodeRef.replace(":/",""),method:"DELETE",successCallback:{fn:z._onDeleteSuccess,obj:G,scope:z},failureMessage:z.msg("message.delete.failure",D)})}},{text:z.msg("button.cancel"),handler:function(){this.destroy()},isDefault:true}]})},{nodeRef:y,name:D})},_onRecoverSuccess:function t(y,z){Alfresco.util.PopupManager.displayMessage({text:this.msg("message.recover.success",z.name)});this.refreshDataTable()},_onDeleteSuccess:function f(y,z){Alfresco.util.PopupManager.displayMessage({text:this.msg("message.delete.success",z.name)});this.refreshDataTable()},onActionItemClick:function q(y,D,I){var E=[],z=this.widgets.dataTable.getDataTable(),J=z.getTbodyEl().rows;for(var B=0;B<J.length;B++){if(J[B].cells[0].getElementsByTagName("input")[0].checked){var A=z.getRecord(B);if(A){E.push(A)}}}var F=this;switch(D[1]._oAnchor.className.split(" ")[0]){case"delete-item":Alfresco.util.PopupManager.displayPrompt({title:F.msg("button.delete"),text:F.msg("message.delete.confirm"),buttons:[{text:F.msg("button.ok"),handler:function(){this.destroy();var K=[],N=0;for(var M=0;M<E.length;M++){Alfresco.util.Ajax.request({url:Alfresco.constants.PROXY_URI+"api/archive/"+E[M].getData("nodeRef").replace(":/",""),method:"DELETE",failureCallback:{fn:function(){K.push(E[M].getData("name"));N++},obj:E[M],scope:F},successCallback:{fn:function(){N++},obj:E[M],scope:F}})}var L=function(){if(N===E.length){Alfresco.util.PopupManager.displayPrompt({title:F.msg("message.delete.report"),text:F.msg("message.delete.report-info",(E.length-K.length),K.length)});F.refreshDataTable()}else{setTimeout(L,500)}};setTimeout(L,500)}},{text:F.msg("button.cancel"),handler:function(){this.destroy()},isDefault:true}]});break;case"recover-item":var C=[],H=0;for(var B=0;B<E.length;B++){Alfresco.util.Ajax.request({url:Alfresco.constants.PROXY_URI+"api/archive/"+E[B].getData("nodeRef").replace(":/",""),method:"PUT",failureCallback:{fn:function(){C.push(E[B].getData("name"));H++},obj:E[B],scope:F},successCallback:{fn:function(){H++},obj:E[B],scope:F}})}var G=function(){if(H===E.length){Alfresco.util.PopupManager.displayPrompt({title:F.msg("message.recover.report"),text:F.msg("message.recover.report-info",(E.length-C.length),C.length)});F.refreshDataTable()}else{setTimeout(G,250)}};setTimeout(G,250);break}},onSelectItemClick:function w(A,z,y){switch(z[1]._oAnchor.className.split(" ")[0]){case"select-all":this._selectAll();break;case"select-invert":this._invertSelection();break;case"select-none":this._deselectAll();break}},_selectAll:function e(){var z=this.widgets.dataTable.getDataTable().getTbodyEl().rows;for(var y=0;y<z.length;y++){z[y].cells[0].getElementsByTagName("input")[0].checked=true}this._updateSelectedItemsMenu()},_deselectAll:function h(){var z=this.widgets.dataTable.getDataTable().getTbodyEl().rows;for(var y=0;y<z.length;y++){z[y].cells[0].getElementsByTagName("input")[0].checked=false}this._updateSelectedItemsMenu()},_invertSelection:function n(){var A=this.widgets.dataTable.getDataTable().getTbodyEl().rows;for(var z=0;z<A.length;z++){var y=A[z].cells[0].getElementsByTagName("input")[0];y.checked=!y.checked}this._updateSelectedItemsMenu()},_updateSelectedItemsMenu:function o(){this.widgets.actionMenu.set("disabled",true);var z=this.widgets.dataTable.getDataTable().getTbodyEl().rows;for(var y=0;y<z.length;y++){if(z[y].cells[0].getElementsByTagName("input")[0].checked){this.widgets.actionMenu.set("disabled",false);break}}},onSearch:function v(y,z){this.performSearch()},onClear:function g(y,z){a.get(this.id+"-search-text").value="";if(this.searchText.length!==0){this.searchText="";this.refreshDataTable()}},onEmpty:function c(z,A){var y=this;Alfresco.util.PopupManager.displayPrompt({title:y.msg("button.empty"),text:y.msg("message.empty.confirm"),buttons:[{text:y.msg("button.ok"),handler:function(){this.destroy();var D=Alfresco.util.PopupManager.displayMessage({displayTime:0,effect:null,text:y.msg("message.empty.inprogress")});Alfresco.util.Ajax.request({url:Alfresco.constants.PROXY_URI+"api/archive/workspace/SpacesStore",method:"DELETE",successCallback:{fn:function C(E){D.destroy();y.refreshDataTable()}},failureCallback:{fn:function B(E){D.destroy();Alfresco.util.PopupManager.displayPrompt({text:y.msg("message.recover.failure")})}}})}},{text:y.msg("button.cancel"),handler:function(){this.destroy()},isDefault:true}]})},onPageLess:function u(y,z){if(this.skipCount>0){this.skipCount-=this.pageSize}this.refreshDataTable()},onPageMore:function j(y,z){this.skipCount+=this.pageSize;this.refreshDataTable()},_createActionButton:function i(A,F,E,C,D){var B=this;var z=document.createElement("span");z.id=B.id+F;var y=new YAHOO.widget.Button({container:B.id+F});y.set("label",B.msg(E));y.set("onclick",{fn:C,obj:D,scope:B});A.appendChild(z)},performSearch:function l(){var y=YAHOO.lang.trim(a.get(this.id+"-search-text").value);if(y.length!==0){this.searchText=y;this.refreshDataTable()}},refreshDataTable:function s(){var z="maxItems="+(this.pageSize+1)+"&skipCount="+this.skipCount;if(this.searchText.length!==0){var y=this.searchText;if(y.match("\\*")!="*"){y+="*"}z+="&nf="+encodeURIComponent(y)}this.widgets.dataTable.loadDataTable(z)}})})();