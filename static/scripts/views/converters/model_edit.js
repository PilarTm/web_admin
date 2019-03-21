var CONVERTER_MODAL_EDIT = Backbone.View.extend({

  template : "#modal_edit_converter_tpl",

  is_add : false,

  is_changed : false,

  initialize : function( conv ,convs , marks , models , callback ){
    this.is_add = conv.get('id') == 0
    this.model = conv.clone()
    this.collection = convs
    this.marks = marks
    this.models = models
    this.callback = callback
    this.listenTo(this.model , "change" , function(){
      this.is_changed = this.model._changing
    })
    this.listenTo( this.marks , "sync" , this.render )
    this.listenTo( this.models , "sync" , this.render )
    this.listenTo( this.model , "change" , this.btn_status )
    this.listenTo( this.model , "change:model_id" , this.field_status_mark_id )
    this.listenTo( this.model , "change:ip" , this.field_status_ip )
    this.listenTo( this.model , "change:port" , this.field_status_port )
    this.render()
  },

  btn_status : function(){
    var _class = this.model.isValid() ? "btn btn-accent" : "btn btn-default disabled"
    $("#save").attr('class' , _class)
  },

  render : function(){

    if( !this.marks.length || !this.models.length ){
      return
    }

    var tpl_c = _.template($(this.template).html())
    this.$el = $(tpl_c({
      converter : this.model,
      marks : this.marks,
      models : this.models
    })).modal('show')

    var self = this

    $(this.$el).on('hidden.bs.modal' , function(){
      $(this).remove()
      toastr.remove() 

      if( self.is_changed && self.model.get('id') ){
        if(self.is_add){
          toastr["success"]("Конвертер добавлен в систему","Успешно")
        }else{
          toastr["success"]("Конвертер изменился.","Успешно")
        }
      }
      if( typeof self.callback != "undefined" ){
        self.callback()
      }
    }).on('shown.bs.modal' , function(){
      self.btn_status()


      if( self.model.get('model_id') ){
        var model_c = self.models.findWhere({ id : self.model.get('model_id') })
        if( typeof model_c != "undefined" ){
          $("#mark").val(model_c.get('mark_id')).trigger("change")
          $("#model").val(model_c.get('id')).trigger("change")
        }
      }
      self.field_status_mark_id()
      self.field_status_ip()
      self.field_status_port()

    })
  },

  field_status_mark_id : function(){
    if( this.model.get('model_id') ){
        $('#model').closest('.form-group').removeClass('has-warning').addClass('has-success')
      }else{
        $('#model').closest('.form-group').addClass('has-warning').removeClass('has-success')
      }
  },
  field_status_ip : function(){

    class_empty = 'has-warning'
    class_success = 'has-success'
    class_invalid = 'has-error'

    if( this.model.get('ip') == "" ){
      $('#ip').closest('.form-group')
      .removeClass(class_success)
      .removeClass(class_invalid)
      .addClass(class_empty)
    }else{
      if( this.model._validate_ip() ){
        $('#ip').closest('.form-group')
        .removeClass(class_empty)
        .removeClass(class_invalid)
        .addClass(class_success)
      }else{
        $('#ip').closest('.form-group')
        .removeClass(class_empty)
        .removeClass(class_success)
        .addClass(class_invalid)
      }
    }
  },
  field_status_port : function(){
    class_empty = 'has-warning'
    class_success = 'has-success'
    class_invalid = 'has-error'

    if( this.model.get('port') == 0 ){
      $('#port').closest('.form-group')
      .removeClass(class_success)
      .removeClass(class_invalid)
      .addClass(class_empty)
    }else{
      if( this.model._validate_port() ){
        $('#port').closest('.form-group')
        .removeClass(class_empty)
        .removeClass(class_invalid)
        .addClass(class_success)
      }else{
        $('#port').closest('.form-group')
        .removeClass(class_empty)
        .removeClass(class_success)
        .addClass(class_invalid)
      }
    }
  },

  events : {

    "change #mark" : function( e ){
      
      var self = this

        $("#model").closest(".form-group").show()
      _.each( this.models.where({ mark_id : Number($(e.target).val()) }) , function( model , i ){
        $("#model").append(
          $("<option/>").attr('value' , model.get('id') ).text( model.escape('title') )
        )
        if( !i ){
          self.model.set('model_id' , model.get('id'))
        }
      })
      if( $(e.target).val() ){
        $('#mark').closest('.form-group').removeClass('has-warning').addClass('has-success')
      }else{
        $('#mark').closest('.form-group').addClass('has-warning').removeClass('has-success')
      }
    },
    "keyup #ip" : function( e){
      this.model.set('ip' , $(e.target).val())
    },
    "keyup #port" : function( e){
      this.model.set('port' , Number($(e.target).val()))
    },
    "change #port" : function( e){
      this.model.set('port' , Number($(e.target).val()))
    },
    "keyup #login" : function( e){
      this.model.set('login' ,$(e.target).val())
    },
    "keyup #password" : function( e){
      this.model.set('password' , ($(e.target).val()))
    },
    "keyup #title" : function( e){
      this.model.set('title' , ($(e.target).val()))
    },
    "click #save" : function( e){
      var self = this
      this.model.save( null , {

        error : function(){
          toastr["error"]("Конвертер не добавлен в систему","Ошибка")
        },

        success : function(){
          $(self.$el).modal('hide')
          self.collection.fetch()
        }

      })
    }
  }
})