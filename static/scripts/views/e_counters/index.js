var e_counters=new E_COUNTERS_COLLECTIONS,converters=new CONVERTER_COLLECTIONS,mark_e_counters=new MARK_E_COUNTERS_COLLECTIONS,model_e_counters=new MODEL_E_COUNTERS_COLLECTIONS,concentrators_list=new CONCENTRATOR_COLLECTIONS;$(document).ready(function(){e_counters.fetch(),converters.fetch();var e={mark:!1,model:!1,concentrators:!1,success:function(){if(!this.mark||!this.model||!this.concentrators)return;var e=new E_COUNTERS_INDEX(e_counters,mark_e_counters,model_e_counters,concentrators_list)}};mark_e_counters.fetch({success:function(){e.mark=!0,e.success()}}),model_e_counters.fetch({success:function(){e.model=!0,e.success()}}),concentrators_list.fetch({success:function(){e.concentrators=!0,e.success()}})});