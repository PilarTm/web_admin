var MODEL_CONCENTRATOR_COLLECTIONS = Backbone.Collection.extend({
  model : MODEL_CONCENTRATOR_MODEL,
  url : "/api/model_concentrator",
  parse : function(a){
    return a.data
  }
})