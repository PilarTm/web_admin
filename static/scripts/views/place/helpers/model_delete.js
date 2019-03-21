var PLACE_MODEL_DELETE = Backbone.View.extend({
  template : "#delete_place_tpl",

  initialize : function( model , callback ){
    this.model = model
    this.callback = callback
    this.render()
  },

  render : function(){
    var tpl_c = _.template( $(this.template).html() )
    this.$el = $(tpl_c()).modal('show')

    $(this.$el).on('hidden.bs.modal' , function(){
      $(this).remove()
    })
  },

  events : {
    "click #delete_place" : function(){
      
      var self = this

      this.model.destroy({ success : function(){
        $(self.$el).modal('hide')
        if( self.callback ){
          self.callback()
        }
      } })
    }
  }
})