define(["dojo/_base/declare","alfresco/renderers/Banner","alfresco/core/UrlUtils"],function(b,d,a){return b([d,a],{i18nRequirements:[{i18nFile:"./i18n/LockedBanner.properties"}],postMixInProperties:function c(){var f=this.currentItem.jsNode.properties,h=f.lockOwner||f.workingCopyOwner,e=this.generateUserLink(this,h),g="details.banner.";if(this.currentItem.isContainer){g+="folder."}if(this.currentItem.workingCopy&&this.currentItem.workingCopy.googleDocUrl!=null){if(h.userName===Alfresco.constants.USERNAME){this.bannerMessage=this.message(g+"google-docs-owner",{"0":'<a href="'+this.currentItem.workingCopy.googleDocUrl+'" target="_blank">'+this.message("details.banner.google-docs.link")+"</a>"})}else{this.bannerMessage=this.message(g+"google-docs-locked",{"0":e,"1":'<a href="'+this.currentItem.workingCopy.googleDocUrl+'" target="_blank">'+this.message("details.banner.google-docs.link")+"</a>"})}}else{if(this.currentItem.workingCopy&&h.userName===Alfresco.constants.USERNAME){this.bannerMessage=this.message(g+(this.currentItem.workingCopy.isWorkingCopy?"editing":"lock-owner"))}else{if(this.currentItem.workingCopy){this.bannerMessage=this.message(g+"locked",e)}}}}})});