var E_COUNTERS_INDEX = Backbone.View.extend({
  el : "#e_counters_list",
  template : "#e_counters_list_tpl",

  collection : new E_COUNTERS_COLLECTIONS,

  initialize : function( counters , marks , models,_concentrators ){
    this.collection = counters
    this.marks_collection = marks
    this.models_collection = models
    this.concentrators = _concentrators
    this.listenTo( this.collection , "sync" , this.render )
    this.listenTo( this.models_collection , "sync" , this.render )
    this.listenTo( this.concentrators , "sync" , this.render )
    this.render()
  },

  render : function(){
    var tpl_c = _.template( $(this.template).html() )
    $(this.$el).empty().append(tpl_c({
      e_counters_list : this.collection,
      models : this.models_collection,
      concentrators : this.concentrators
    }))
  },

  events : {
    "click #add_e_counter" : function(e){
      new E_COUNTERS_MODAL_EDIT( new E_COUNTERS_MODEL , this.collection , this.marks_collection , this.models_collection )
    },
    "click .delete" : function(e){
      var cid = $(e.target).closest('tr').attr('id')
      new E_COUNTERS_MODAL_DELETE( this.collection.get(cid) , this.collection )
      return false
    },
    "click .edit" : function(e){
      var cid = $(e.target).closest('tr').attr('id')
      new E_COUNTERS_MODAL_EDIT( this.collection.get(cid) , this.collection, this.marks_collection , this.models_collection )
      return false
    }
  }
})