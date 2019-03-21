var MODEL_E_COUNTERS_COLLECTIONS = Backbone.Collection.extend({
  model : MODEL_E_COUNTERS_MODEL,
  url : "/api/model_e_counters",
  parse : function(a){
    return a.data
  }
})