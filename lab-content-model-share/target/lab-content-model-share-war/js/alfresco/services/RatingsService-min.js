define(["dojo/_base/declare","alfresco/core/Core","alfresco/core/CoreXhr","alfresco/services/_RatingsServiceTopicMixin","dojo/_base/lang"],function(g,d,e,b,c){return g([d,e,b],{constructor:function i(n){c.mixin(this,n);this.alfSubscribe(this.addRatingTopic,c.hitch(this,"onAddRating"));this.alfSubscribe(this.removeRatingTopic,c.hitch(this,"onRemoveRating"))},getAddRatingsUrl:function l(n){return Alfresco.constants.PROXY_URI+"api/node/"+n+"/ratings"},getRemoveRatingsUrl:function l(n){return Alfresco.constants.PROXY_URI+"api/node/"+n+"/ratings/likesRatingScheme"},onAddRating:function h(p){if(p!=null&&p.node!=null&&p.node.jsNode!=null&&p.node.jsNode.nodeRef!=null&&p.node.jsNode.nodeRef.uri!=null){var n=this.getAddRatingsUrl(p.node.jsNode.nodeRef.uri);var o={nodeRefUri:p.node.jsNode.nodeRef.uri,rating:1,ratingScheme:"likesRatingScheme"};this.serviceXhr({url:n,data:o,method:"POST",successCallback:this.onAddRatingSuccess,failureCallback:this.onAddRatingFailure,callbackScope:this})}},onAddRatingSuccess:function f(o,n){this.alfLog("log","Successfully rated a document",o,n);this.alfPublish(this.addRatingSuccessTopic,{response:o,requestConfig:n})},onAddRatingFailure:function k(o,n){this.alfLog("error","Failed to rate a document",o,n);this.alfPublish(this.addRatingFailureTopic,{response:o,requestConfig:n})},onRemoveRating:function a(p){if(p!=null&&p.node!=null&&p.node.jsNode!=null&&p.node.jsNode.nodeRef!=null&&p.node.jsNode.nodeRef.uri!=null){var n=this.getRemoveRatingsUrl(p.node.jsNode.nodeRef.uri);var o={nodeRefUri:p.node.jsNode.nodeRef.uri,ratingScheme:"likesRatingScheme"};this.serviceXhr({url:n,data:o,method:"DELETE",successCallback:this.onRemoveRatingSuccess,failureCallback:this.onRemoveRatingFailure,callbackScope:this})}},onRemoveRatingSuccess:function j(o,n){this.alfLog("log","Successfully removed a document rating",o,n);this.alfPublish(this.removeRatingSuccessTopic,{response:o,requestConfig:n})},onRemoveRatingFailure:function m(o,n){this.alfLog("error","Failed to remove a document rating",o,n);this.alfPublish(this.removeRatingFailureTopic,{response:o,requestConfig:n})}})});