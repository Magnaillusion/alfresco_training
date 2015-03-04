define(["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin","dojo/text!./templates/DragWidgetPalette.html","dojo/text!./templates/WidgetTemplate.html","alfresco/core/Core","dojo/dnd/Source","dojo/_base/lang","dojo/string","dojo/dom-construct","alfresco/forms/controls/DojoValidationTextBox","alfresco/forms/controls/DojoSelect","alfresco/forms/controls/DojoCheckBox","alfresco/forms/controls/MultipleKeyValuePairFormControl","alfresco/forms/creation/FormRulesConfigControl"],function(i,d,l,m,a,c,h,b,k,g){return i([d,l,c],{cssRequirements:[{cssFile:"./css/DragWidgetPalette.css"}],i18nRequirements:[{i18nFile:"./i18n/DragWidgetPalette.properties"}],templateString:m,dragWithHandles:false,postCreate:function f(){var n=new h(this.paletteNode,{copyOnly:true,selfCopy:false,creator:b.hitch(this,"creator"),withHandles:this.dragWithHandles});n.insertNodes(false,this.getPaletteItems())},creator:function e(o,p){this.alfLog("log","Creating",o,p);var n=g.toDom(k.substitute(a,{title:o.data.name,iconClass:o.data.iconClass}));return{node:n,data:o,type:["widget"]}},getPaletteItems:function j(){return[{data:{name:"Text",module:"alfresco/forms/controls/DojoValidationTextBox",iconClass:"textbox",defaultConfig:{name:"default",label:"Text box",description:"Default description",unitsLabel:"units"},configWidgets:[{name:"alfresco/forms/controls/DojoValidationTextBox",config:{name:"name",label:"Post parameter",value:"default",}},{name:"alfresco/forms/controls/DojoValidationTextBox",config:{name:"label",label:"Label",value:"Text box"}},{name:"alfresco/forms/controls/DojoValidationTextBox",config:{name:"description",label:"Description",value:"Default description"}},{name:"alfresco/forms/controls/DojoValidationTextBox",config:{name:"unitsLabel",label:"Units Label",value:"units"}},{name:"alfresco/forms/controls/DojoCheckBox",config:{name:"visibilityConfig.initialValue",label:"Initially visible",value:true}},{name:"alfresco/forms/creation/FormRulesConfigControl",config:{name:"visibilityConfig.rules",label:"Dynamic visibility behaviour configuration"}},{name:"alfresco/forms/controls/DojoCheckBox",config:{name:"requirementConfig.initialValue",label:"Initially required",value:false}},{name:"alfresco/forms/creation/FormRulesConfigControl",config:{name:"requirementConfig.rules",label:"Dynamic requirement behaviour configuration"}},{name:"alfresco/forms/controls/DojoCheckBox",config:{name:"disablementConfig.initialValue",label:"Initially disabled",value:false}},{name:"alfresco/forms/creation/FormRulesConfigControl",config:{name:"disablementConfig.rules",label:"Dynamic disablement behaviour configuration"}},{name:"alfresco/forms/controls/DojoSelect",config:{name:"validationConfig.regex",label:"Validation rules",optionsConfig:{fixed:[{label:"None",value:".*"},{label:"E-mail",value:"^([0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-w]*[0-9a-zA-Z].)+[a-zA-Z]{2,9})$"},{label:"Number",value:"^([0-9]+)$"}]}}}]},type:["widget"]},{data:{name:"Textarea",module:"alfresco/forms/controls/DojoTextarea",iconClass:"textarea",defaultConfig:{name:"default",label:"Text area",description:"Default description"},configWidgets:[{name:"alfresco/forms/controls/DojoValidationTextBox",config:{name:"name",label:"Post parameter",value:"default"}},{name:"alfresco/forms/controls/DojoValidationTextBox",config:{name:"label",label:"Label",value:"Text area"}},{name:"alfresco/forms/controls/DojoTextarea",config:{name:"description",label:"Description",value:"Default description"}}]},type:["widget"]},{data:{name:"DropDown",module:"alfresco/forms/controls/DojoSelect",iconClass:"dropdown",defaultConfig:{name:"default",label:"Drop down",description:"Default description",unitsLabel:"units",optionsConfig:{fixed:[{label:"Option1",value:"Value1"},{label:"Option2",value:"Value2"}]}},configWidgets:[{name:"alfresco/forms/controls/DojoValidationTextBox",config:{name:"name",label:"Post parameter",value:"default"}},{name:"alfresco/forms/controls/DojoValidationTextBox",config:{name:"label",label:"Label",value:"Drop down"}},{name:"alfresco/forms/controls/DojoValidationTextBox",config:{name:"description",label:"Description",value:"Default description"}},{name:"alfresco/forms/controls/DojoValidationTextBox",config:{name:"unitsLabel",label:"Units Label",value:"units"}},{name:"alfresco/forms/controls/MultipleKeyValuePairFormControl",config:{name:"optionsConfig.fixed",label:"Options"}}]},type:["widget"]},{data:{name:"Check box",module:"alfresco/forms/controls/DojoCheckBox",iconClass:"checkbox",defaultConfig:{name:"default",label:"Check box",description:"Default description"},configWidgets:[{name:"alfresco/forms/controls/DojoValidationTextBox",config:{name:"name",label:"Post parameter",value:"default"}},{name:"alfresco/forms/controls/DojoValidationTextBox",config:{name:"label",label:"Label",value:"Check box"}},{name:"alfresco/forms/controls/DojoValidationTextBox",config:{name:"description",label:"Description",value:"Default description"}}]},type:["widget"]}]}})});