define(["dojo/_base/declare","alfresco/menus/AlfMenuItem","dojo/_base/lang","dojo/dom-class"],function(c,h,g,e){return c([h],{filterTopic:null,postCreate:function b(){if(this.filterTopic!=null){this.alfSubscribe(this.filterTopic,g.hitch(this,"filter"))}this.inherited(arguments)},filter:function d(i){this.alfLog("warn","No implementation of filtering extension point",i)},hide:function a(){e.add(this.domNode,"hidden")},show:function f(){e.remove(this.domNode,"hidden")}})});