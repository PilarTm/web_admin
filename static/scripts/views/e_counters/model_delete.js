var E_COUNTERS_MODAL_DELETE=Backbone.View.extend({template:"#modal_delete_tpl",is_delete:!1,initialize:function(e,t){this.is_add=e.get("id")>0,this.model=e.clone(),this.collection=t,this.render()},render:function(){var e=_.template($(this.template).html());this.$el=$(e({converter:this.model})).modal("show");var t=this;$(this.$el).on("hidden.bs.modal",function(){$(this).remove(),toastr.remove(),t.is_delete&&toastr.success("Электросчетчик удален из системы","Успешно")})},events:{"click #save":function(e){var t=this;this.model.destroy({error:function(){toastr.error("Электросчетчик не был удален","Ошибка")},success:function(){$(t.$el).modal("hide"),t.is_delete=!0,t.collection.fetch()}})}}});