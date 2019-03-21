var PLACE_MODEL_EDIT = Backbone.View.extend({

  template : "#add_place_tpl",

  initialize : function( _model , callback ){
    this.model = _model
    this.listenTo( this.model , "change" , this.btn_status )
    this.callback = callback
    this.render()
  },

  render : function(){
    var tpl_c = _.template( $(this.template).html() )
    this.$el = $( tpl_c({
      place : this.model
    }) ).modal('show')

    var self = this

    $(this.$el).on('hidden.bs.modal' , function(){
      $(this).remove()
      if( self.callback ){
        self.callback()
      }
    }).on('shown.bs.modal' , function(){
      self.btn_status()
    })

  },

  btn_status : function(){
    if( this.model.isValid() ){
      $("#save").attr("class" , "btn btn-accent")
    }else{
      $("#save").attr("class" , "btn btn-default disabled")
    }
  },

  events : {
    "click #save" : function(){
      var self = this
      if( this.model.isValid() ){
        self.model.save(null , { 
          success : function(){
            $(self.$el).modal('hide')
          }
        })
      }
    },
    "keyup #title" : function( e ){
      this.model.set('title' , $(e.target).val() )
    }
  }

  // btn btn-accent

})