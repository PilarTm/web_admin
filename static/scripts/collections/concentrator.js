var CONCENTRATOR_COLLECTIONS = Backbone.Collection.extend({
  model : CONCENTRATOR_MODEL,
  url : "/api/concentrator",
  parse : function(a){
    return a.data
  },

  validate : function(){


  }
})