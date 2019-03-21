var _e_counter = new E_COUNTERS_MODEL({ id : id })
var converter = new CONVERTER_MODEL()
var model = new MODEL_E_COUNTERS_MODEL()
$(document).ready(function(){
  
  _e_counter.fetch({success : function(){
    converter.set({ id : _e_counter.get('converter_id') })
    converter.fetch()
    model.set({ id : _e_counter.get('model_id') })
    model.fetch()
  }})
  new E_COUNTER_INFO( _e_counter , converter , model )
  new E_COUNTER_TITLE( _e_counter )


})