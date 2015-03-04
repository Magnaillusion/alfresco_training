define(["dojo/_base/declare","alfresco/documentlibrary/views/AlfDocumentListView","alfresco/documentlibrary/views/layouts/Grid","alfresco/documentlibrary/AlfGalleryViewSlider","dojo/_base/lang","dojo/dom-construct"],function(g,l,f,j,c,d){return g([l,f],{getViewName:function m(){return"gallery"},viewSelectionConfig:{label:"Gallery View",iconClass:"alf-gallery-icon"},constructor:function h(){this.alfSubscribe("ALF_DOCLIST_SET_GALLERY_COLUMNS",c.hitch(this,"updateColumns"))},updateColumns:function i(n){if(n!=null&&n.value!=null&&!isNaN(n.value)&&this.columns!=n.value){this.alfLog("log","Update column count to: ",n.value);this.columns=n.value;this.renderView()}},getAdditionalControls:function b(){return[new j({relatedViewName:this.getViewName()})]},renderView:function e(){this.inherited(arguments);this.resizeCells()},onViewShown:function k(){this.resizeCells()},allItemsRendered:function a(){var p=this.currentData.items.length%this.columns;if(p!=0){var o=this.containerNode.children[this.containerNode.children.length-1];for(var n=0;n<p;n++){d.create("TD",{},o)}}},widgets:[{name:"alfresco/renderers/GalleryThumbnail"}]})});