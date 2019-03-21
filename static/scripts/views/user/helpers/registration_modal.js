var USER_MODAL_REGISTARATION = Backbone.View.extend({

  template : "#registration_user_tpl",

  initialize : function( model , callback ){
    this.model = model
    this.callback = callback
    this.listenTo( this.model , "change" , this.btn_status )
    this.render()
  },

  btn_status : function(){
    $("#registration").attr('class' , function(model){
      if( !model.isValid() ){
        return "btn btn-default disabled"
      }
      return "btn btn btn-accent"
    }(this.model))
  }, 

  render : function(){
    var tpl_c = _.template( $(this.template).html() )
    this.$el = $(tpl_c({
      user : this.model
    })).modal('show')

    $(this.$el).on('hidden.bs.modal' , function(){
      $(this).remove()
    })
  },

  events : {

    "click #registration" : function(){
      var self = this
      if( this.model.isValid() ){
        this.model.save({ pass : this.model.get('password') } , { success : function(){
          $(self.$el).modal('hide')
          if( typeof self.callback != "undefined" ){
            self.callback()
          }
        }
      })
      }
    },

    "keyup #email" : function(e){
      this.model.set('email' , $(e.target).val())
    },
    "paste #email" : function(e){
      this.model.set('email' , $(e.target).val())
    },

    "keyup #repeatpassword" : function(e){
      this.model.set('repeatpassword' , $(e.target).val())
    },
    "focus #repeatpassword" : function(e){
      this.model.set('email' , $("#email").val())
      this.model.set('password' , $("#password").val())
    },
    "blur #email" : function(e){
      this.model.set('email' , $(e.target).val())
    },
    "paste #password" : function(e){
      this.model.set('password' , $(e.target).val())
    },
    "keyup #password" : function(e){
      this.model.set('password' , $(e.target).val())
    },
  }

})