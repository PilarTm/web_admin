var converter = new CONVERTER_MODEL({ id : id })
var mark_e_counters = new MARK_E_COUNTERS_COLLECTIONS
var model_e_counters = new MODEL_E_COUNTERS_COLLECTIONS
var model_converters = new MODEL_CONVERTER_COLLECTIONS

var E_COUNTERS_COLLECTIONS_BY_CONVERTER = E_COUNTERS_COLLECTIONS.extend({
  url : (new E_COUNTERS_COLLECTIONS).url + "?converter=" + id
})

var _e_counters = new E_COUNTERS_COLLECTIONS_BY_CONVERTER()


$(document).ready(function(){
  converter.fetch()
  model_converters.fetch()
  _e_counters.fetch()
  new CONVERTER_TITLE_VIEW( converter )
  new CONVERTER_INFO_VIEW( converter , model_converters )

  var success = {
    mark : false,
    model : false,
    success : function(){
      if( !this.mark || !this.model ){
        return
      }
      new E_COUNTERS_LIST( _e_counters , mark_e_counters , model_e_counters )
    }
  }


  mark_e_counters.fetch({success : function(){
    success.mark = true
    success.success()
  }})
  model_e_counters.fetch({success : function(){
    success.model = true
    success.success()
  }})

})