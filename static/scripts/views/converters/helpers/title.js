var CONVERTER_TITLE_VIEW = Backbone.View.extend({

  el : "#converter_title",
  
  initialize : function( model ){
    this.model = model
    this.listenTo( this.model , "sync" , this.render )
    this.render()
  },

  render : function(){
    var tpl_c = _.template( "<%= converter.escape('title') %>" )
    $(this.$el).empty().append(
      tpl_c({ converter : this.model })
    )
  }

})