var PLACE_MODEL_EDIT=Backbone.View.extend({template:"#add_place_tpl",initialize:function(e,t){this.model=e,this.listenTo(this.model,"change",this.btn_status),this.callback=t,this.render()},render:function(){var e=_.template($(this.template).html());this.$el=$(e({place:this.model})).modal("show");var t=this;$(this.$el).on("hidden.bs.modal",function(){$(this).remove(),t.callback&&t.callback()}).on("shown.bs.modal",function(){t.btn_status()})},btn_status:function(){this.model.isValid()?$("#save").attr("class","btn btn-accent"):$("#save").attr("class","btn btn-default disabled")},events:{"click #save":function(){var e=this;this.model.isValid()&&e.model.save(null,{success:function(){$(e.$el).modal("hide")}})},"keyup #title":function(e){this.model.set("title",$(e.target).val())}}});