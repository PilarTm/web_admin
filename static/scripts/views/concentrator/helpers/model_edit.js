var CONCENTRATOR_MODAL_EDIT=Backbone.View.extend({template:"#modal_edit_concentrator_tpl",is_changed:!1,is_add:!1,initialize:function(e,t,n,r,i){this.is_add=e.get("id")==0,this.model=e,this.converters=i,this.mark=n,this.models=r,this.collection=t,this.listenTo(this.model,"change:serial",this.change_serial),this.listenTo(this.model,"change:addr",this.change_addr),this.listenTo(this.model,"change:model_id",this.change_model_id),this.listenTo(this.model,"change:converter_id",this.change_converter_id),this.listenTo(this.model,"change",this.btn_status),this.listenTo(this.model,"change",function(){this.is_changed=this.model._changing}),this.render()},btn_status:function(){$("#save").attr("class",this.model.isValid()?"btn btn-accent":"btn btn-default disabled")},change_serial:function(){var e=this.model.get("serial")?"removeClass":"addClass",t=this.model.get("serial")?"addClass":"removeClass";$("#serial").closest(".form-group")[e]("has-warning")[t]("has-success")},change_addr:function(){var e=this.model.get("addr")?"removeClass":"addClass",t=this.model.get("addr")?"addClass":"removeClass";$("#addr").closest(".form-group")[e]("has-warning")[t]("has-success")},change_model_id:function(){var e=this.model.get("model_id")?"removeClass":"addClass",t=this.model.get("model_id")?"addClass":"removeClass";$("#model").closest(".form-group")[e]("has-warning")[t]("has-success")},change_converter_id:function(){var e=this.model.get("converter_id")?"removeClass":"addClass",t=this.model.get("converter_id")?"addClass":"removeClass";$("#converter_id").closest(".form-group")[e]("has-warning")[t]("has-success")},render:function(){var e=_.template($(this.template).html());this.$el=$(e({models:this.models,marks:this.mark,concentrator:this.model,converters:this.converters})).modal("show");var t=this;$(this.$el).on("shown.bs.modal",function(){t.btn_status(),t.change_serial(),t.change_addr(),t.change_model_id(),t.change_converter_id(),$("#mark").val(function(){var e=t.models.findWhere({id:t.model.get("model_id")});return typeof e=="undefined"?0:e.get("mark_id")}).trigger("change")}).on("hidden.bs.modal",function(){$(this).remove(),toastr.remove(),t.is_changed&&t.model.get("id")&&(t.is_add?toastr.success("Концентратор добавлен в систему","Успешно"):toastr.success("Концентратор изменился.","Успешно")),t.collection.fetch()})},implode_chanels:function(){this.model.set("chanels",$(".chanels").val().join(" "))},events:{"change #mark":function(e){var t=this;$("#model").closest(".form-group").show(),_.each(this.models.where({mark_id:Number($(e.target).val())}),function(e,n){$("#model").append($("<option/>").attr("value",e.get("id")).text(e.escape("title")).attr("selected",t.model.get("model_id")==e.get("id")?"selected":null)),!n&&!t.model.get("model_id")&&(t.model.set("model_id",e.get("id")),t.change_model_id())}),$(e.target).val()?$("#mark").closest(".form-group").removeClass("has-warning").addClass("has-success"):$("#mark").closest(".form-group").addClass("has-warning").removeClass("has-success")},"click .chanels":function(e){this.implode_chanels()},"keyup #serial":function(e){this.model.set("serial",$(e.target).val())},"keyup #addr":function(e){this.model.set("addr",$(e.target).val())},"change #addr":function(e){this.model.set("addr",$(e.target).val())},"change #model":function(e){this.model.set("model_id",$(e.target).val())},"change #converter_id":function(e){this.model.set("converter_id",$(e.target).val())},"keyup #title":function(e){this.model.set("title",$(e.target).val())},"click #save":function(){if(this.model.isValid()){var e=this;this.model.save(null,{success:function(){$(e.$el).modal("hide")}})}}}});