var USER_MODEL = Backbone.Model.extend({
  
  defaults : {
    id : 0,
    email : "",
    password : "",
    type : 0,
    is_registration : false
  },

  url : function(){
    return "/api/user/" + this.get('id')
  },
  parse : function( resp ){
    if( resp.is_registration ){
      resp.is_registration = is_registration
      resp.repeatpassword = ""
    }
    return resp
  },


  validate : function(){
    if( this.get('is_registration') ){
      if( !this.__validate_password() ){
        return "password empty"
      }
      if( !this.__validate_equls_passwords() ){
        return "password not equals"
      }
    }
  },

  __validate_email : function(){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(this.get('email')).toLowerCase());
  },

  __validate_password : function(){
    return this.get('password') != ""
  },

  __validate_equls_passwords : function(){
    return this.get('password') == this.get('repeatpassword')
  }
})