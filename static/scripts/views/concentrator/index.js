var concentrators_collection = new CONCENTRATOR_COLLECTIONS()
concentrators_collection.fetch()

var mark_collection = new MARK_CONCENTRATOR_COLLECTIONS
var model_collection = new MODEL_CONCENTRATOR_COLLECTIONS
var converters_collection = new CONVERTER_COLLECTIONS

$(document).ready(function(){


  var preloader = {
    mark : false,
    model : false,
    converters : false,
    success : function(){
      new CONCENTRATOR_LIST_VIEW(concentrators_collection, mark_collection, model_collection , converters_collection)
    }
  }

  mark_collection.fetch({ success : function(){
    if( preloader.model && preloader.converters ){
      preloader.success()
    }
    preloader.mark = true
  }})
  model_collection.fetch({ success : function(){
    if( preloader.mark && preloader.converters ){
      preloader.success()
    }
    preloader.model = true
  }})
  converters_collection.fetch({ success : function(){
    if( preloader.mark && preloader.model ){
      preloader.success()
    }
    preloader.converters = true
  }})
  
})