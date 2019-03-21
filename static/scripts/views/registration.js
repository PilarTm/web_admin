var REGISTRATION_VIEW = Backbone.View.extend({
  el : "#registrationForm",

  initialize : function( model ){
    this.model = model
    this.listenTo( this.model , "change:email" , this.email_valid_is_true )
    this.listenTo( this.model , "change:password" , this.password_valid_is_true )
    this.listenTo( this.model , "change:repeatpassword" , this.repeatpassword_valid_is_true )
    this.listenTo( this.model , "change" , this.btn_status )
    this.btn_status()
  },

btn_status : function(){
  __class = this.model.isValid() ? "btn btn-accent" : "btn btn-default disabled"
  $("#register_action").attr('class' , __class)

},

  email_valid : function(){
    var action = !this.model.__validate_email() ? "addClass"  :"removeClass"
    $("#email_label")[action]("has-error")
  },

  email_valid_is_true : function(){
    if( this.model.__validate_email() ){
      $("#email_label").removeClass("has-error")
    }
  },
  password_valid_is_true : function(){
    if( this.model.__validate_password() ){
      $("#password_label").removeClass("has-error")
    }
  },
  repeatpassword_valid_is_true : function(){
    if( this.model.__validate_equls_passwords() ){
      $("#repeatpassword_label").removeClass("has-error")
    }
  },

  events : {
    "keyup #email" : function(e){
      this.model.set("email" , $(e.target).val())
    },
    "paste #email" : function(e){
      this.model.set("email" , $(e.target).val())
    },
    "keyup #password" : function(e){
      this.model.set("password" , $(e.target).val())
    },
    "keyup #repeatpassword" : function(e){
      this.model.set("repeatpassword" , $(e.target).val())
    },
    "blur #email" : function(e){
      this.email_valid()
    },
    "blur #password" : function(e){
      if( !this.model.__validate_password() ){
        $("#password_label").addClass("has-error")
      }
    },
    "blur #repeatpassword" : function(e){
      if( !this.model.__validate_equls_passwords() ){
        $("#repeatpassword_label").addClass("has-error")
      }
    },
    "click #register_action": function(){
      if( !this.model.isValid() ){
        return false;
      }
    }
  }
})
$(document).ready(function(){
  new REGISTRATION_VIEW(new USER_MODEL({is_registration : true}))
})