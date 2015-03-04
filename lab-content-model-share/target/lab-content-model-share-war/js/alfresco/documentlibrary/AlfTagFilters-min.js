define(["dojo/_base/declare","alfresco/documentlibrary/AlfDocumentFilters","alfresco/documentlibrary/_AlfDocumentListTopicMixin","alfresco/services/_TagServiceTopics","alfresco/documentlibrary/AlfDocumentFilter","alfresco/core/ObjectTypeUtils","dojo/_base/lang","dojo/_base/array","dojo/dom-construct","dojo/dom-class","dojo/on","dijit/registry"],function(r,b,a,f,l,o,s,h,g,j,k,i){return r([b,a],{i18nRequirements:[{i18nFile:"./i18n/AlfTagFilters.properties"}],filterPrefsName:"docListTagFilterPref",postMixInProperties:function d(){this.inherited(arguments);this.alfSubscribe(this.filterChangeTopic,s.hitch(this,"onFilterChange"));this.alfSubscribe(this.documentTaggedTopic,s.hitch(this,"onDocumentTagged"));this.alfPublish(f.tagQueryTopic,{callback:this.onTagQueryResults,callbackScope:this})},onTagQueryResults:function q(u,t){if(u&&o.isArray(u.tags)){var v=i.findWidgets(this.filtersNode);h.forEach(v,s.hitch(this,"clearTags"));h.forEach(u.tags,s.hitch(this,"createTagFilter"))}else{this.alfLog("warn","A request was made to generate filter tag links, but no 'tags' array attribute was provided",u,t)}},clearTags:function p(u,t){if(typeof u.destroy==="function"){u.destroy()}},createTagFilter:function m(u){if(u&&u.name!=null&&u.count!=null){var t=new l({label:this.message("filter.tag.label",{"0":u.name,"1":u.count}),filter:"tag",filterData:u.name});this.addFilter(t)}else{this.alfLog("warn","It is not possible to create a filter tag without 'name' and 'count' attributes",u)}},onFilterChange:function n(t){if(t!=null&&t.filterId=="tag"){this.alfPublish(this.filterSelectionTopic,{value:t.filterData,description:this.message("filter.tagged.label",{"0":t.filterData})})}},currentTagFilters:null,onDocumentTagged:function c(t){},compareTags:function e(t,u,v){return u.filterData==t}})});