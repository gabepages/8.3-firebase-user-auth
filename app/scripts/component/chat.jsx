var React = require('react');
var $ = require('jquery');

//fiebase ref



var Chat = React.createClass({
  getInitialState: function(){
    return(
      {
        'chatMessages': []
      }
    )
  },

  handleSubmit: function(event){

    event.preventDefault();
    var user = localStorage.getItem('username');
    var message = $('#message').val();
    this.messages.push({name: user, text: message});
    $('#message').val('');
  },
  componentWillMount: function (){
    this.messages = new Firebase('https://flickering-torch-4855.firebaseio.com/messages');
    this.messages.authWithCustomToken(localStorage.getItem('token'), function(error, authData) {
      if (error) {
        console.log("Authentication Failed!", error);
        alert('Sorry you are not signed in, therefore you cannot chat with your firends. go sign in to have a social life');
        this.props.router.navigate('', {trigger: true});
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });

    this.chatMessages =[];

    this.messages.on('child_added', function(data){
      this.chatMessages.push(data);
      this.setState({'chatMessages': this.chatMessages});
    }.bind(this));

  },

  componentDidMount: function(){
    this.forceUpdate();
  },
  render: function(){
    var messages = this.state.chatMessages.map(function(message){
      var msg = message.val();
      var className = 'others-message';
      var whoIsThis = msg.name;
      if(msg.name == localStorage.getItem('username')){
        className = 'own-message'
        whoIsThis= "Me"
      }
      return (
          <p key={message.key()} className={className} >
            {msg.text}
            <span className='name'>{whoIsThis}</span>
          </p>
      );
    });


    return (
      <div className="col-md-12">
        <h1>Logged in as: {localStorage.getItem('username')}</h1>
        <div className='chatroom col-md-12 well'>
            {messages}
        </div>
        <form onSubmit={this.handleSubmit} className='message-form'>
          <input type="text" className="form-control" id="message"  placeholder="Chat Here!" />
        </form>
      </div>


    );
  }
});

module.exports = Chat;
