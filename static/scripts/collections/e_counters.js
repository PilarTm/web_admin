var E_COUNTERS_COLLECTIONS = Backbone.Collection.extend({
  model : E_COUNTERS_MODEL,
  url : "/api/e_counters",
  parse : function(a){
    return a.data
  },

  validate : function(){


  }
})