var CONCENTRATOR_LIST_VIEW = Backbone.View.extend({

  template : "#concentrator_list_tpl",

  el : "#concentrator_list",

  initialize : function( conc , mark , model ,  converters ){
    this.collection = conc
    this.converters = converters
    this.mark = mark
    this.models = model
    this.listenTo( this.collection , "sync" , this.render )
    this.render()
  },

  render : function(){
    var tpl_c = _.template( $(this.template).html() )

    $(this.$el).empty().append(
      tpl_c({

        concentrators : this.collection,
        models : this.models,
        converters : this.converters

      })
    )
  },

  events : {

    "click #add_concentrator" : function(){
      new CONCENTRATOR_MODAL_EDIT( new CONCENTRATOR_MODEL ,this.collection, this.mark , this.models , this.converters )
    },
    "click .edit_concentrator" : function(e){
      var cid = $(e.target).closest('tr').attr('id')
      new CONCENTRATOR_MODAL_EDIT( this.collection.get(cid) ,this.collection, this.mark , this.models  , this.converters)
    },
    "click .delete_concentrator" : function(e){
      var cid = $(e.target).closest('tr').attr('id')
      new CONCENTRATOR_MODAL_DELETE( this.collection.get(cid) ,this.collection)
    },

  }

})