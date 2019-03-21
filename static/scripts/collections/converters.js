var CONVERTER_COLLECTIONS = Backbone.Collection.extend({
  model : CONVERTER_MODEL,
  url : "/api/converters",
  parse : function(a){
    return a.data
  },

  validate : function(){

    if( !this.get('ip') || 
      this.get('port') || 
      this.get('model')){
      return "invalid values"
    }

  }
})