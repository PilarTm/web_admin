var MARK_E_COUNTERS_COLLECTIONS = Backbone.Collection.extend({
  model : MARK_E_COUNTERS_MODEL,
  url : "/api/mark_e_counters",
  parse : function(a){
    return a.data
  }
})