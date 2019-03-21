var E_COUNTER_TITLE = Backbone.View.extend({
  
  el : "#e_counter_title",

  initialize : function( model ){
    this.model = model
    this.listenTo( this.model , "sync" , this.render )
    this.render()
  },

  render : function(){
    $(this.$el).text(this.model.get_title())
  }

})