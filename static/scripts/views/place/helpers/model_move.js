var PLACE_MODEL_MOVE = Backbone.View.extend({

  template : "#move_place_tpl",

  initialize : function(model , callback){
    this.model = model
    this.callback = callback
    this.render()
  },

  render : function(){
    var tpl_c = _.template( $(this.template).html() )
    this.$el = $(tpl_c()).modal('show')

    var self = this

    $(this.$el).on('shown.bs.modal' , function(){

      $('#move_place').jstree({
        'core': {
          data : {
            'url' : function(node){
              if( node.id == "#" ){
                return "/api/place_jstree_empty/" + self.model.get('id')
              } 
              return "/api/place_jstree_empty/"  + self.model.get('id') + "/" + node.id.replace(/place_([0-9]*)_append/ , function(_,id){
                return id
              })
            }
          },
          'themes': {
            'name': 'proton',
            'responsive': true
          },
        },
        "checkbox" : {
          three_state: false,
        },
        "plugins" : [ "checkbox" ],

      })

      $('#move_place').bind("changed.jstree" , function(event , selected){
        if( typeof selected.event != "undefined" ){
          selected.instance.uncheck_all()
        }
        if( selected.action != "deselect_node" ){
          if( typeof selected.node !="undefined" ){
            selected.instance.select_node(selected.node.id)
            self.model.set('place_id' , Number(selected.node.id.replace(/place_([0-9]*)_append/ , function(_,id){
              return id
            })))
            $("#moved").attr("class" , "btn btn-accent")
          }
        }else{
          $("#moved").attr("class" , "btn btn-default disabled")
        }
        return
      })
    }).on('hidden.bs.modal' , function(){
      $(this).remove()
      if( typeof self.callback != "undefined" ){
        self.callback()
      }
    })
  },


  events : {

    "click #moved" : function(){
      var self = this
      this.model.save(null , { success : function(){
        $(self.$el).modal('hide')
      } })
    }
  }

})