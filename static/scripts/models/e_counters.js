var E_COUNTERS_MODEL = Backbone.Model.extend({
  defaults : {
    id : 0,
    title : "",
    num_485 : 0,
    serial : "",
    model_id : 0,
    converter_id : 0,
    concentrator_id : 0,
    place_id : 0,
  },

  url : function(){
    return "/api/e_counters/" + this.get('id')
  },

   get_title : function(){
    if( !this.get('title') ){
      if( !this.get('serial') ){
        return this.get('num_485')
      }
      return this.get('serial')
    }
    return this.get('title')
  },

  validate : function(){

    if( Number( this.get('converter_id') ) == 0 && Number( this.get('concentrator_id') ) == 0 ) {
      return "invalid converter"
    }  

    if( this.get('serial') == "" && !this._validate_num_485() ) {
      return "invalid serial or num 485"
    }  

    if( Number( this.get('model_id') ) == 0 ) {
      return "invalid model"
    }  

  },

  _validate_num_485 : function(){
    return Number( this.get('num_485') ) > 0
  }
})