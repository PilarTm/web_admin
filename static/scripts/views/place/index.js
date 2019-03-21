var mark_converters = new MARK_CONVERTER_COLLECTIONS
var model_converters = new MODEL_CONVERTER_COLLECTIONS


var mark_e_counters = new MARK_E_COUNTERS_COLLECTIONS
var model_e_counters = new MODEL_E_COUNTERS_COLLECTIONS

mark_converters.fetch()
model_converters.fetch()

mark_e_counters.fetch()
model_e_counters.fetch()


$(document).ready(function(){

  $('#jstree_demo_div').jstree({
    'core': {
      data : {

        'url' : function(node){
          if( node.id == "#" ){
            return "/api/place_jstree/"
          }else{
            return "/api/place_jstree/" + function(n){

              console.log( n.id )

              if( n.id.match(/place_([0-9]*)_places$/) ){
                var match = n.id.match(/place_([0-9]*)_places/)
                return match[1] + "/children_place"
              }else if( n.id.match(/place_([0-9]*)$/) ){
                var match = n.id.match(/place_([0-9]*)/)
                return match[1]
              }else if(n.id.match(/place_([0-9]*)_users/)){
                var match = n.id.match(/place_([0-9]*)_users/)
                return match[1] + "/users"
              }else if(n.id.match(/place_([0-9]*)_converters/)){
                var match = n.id.match(/place_([0-9]*)_converters/)
                return match[1] + "/converters"
              }else if(n.id.match(/place_([0-9]*)_e_counters/)){
                var match = n.id.match(/place_([0-9]*)_e_counters/)
                return match[1] + "/e_counters"
              }else if(n.id.match(/place_([0-9]*)_admins/)){
                var match = n.id.match(/place_([0-9]*)_admins/)
                return match[1] + "/admins"
              }else if(n.id.match(/place_([0-9]*)_reports/)){
                var match = n.id.match(/place_([0-9]*)_reports/)
                return match[1] + "/reports"
              }

              return 0

            }(node)
          }
        }
      },
      'themes': {
        'name': 'proton',
        'responsive': true
      },

    },
    'plugins': ['contextmenu'], 
    contextmenu: {
      items: function(node){

        console.log( node.id )

        if( node.id.match(/place_([0-9]*)$/) ){

          var match = node.id.match(/place_([0-9]*)/)

          return {
            "Rename": {
              "separator_before": false,
              "separator_after": false,
              "label": "Переименовать",
              "action": function (obj , c) {
                var place = new PLACE_MODEL({ id : Number(match[1]) })
                place.fetch({ success : function(){
                  new PLACE_MODEL_EDIT( place ,function(){
                    $('#jstree_demo_div').jstree(true).set_text( "place_" + match[1] , place.get('title') )
                  } )
                } })
              }
            },

            "Move": {
              "separator_before": true,
              "separator_after": false,
              "label": "Перенести",
              "action": function (obj) { 
                var place = new PLACE_MODEL({ id : Number(match[1]) })
                place.fetch({success : function(){
                  new PLACE_MODEL_MOVE( place , function(){
                    $("#place_" + Number(match[1]) ).remove()
                    $('#jstree_demo_div').jstree(false).load_node("place_" + place.get('place_id'))
                  } )
                }})
              }
            },

            "Remove": {
              "separator_before": true,
              "separator_after": false,
              "label": "Удалить",
              "action": function (obj) { 
                var place = new PLACE_MODEL({ id : Number(match[1]) })
                new PLACE_MODEL_DELETE( place , function(){
                  $("#place_" + Number(match[1]) ).remove()
                } )
              }
            }

          }
        }else if( node.id.match(/ecounters_([0-9]*)$/) ){
          return {
            "Rename": {
              "separator_before": false,
              "separator_after": false,
              "label": "Отвязать",
              "action": function (obj) { 
                tree.edit(node);
              }
            }

          }
        }else if( node.id.match(/converter_([0-9]*)$/) ){
          return {
            "Rename": {
              "separator_before": false,
              "separator_after": false,
              "label": "Отвязать",
              "action": function (obj) { 
                tree.edit(node);
              }
            }

          }
        }

        return {}
      }
    }
  })
})

$('#jstree_demo_div').bind("changed.jstree" , function(event , selected){
  if( selected.node.id.match(/place_([0-9]*)_places_add/) ){
    var id = selected.node.id.replace(/place_([0-9]*)_places_add/ , function(_ , id){
      return id
    })
    var place_new = new PLACE_MODEL({ place_id : Number(id) })
    new PLACE_MODEL_EDIT( place_new , function(){
      $('#jstree_demo_div').jstree(false).load_node("place_" + id + "_places")
    })
  }else if( selected.node.id.match(/place_([0-9]*)_users_register/) ){
    var id = selected.node.id.replace(/place_([0-9]*)_users_register/ , function(_ , id){
      return id
    })
    var user = new USER_MODEL({ place_id : Number(id) , is_registration : true })
    new USER_MODAL_REGISTARATION( user , function(){
      $('#jstree_demo_div').jstree(false).load_node("place_" + id + "_users")
    })
  }else if( selected.node.id.match(/place_([0-9]*)_admins_register/) ){
    var id = selected.node.id.replace(/place_([0-9]*)_admins_register/ , function(_ , id){
      return id
    })
    var user = new USER_MODEL({ place_id : Number(id) , is_registration : true , type : 1 })
    new USER_MODAL_REGISTARATION( user , function(){
      $('#jstree_demo_div').jstree(false).load_node("place_" + id + "_admins")
    })
  }else if( selected.node.id.match(/place_([0-9]*)_converters_add/) ){
    var id = selected.node.id.replace(/place_([0-9]*)_converters_add/ , function(_ , id){
      return id
    })
    var converter = new CONVERTER_MODEL({ place_id : Number(id) })
    new CONVERTER_MODAL_EDIT( converter , new CONVERTER_COLLECTIONS() , mark_converters , model_converters, function(){
      $('#jstree_demo_div').jstree(false).load_node("place_" + id + "_converters")
    })
  }else if( selected.node.id.match(/place_([0-9]*)_e_counters_add/) ){
    var id = selected.node.id.replace(/place_([0-9]*)_e_counters_add/ , function(_ , id){
      return id
    })
    var e_counter = new E_COUNTERS_MODEL({ place_id : Number(id) })
    new E_COUNTERS_MODAL_EDIT( e_counter , new E_COUNTERS_COLLECTIONS() , mark_e_counters , model_e_counters, function(){
      $('#jstree_demo_div').jstree(false).load_node("place_" + id + "_e_counters")
    } , concentrators)
  }else if( selected.node.id.match(/place_([0-9]*)_reports_(.*)/) ){
    window.location.pathname = selected.node.id.replace(/place_([0-9]*)_reports_(.*)/ , function(_,place_id , reports){
      return "/admin/places/" + place_id + "/reports/" + reports
    }) 
  }

})