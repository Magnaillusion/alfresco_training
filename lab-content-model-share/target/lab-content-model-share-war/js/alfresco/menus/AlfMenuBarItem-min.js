define(["dojo/_base/declare","dijit/MenuBarItem","alfresco/menus/_AlfMenuItemMixin","alfresco/core/Core","dojo/dom-construct","dojo/dom-class"],function(b,f,g,d,a,c){return b([f,g,d],{iconNode:null,postCreate:function e(){if(this.label){this.set("label",this.message(this.label))}c.add(this.containerNode,"alf-menu-bar-label-node");if(this.iconClass&&this.iconClass!="dijitNoIcon"){this.iconNode=a.create("img",{className:this.iconClass,src:Alfresco.constants.URL_RESCONTEXT+"/js/alfresco/menus/css/images/transparent-20.png",alt:this.message(this.iconAltText)},this.focusNode,"first");if(this.label){c.add(this.containerNode,this.labelWithIconClass)}}this.inherited(arguments)}})});