var E_COUNTERS_MODAL_DELETE = Backbone.View.extend({

  template : "#modal_delete_tpl",

  is_delete : false,

  initialize : function( conv ,convs ){
    this.is_add = conv.get('id') > 0
    this.model = conv.clone()
    this.collection = convs
    this.render()
  },

  render : function(){
    var tpl_c = _.template($(this.template).html())
    this.$el = $(tpl_c({
      converter : this.model
    })).modal('show')

    var self = this

    $(this.$el).on('hidden.bs.modal' , function(){
      $(this).remove()
      toastr.remove() 
      if( self.is_delete ){
        toastr["success"]("Электросчетчик удален из системы","Успешно")
      }
    })
  },

  events : {
    "click #save" : function( e){
      var self = this
      this.model.destroy({

        error : function(){
          toastr["error"]("Электросчетчик не был удален","Ошибка")
        },

        success : function(){
          $(self.$el).modal('hide')
          self.is_delete = true
          self.collection.fetch()
        }

      })
    }
  }
})