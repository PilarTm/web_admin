var E_COUNTER_INFO = Backbone.View.extend({

  el : "#e_counter_info",

  template : "#e_counter_info_tpl",

  initialize : function( e_counter , converter , model ) {
    this.model = e_counter
    this.converter = converter
    this.e_counter_model = model
    this.listenTo( this.model,"sync" , this.render )
    this.listenTo( this.converter,"sync" , this.render )
    this.listenTo( this.e_counter_model,"sync" , this.render )
    this.render()
  },

  render : function(){
    var tpl_c = _.template( $(this.template).html() )
    $(this.$el).empty().append(
      tpl_c({

        counter : this.model,
        converter : this.converter,
        model : this.e_counter_model

      })
    )
  }

})