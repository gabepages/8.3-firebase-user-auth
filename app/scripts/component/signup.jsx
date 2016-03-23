var React = require('react');
var $ = require('jquery');

//fiebase ref
var ref = new Firebase('https://flickering-torch-4855.firebaseio.com/');


var SignUp = React.createClass({
  handleSubmit: function(event){
    event.preventDefault();
    var email = $('#SU-email').val();
    var password = $('#SU-password').val();

    //creating user on firebase
    ref.createUser({
      'email'    : email,
      'password' : password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
        alert("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
        this.props.router.navigate('login', {trigger: true});
      }
    }.bind(this));


    $('#SU-email').val('');
    $('#SU-password').val('');

  },

  sendToLogin: function(){
    event.preventDefault();
    this.props.router.navigate('login', {trigger: true});
  },
  render: function(){
    return(
      <div className="sign-up col-md-12">
        <h1>New Here? Please Sign Up</h1>
        <form action="" className="sign-up-form">
          <input type="email" className="form-control" id="SU-email" placeholder="Email" required="" />
          <input type="password" className="form-control" id="SU-password" placeholder="Password" required="" />
          <button type="submit" onClick={this.handleSubmit} className="btn btn-success button SU-btn">Sign Up</button>
          <button type="submit" onClick={this.sendToLogin} className="btn btn-primary button L-btn">Login</button>
        </form>
      </div>
    );
  }

});

module.exports= SignUp;
