var E_COUNTERS_BY_CONCENTRATOR_COLLECTIONS = E_COUNTERS_COLLECTIONS.extend({
  url : "/api/e_counters_by_concentrator/" + id
})

var e_counters = new E_COUNTERS_BY_CONCENTRATOR_COLLECTIONS
e_counters.fetch()

var E_COUNTERS_LIST = E_COUNTERS_INDEX.extend({
  el : "#ecounters_list",
  template : "#ecounters_list_tpl",

  events : {
    "click #add_e_counter" : function(e){
      new E_COUNTERS_MODAL_EDIT( new E_COUNTERS_MODEL({ concentrator_id : id }) , this.collection , this.marks_collection , this.models_collection )
    },
    "click .delete" : function(e){
      var cid = $(e.target).closest('tr').attr('id')
      new E_COUNTERS_MODAL_DELETE( this.collection.get(cid) , this.collection )
      return false
    },
    "click .edit" : function(e){
      var cid = $(e.target).closest('tr').attr('id')
      new E_COUNTERS_MODAL_EDIT( this.collection.get(cid) , this.collection, this.marks_collection , this.models_collection )
      return false
    }
  }
})


var converters = new CONVERTER_COLLECTIONS
var mark_e_counters = new MARK_E_COUNTERS_COLLECTIONS
var model_e_counters = new MODEL_E_COUNTERS_COLLECTIONS

$(document).ready(function(){
  converters.fetch()

  var success = {
    mark : false,
    model : false,
    converters : false,
    success : function(){
      if( !this.mark || !this.model || !this.converters ){
        return
      }
      new E_COUNTERS_LIST(e_counters,mark_e_counters,model_e_counters,converters)
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
  converters.fetch({success : function(){
    success.converters = true
    success.success()
  }})
})