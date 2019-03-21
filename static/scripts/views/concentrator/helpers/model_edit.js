var CONCENTRATOR_MODAL_EDIT = Backbone.View.extend({

  template : "#modal_edit_concentrator_tpl",

  is_changed : false,

  is_add : false,

  initialize : function( concentrator , concentrators , mark , model ,converters){
    this.is_add = concentrator.get('id') == 0
    this.model = concentrator
    this.converters = converters
    this.mark = mark
    this.models = model
    this.collection = concentrators

    this.listenTo( this.model , "change:serial" , this.change_serial )
    this.listenTo( this.model , "change:addr" , this.change_addr )
    this.listenTo( this.model , "change:model_id" , this.change_model_id )
    this.listenTo( this.model , "change:converter_id" , this.change_converter_id )
    this.listenTo( this.model , "change" , this.btn_status )
    this.listenTo(this.model , "change" , function(){
      this.is_changed = this.model._changing
    })

    this.render()
  },

  btn_status : function(){
    $("#save").attr('class' , this.model.isValid() ? "btn btn-accent" : "btn btn-default disabled")
  },

  change_serial : function(){
    var warning = this.model.get('serial') ? "removeClass" : "addClass"
    var success = this.model.get('serial') ? "addClass" : "removeClass"
    $('#serial').closest('.form-group')[warning]('has-warning')[success]('has-success')

  },
  change_addr : function(){
    var warning = this.model.get('addr') ? "removeClass" : "addClass"
    var success = this.model.get('addr') ? "addClass" : "removeClass"
    $('#addr').closest('.form-group')[warning]('has-warning')[success]('has-success')

  },
  change_model_id : function(){
    var warning = this.model.get('model_id') ? "removeClass" : "addClass"
    var success = this.model.get('model_id') ? "addClass" : "removeClass"
    $('#model').closest('.form-group')[warning]('has-warning')[success]('has-success')

  },
  change_converter_id : function(){
    var warning = this.model.get('converter_id') ? "removeClass" : "addClass"
    var success = this.model.get('converter_id') ? "addClass" : "removeClass"
    $('#converter_id').closest('.form-group')[warning]('has-warning')[success]('has-success')

  },

  render : function(){
    var tpl_c = _.template( $(this.template).html() )
    this.$el = $(tpl_c({
      models : this.models,
      marks : this.mark,
      concentrator : this.model,
      converters : this.converters
    })).modal('show')

    var self = this;

    $(this.$el).on('shown.bs.modal' , function(){
      self.btn_status()
      self.change_serial()
      self.change_addr()
      self.change_model_id( )
      self.change_converter_id( )
      $("#mark").val( function(){
        var m = self.models.findWhere({ id : self.model.get("model_id") })
        if( typeof m == "undefined" ){
          return 0
        }
        return m.get('mark_id')
      }).trigger('change')
    }).on('hidden.bs.modal' , function(){
      $(this).remove()
      toastr.remove() 

      if( self.is_changed && self.model.get('id') ){
        if(self.is_add){
          toastr["success"]("Концентратор добавлен в систему","Успешно")
        }else{
          toastr["success"]("Концентратор изменился.","Успешно")
        }
      }
      self.collection.fetch()
    })

  },

  implode_chanels : function(){
    this.model.set('chanels' , $('.chanels').val().join(" "))
  },

  events : {

    "change #mark" : function(e){
      var self = this

      $("#model").closest(".form-group").show()

      _.each( this.models.where({ mark_id : Number($(e.target).val()) }) , function( model , i ){
        $("#model").append(
          $("<option/>").attr('value' , model.get('id') )
          .text( model.escape('title') )
          .attr('selected' , self.model.get('model_id') == model.get('id') ? "selected" : null)
          )
        if( !i && !self.model.get('model_id') ){
          self.model.set('model_id' , model.get('id'))
          self.change_model_id()
        }
      })
      if( $(e.target).val() ){
        $('#mark').closest('.form-group').removeClass('has-warning').addClass('has-success')
      }else{
        $('#mark').closest('.form-group').addClass('has-warning').removeClass('has-success')
      }
    },

    "click .chanels" : function(e){
      this.implode_chanels()
    },

    "keyup #serial" : function(e){
      this.model.set('serial' , $(e.target).val() )
    },
    
    "keyup #addr" : function(e){
      this.model.set('addr' , $(e.target).val() )
    },

    "change #addr" : function(e){
      this.model.set('addr' , $(e.target).val() )
    },
    "change #model" : function(e){
      this.model.set('model_id' , $(e.target).val() )
    },
    "change #converter_id" : function(e){
      this.model.set('converter_id' , $(e.target).val() )
    },
    "keyup #title" : function(e){
      this.model.set('title' , $(e.target).val() )
    },

    "click #save" : function(){
      if( this.model.isValid() ){
        var self = this
        this.model.save(null , { success : function(){
          $(self.$el).modal('hide')
        }})
      }
    }

  },



})