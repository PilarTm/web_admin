var CONVERTER_INFO_VIEW=Backbone.View.extend({el:"#converter_info",template:"#converter_info_tpl",initialize:function(e,t){this.model=e,this.models=t,this.listenTo(this.model,"sync",this.render),this.listenTo(this.models,"sync",this.render),this.render()},render:function(){var e=_.template($(this.template).html()),t=this.models.findWhere({id:this.model.get("model_id")});console.log({id:this.model.get("model_id")}),$(this.$el).empty().append(e({converter:this.model,model:typeof t=="undefined"?new MODEL_CONVERTERS_MODEL:t}))}});