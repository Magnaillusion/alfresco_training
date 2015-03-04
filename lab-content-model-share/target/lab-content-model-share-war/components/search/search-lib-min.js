(function(){var b=Alfresco.util.encodeHTML,a=Alfresco.util.message;Alfresco.component.SearchBase=function c(e,d){Alfresco.component.SearchBase.superclass.constructor.call(this,e,d);return this};YAHOO.extend(Alfresco.component.SearchBase,Alfresco.component.Base,{getBrowseUrlForRecord:function(e){var h=e.getData("name"),j=e.getData("type"),g=e.getData("site"),k=e.getData("path"),i=e.getData("nodeRef"),d=e.getData("container"),f=e.getData("modifiedOn");return this.getBrowseUrl(h,j,g,k,i,d,f)},getBrowseUrl:function(h,j,g,k,i,d,f){var e=null;switch(j){case"document":e="document-details?nodeRef="+i;break;case"folder":if(k!==null){if(g){e="documentlibrary?path="+encodeURIComponent(this.buildSpaceNamePath(k.split("/"),h))}else{e="repository?path="+encodeURIComponent(this.buildSpaceNamePath(k.split("/").slice(2),h))}}break;case"blogpost":e="blog-postview?postId="+h;break;case"forumpost":e="discussions-topicview?topicId="+h;break;case"calendarevent":e=d+"?date="+Alfresco.util.formatDate(f,"yyyy-mm-dd");break;case"wikipage":e="wiki-page?title="+h;break;case"link":e="links-view?linkId="+h;break;case"datalist":case"datalistitem":e="data-lists?list="+h;break}if(e!==null){if(g){e=Alfresco.constants.URL_PAGECONTEXT+"site/"+g.shortName+"/"+e}else{e=Alfresco.constants.URL_PAGECONTEXT+e}}return(e!==null?e:"#")},getBrowseUrlForFolderPath:function(f,e){var d=null;if(e){d=Alfresco.constants.URL_PAGECONTEXT+"site/"+e.shortName+"/documentlibrary?path="+encodeURIComponent("/"+f)}else{d=Alfresco.constants.URL_PAGECONTEXT+"repository?path="+encodeURIComponent("/"+f.split("/").slice(2).join("/"))}return d},buildSpaceNamePath:function(e,d){return(e.length!==0?("/"+e.join("/")):"")+"/"+d},buildTextForType:function(e){var d="";switch(e){case"document":case"folder":case"blogpost":case"forumpost":case"calendarevent":case"wikipage":case"datalist":case"datalistitem":case"link":d+=a("label."+e);break;default:d+=a("label.unknown");break}return d},buildPath:function(f,g,e){var d="";if(f==="document"||f==="folder"){if(e){if(!g){g=""}d+='<div class="details">'+a("message.infolderpath")+': <a href="'+this.getBrowseUrlForFolderPath(g,e)+'">'+b("/"+g)+"</a></div>"}else{if(g){d+='<div class="details">'+a("message.infolderpath")+': <a href="'+this.getBrowseUrlForFolderPath(g)+'">'+b(g)+"</a></div>"}}}return d},buildThumbnailUrl:function(g,f,e){var d="";switch(g){case"document":d=Alfresco.constants.PROXY_URI_RELATIVE+"api/node/"+f.replace(":/","");d+="/content/thumbnails/doclib?c=queue&ph=true&lastModified="+Alfresco.util.encodeHTML(e);break;case"folder":d=Alfresco.constants.URL_RESCONTEXT+"components/search/images/folder.png";break;case"blogpost":d=Alfresco.constants.URL_RESCONTEXT+"components/search/images/blog-post.png";break;case"forumpost":d=Alfresco.constants.URL_RESCONTEXT+"components/search/images/topic-post.png";break;case"calendarevent":d=Alfresco.constants.URL_RESCONTEXT+"components/search/images/calendar-event.png";break;case"wikipage":d=Alfresco.constants.URL_RESCONTEXT+"components/search/images/wiki-page.png";break;case"link":d=Alfresco.constants.URL_RESCONTEXT+"components/search/images/link.png";break;case"datalist":d=Alfresco.constants.URL_RESCONTEXT+"components/search/images/datalist.png";break;case"datalistitem":d=Alfresco.constants.URL_RESCONTEXT+"components/search/images/datalistitem.png";break;default:d=Alfresco.constants.URL_RESCONTEXT+"components/search/images/generic-result.png";break}return d},buildThumbnailHtml:function(e,d,h){var f={displayName:e.getData("displayName"),type:e.getData("type"),name:e.getData("name"),nodeRef:e.getData("nodeRef"),site:e.getData("site"),path:e.getData("path"),container:e.getData("container"),modifiedOn:e.getData("modifiedOn"),mimetype:e.getData("mimetype"),width:h,height:d};var g=this._buildThumbnailHtml(f);if(h&&d){return g}if(f.type==="document"){var i=Alfresco.constants.PROXY_URI_RELATIVE+"api/node/content/"+f.nodeRef.replace(":/","")+"/"+encodeURIComponent(f.name),k=(f.mimetype&&f.mimetype.match("^image/")),j='<div class="action-overlay">';if(!k){j+='<a href="'+i+'" target="_blank"><img title="'+b(a("label.viewinbrowser"))+'" src="'+Alfresco.constants.URL_RESCONTEXT+'components/search/images/view-in-browser-16.png" width="16" height="16"/></a>'}else{j+='<a href="'+this.getBrowseUrlForRecord(e)+'"><img title="'+b(a("label.viewdetails"))+'" src="'+Alfresco.constants.URL_RESCONTEXT+'components/documentlibrary/actions/document-view-details-16.png" width="16" height="16"/></a>'}j+='<a href="'+i+'?a=true" style="padding-left:4px" target="_blank"><img title="'+b(a("label.download"))+'" src="'+Alfresco.constants.URL_RESCONTEXT+'components/search/images/download-16.png" width="16" height="16"/></a>';j+="</div>";g=j+g}return g},_buildThumbnailHtml:function(f){var e,i=(f.mimetype&&f.mimetype.match("^image/"));if(i){e=Alfresco.constants.PROXY_URI_RELATIVE+"api/node/content/"+f.nodeRef.replace(":/","")+"/"+encodeURIComponent(f.name)}else{e=this.getBrowseUrl(f.name,f.type,f.site,f.path,f.nodeRef,f.container,f.modifiedOn)}var d=this.buildThumbnailUrl(f.type,f.nodeRef,f.modifiedOn),h=b(f.displayName);var g='<span><a href="'+e+'"'+(i?' onclick="showLightbox(this);return false;"':"")+'><img src="'+d+'" alt="'+h+'" title="'+h+'"'+(f.height&&f.width?' width="'+f.width+'" height="'+f.height+'"':"")+"/></a></span>";return g}})})();