var CONCENTRATOR_MODEL = Backbone.Model.extend({
  defaults : {
    id : 0,
    title : "",
    model_id : 0,
    converter_id : 0,
    addr : 0,
    serial : "",
    place_id : 0,
  },


  url : function(){
    return "/api/concentrator/" + this.get('id')
  },

  get_title : function(){
    if( this.get('title') ){
      return this.escape('title')
    }
    return this.escape('serial')
  },

  parse_chanels : function(){
    return this.get('chanels').split(" ").map( function( res , item){
      return Number(item)
    }, [])  
  },

  validate : function(){
    if( !this.get('serial') ){
      return "undefined serial"
    }
    if( !this.get('addr') ){
      return "undefined addr"
    }
    if( !this.get('model_id') ){
      return "undefined model_id"
    }
    if( Number(this.get('converter_id')) <= 0  ){
      return "undefined converter_id"
    }
  }
})