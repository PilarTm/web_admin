var E_COUNTERS_MODAL_EDIT = Backbone.View.extend({

  template : "#modal_edit_tpl",

  is_add : false,

  is_changed : false,

  initialize : function( conv ,convs , marks , models , callback ){
    this.is_add = conv.get('id') == 0
    this.model = conv.clone()
    this.collection = convs
    this.marks = marks
    this.models = models
    this.callback = callback
    this.listenTo( this.marks , "sync" , this.render )
    this.listenTo( this.models , "sync" , this.render )

    var self = this

    this.listenTo( this.model , "change:model_id" , this.field_status_model_id )
    this.listenTo( this.model , "change:serial" , this.field_status_serial )
    this.listenTo( this.model , "change:num_485" , this.field_status_num485 )
    this.listenTo( this.model , "change:converter_id" , this.field_status_converter_id )
    this.listenTo( this.model , "change:concentrator_id" , this.field_status_concentrator_id )
    this.listenTo(this.model , "change" , function(){
      this.is_changed = self.model._changing
      this.btn_status()
    })
    this.render()
  },

  btn_status : function(){
    var self = this
    $("#save").attr('class' , function(){
      return "btn " + (self.model.isValid() ? "btn-accent" : "btn-default disabled")
    })
  },



  render : function(){

    if( !this.marks.length || !this.models.length ){
      return
    }

    var tpl_c = _.template($(this.template).html())
    this.$el = $(tpl_c({
      e_counters : this.model,
      marks : this.marks,
      models : this.models
    })).modal('show')

    var self = this

    $(this.$el).on('hidden.bs.modal' , function(){
      $(this).remove()
      toastr.remove() 
      if( self.is_changed && self.model.get('id') ){
        if(self.is_add){
          toastr["success"]("Электросчетчик добавлен в систему","Успешно")
        }else{
          toastr["success"]("Электросчетчик изменился.","Успешно")
        }
      }
      if( typeof self.callback != "undefined" ){
        self.callback()
      }
    }).on('shown.bs.modal' , function(){

      if( !self.model.get('converter_id') && !self.model.get('concentrator_id') ){
        self.model.set('converter_id' , Number($('#converter_id').val()))
      }else if(self.model.get('converter_id')){
        $("#converter_id").val(self.model.get('converter_id'))
      }else if(self.model.get('concentrator_id')){
        console.log(self.model.get('concentrator_id'))
        $("#concentrator_id").val(self.model.get('concentrator_id'))
        .trigger("change")
      }

      if( self.model.get('model_id') ){
        var model_c = self.models.findWhere({ id : self.model.get('model_id') })
        if( typeof model_c != "undefined" ){
          $("#mark").val(model_c.get('mark_id')).trigger("change")
          $("#model").val(model_c.get('id')).trigger("change")
        }
      }
      self.field_status_model_id()
      self.field_status_serial()
      self.field_status_num485()
      self.field_status_converter_id()
      self.field_status_concentrator_id()
      self.btn_status()
    })
  },

  field_status_model_id : function(){
    if( this.model.get('model_id') ){
      $('#model').closest('.form-group').removeClass('has-warning').addClass('has-success')
    }else{
      $('#model').closest('.form-group').addClass('has-warning').removeClass('has-success')
    }
  },
  field_status_concentrator_id : function(){
    if( this.model.get('concentrator_id') ){
      $('#concentrator_id').closest('.form-group').removeClass('has-warning').addClass('has-success')
    }else{
      $('#concentrator_id').closest('.form-group').addClass('has-warning').removeClass('has-success')
    }
  },
  field_status_converter_id : function(){
    if( this.model.get('converter_id') ){
      $('#converter_id').closest('.form-group').removeClass('has-warning').addClass('has-success')
    }else{
      $('#converter_id').closest('.form-group').addClass('has-warning').removeClass('has-success')
    }
  },
  field_status_serial : function(){
    if( this.model.get('serial') ){
      $('#serial').closest('.form-group').removeClass('has-warning').addClass('has-success')
    }else{
      $('#serial').closest('.form-group').addClass('has-warning').removeClass('has-success')
    }
  },
  field_status_num485 : function(){
    if( this.model.get('num_485') ){
      $('#num_485').closest('.form-group').removeClass('has-warning').addClass('has-success')
    }else{
      $('#num_485').closest('.form-group').addClass('has-warning').removeClass('has-success')
    }
  },

  events : {
    "change #mark" : function( e ){

      if( Number($(e.target).val() ) ){
        $("#model").closest(".form-group").show()
      }else{
        $("#model").closest(".form-group").hide()
      }

      $("#model").find('option').remove()
      var self = this

      var isset_model = this.models.findWhere({ id : self.model.get('model_id') })
      if( typeof isset_model == "undefined" ){
        isset_model = new MODEL_E_COUNTERS_COLLECTIONS()
      }

      _.each( this.models.where({ mark_id : Number($(e.target).val()) }) , function( model , i ){
        $("#model").append(
          $("<option/>").attr('value' , model.get('id') ).text( model.escape('title') )
          )
        if( !i && isset_model.get('mark_id') != Number($(e.target).val()) ){
          self.model.set('model_id' , model.get('id'))
        }
      })

      if( Number($(e.target).val()) ){
        $('#mark').closest('.form-group').addClass('has-success').removeClass('has-warning')
      }else{
        $('#mark').closest('.form-group').removeClass('has-success').addClass('has-warning')
      }
    },

    "keyup #serial" : function( e ){
      this.model.set('serial' , $(e.target).val() )
    },

    "keyup #num_485" : function( e ){
      this.model.set('num_485' , $(e.target).val() )
    },

    "keyup #title" : function( e ){
      this.model.set('title' , $(e.target).val() )
    },

    "change #model" : function( e ){
      this.model.set('model_id' , Number($(e.target).val()) )
    },

    "change #converter_id" : function( e ){
      this.model.set('concentrator_id' , 0 )
      $('#concentrator_id').val(0)
      this.model.set('converter_id' , $(e.target).val() )
    },
    "change #concentrator_id" : function( e ){
      this.model.set('converter_id' , 0 )
      $('#converter_id').val(0)
      this.model.set('concentrator_id' , $(e.target).val() )
    },

    "click #save" : function( e){

      if( !this.model.isValid() ){
        return false
      }

      var self = this
      this.model.save( null , {

        error : function(){
          toastr["error"]("Электросчетчик не добавлен в систему","Ошибка")
        },

        success : function(){
          $(self.$el).modal('hide')
          self.collection.fetch()
        }

      })
    }
  }
})