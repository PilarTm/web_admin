var PLACE_MODEL_DELETE=Backbone.View.extend({template:"#delete_place_tpl",initialize:function(e,t){this.model=e,this.callback=t,this.render()},render:function(){var e=_.template($(this.template).html());this.$el=$(e()).modal("show"),$(this.$el).on("hidden.bs.modal",function(){$(this).remove()})},events:{"click #delete_place":function(){var e=this;this.model.destroy({success:function(){$(e.$el).modal("hide"),e.callback&&e.callback()}})}}});