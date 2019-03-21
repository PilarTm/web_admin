var CONVERTER_INFO_VIEW = Backbone.View.extend({

  el : "#converter_info",

  template : "#converter_info_tpl",

  initialize : function( converter , models ){
    this.model = converter
    this.models = models
    this.listenTo( this.model , "sync" , this.render )
    this.listenTo( this.models , "sync" , this.render )
    this.render()
  },

  render : function(){

    var tpl_c = _.template($(this.template).html())

    var model = this.models.findWhere({ id : this.model.get('model_id') })
    console.log( { id : this.model.get('model_id') } )

    $(this.$el).empty().append(
      tpl_c({

        converter : this.model,
        model : typeof model == "undefined" ? new MODEL_CONVERTERS_MODEL : model


      })
    )

  }

})