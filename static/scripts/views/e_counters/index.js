

var e_counters = new E_COUNTERS_COLLECTIONS
var converters = new CONVERTER_COLLECTIONS
var mark_e_counters = new MARK_E_COUNTERS_COLLECTIONS
var model_e_counters = new MODEL_E_COUNTERS_COLLECTIONS
var concentrators_list = new CONCENTRATOR_COLLECTIONS

$(document).ready(function(){
  e_counters.fetch()
  converters.fetch()

  var success = {
    mark : false,
    model : false,
    concentrators : false,
    success : function(){
      if( !this.mark || !this.model || !this.concentrators ){
        return
      }
      var v = new E_COUNTERS_INDEX(e_counters,mark_e_counters,model_e_counters,concentrators_list)
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
  concentrators_list.fetch({success : function(){
    success.concentrators = true
    success.success()
  }})

})