var React = require('react');
var $ = require('jquery');

//fiebase ref
var ref = new Firebase('https://flickering-torch-4855.firebaseio.com/');


var Login = React.createClass({
  getInitialState: function(){
    return({
        userEmail: ''
    });
  },

  handleSubmit: function(event){
    event.preventDefault();
    var email = $('#L-email').val();
    var password = $('#L-password').val();
    ref.authWithPassword({
      'email'    : email,
      'password' : password
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
        alert("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        localStorage.setItem('username', authData.password.email);
        console.log(localStorage.getItem('username'));
        localStorage.setItem('token', authData.token);
        this.props.router.navigate('chat', {trigger: true});
      }
    }.bind(this));

  },



  render: function(){
    return(
      <div className="login col-md-12">
        <h1>Login</h1>
        <form action="" className="login-form">
          <input type="email" className="form-control" id="L-email" placeholder="Email" />
          <input type="password" className="form-control" id="L-password" placeholder="Password" />
          <button type="submit" onClick={this.handleSubmit} className="btn btn-primary button login-btn">Login</button>
        </form>
      </div>
    );
  }
});






module.exports= Login;
