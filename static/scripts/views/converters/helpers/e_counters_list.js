var E_COUNTERS_LIST = Backbone.View.extend({

  el : "#e_counters_list",
  template : "#e_counters_list_tpl",

  initialize : function( e_counters , marks , models ){
    this.collection = e_counters
    this.marks = marks
    this.models = models
    this.listenTo( this.collection , "sync" , this.render )
    this.render()
  },

  render : function(){
    var tpl_c = _.template( $(this.template).html() )
    $(this.$el).empty().append(
      tpl_c({ 
        e_counters_list : this.collection ,
        models : this.models
      })
    )  
  },

  events : {

    "click #add_e_counter" : function(){
      new E_COUNTERS_MODAL_EDIT( new E_COUNTERS_MODEL({ converter_id : id }) , this.collection , this.marks , this.models )
    },

    "click .action_table.edit" : function( e ){
      var cid = $(e.target).closest('tr').attr('id')
      new E_COUNTERS_MODAL_EDIT( this.collection.get(cid) , this.collection , this.marks , this.models )
    },

    "click .action_table.delete" : function( e ){
      var cid = $(e.target).closest('tr').attr('id')
      new E_COUNTERS_MODAL_DELETE( this.collection.get(cid) , this.collection )
    }

  }

})