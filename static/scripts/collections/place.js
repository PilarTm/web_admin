var PLACE_COLLECTION = Backbone.Collection.extend({
  model : PLACE_MODEL,
  url : "/api/place"
})