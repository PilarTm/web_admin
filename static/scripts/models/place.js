var PLACE_MODEL = Backbone.Model.extend({
  defaults : {
    id : 0,
    title : "",
    place_id : 0
  },

  url : function(){
    return "/api/place/" + this.get('id')
  },

  validate : function(){
    if( this.get('title') == "" ){
      return "empty title"
    }
  }
})