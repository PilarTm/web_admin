var CONVERTERS_INDEX = Backbone.View.extend({
  el : "#converter_list",
  template : "#converter_list_tpl",

  collection : new CONVERTER_COLLECTIONS,

  initialize : function( conv , marks , models ){
    this.collection = conv
    this.marks_collection = marks
    this.models_collection = models
    this.listenTo( this.collection , "sync" , this.render )
    this.listenTo( this.models_collection , "sync" , this.render )
    this.render()
  },

  render : function(){
    var tpl_c = _.template( $(this.template).html() )
    $(this.$el).empty().append(tpl_c({
      converter_list : this.collection,
      models : this.models_collection
    }))
  },

  events : {
    "click #add_converter" : function(e){
      new CONVERTER_MODAL_EDIT( new CONVERTER_MODEL , this.collection , this.marks_collection , this.models_collection )
    },
    "click .delete" : function(e){
      var cid = $(e.target).closest('tr').attr('id')
      new CONVERTER_MODAL_DELETE( this.collection.get(cid) , this.collection )
      return false
    },
    "click .edit" : function(e){
      var cid = $(e.target).closest('tr').attr('id')
      new CONVERTER_MODAL_EDIT( this.collection.get(cid) , this.collection, this.marks_collection , this.models_collection )
      return false
    }
  }
})

var converters = new CONVERTER_COLLECTIONS
var mark_converters = new MARK_CONVERTER_COLLECTIONS
var model_converters = new MODEL_CONVERTER_COLLECTIONS

$(document).ready(function(){

  var preloader = {
    mark : false,
    model : false,
    success : function(){
      new CONVERTERS_INDEX(converters,mark_converters,model_converters)
    }
  }

  converters.fetch()
  mark_converters.fetch({ success : function(){
    if( preloader.model ){
      preloader.success()
    }
    preloader.mark = true
  }})
  model_converters.fetch({ success : function(){
    if( preloader.mark ){
      preloader.success()
    }
    preloader.model = true
  }})

})