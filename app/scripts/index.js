var React = require('react');
var $ = require('jquery');
var ReactDOM = require('react-dom');
var Backbone= require('backbone');

//components
var Login = require('./component/login.jsx');
var SignUp = require('./component/signup.jsx');
var Chat = require('./component/chat.jsx');






/**********
Router
**********/

var Router = Backbone.Router.extend({
  routes: {
    '': "index",
    'login': "login",
    'chat(/:id)': "chat"
  },
  index: function(){
    this.current = '';
    ReactDOM.render(
      <SignUp router={this} />,
      $('.container')[0]
    );
  },
  login: function(){
    this.current='login';
    ReactDOM.render(
      <Login router={this} />,
      $('.container')[0]
    );
  },
  chat: function(){
    this.current='chat';
    ReactDOM.render(
      <Chat router={this} />,
      $('.container')[0]
    );
  }
});


var router = new Router();


Backbone.history.start();
