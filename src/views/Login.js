import React, { Component } from 'react'
import "./index.css";
import "materialize-css/dist/css/materialize.min.css";
import FacebookLogin from 'react-facebook-login'
import { GoogleLogin } from 'react-google-login'
import {Redirect} from 'react-router-dom'

class Login extends Component 
{
	constructor()
	{
		super();
		this.state={
			isLogged: false
		}

		this.responseFacebook = this.responseFacebook.bind(this);
		this.responseGoogle = this.responseGoogle.bind(this);
		this.onFailure = this.onFailure.bind(this);
	}

	componentWillMount()
	{
		if (localStorage.getItem("fbData")|| localStorage.getItem("ggData"))
		{
			this.setState({isLogged:true})
		}
	}

	responseFacebook(response)
	{
		localStorage.setItem("fbData",JSON.stringify({
			token: response.token,
			email: response.email,
			name: response.name,
			picture: response.picture.data.url,
			social: 'fb'
		}))

		this.setState({isLogged: true})
	}

	responseGoogle(response)
	{
		localStorage.setItem("fbData",JSON.stringify({
			token: response.token,
			email: response.email,
			name: response.name,
			picture: response.picture.data.url,
			social: 'gg'
		}))

		this.setState({isLogged: true})
	}

	onFailure(error)
	{
		console.log(error);
	}
  	render()
  	{
  		if (this.state.isLogged)
  		{
  			return (<Redirect to="/Home/"/>)
  		}
	    return(
	      <div className="Login">
		     <div className="Login-box">
		     	<div className="card">
		     		<div className="card-content">
			     		<FacebookLogin
			     			appId="2928232207242844"
		                  autoload={ false }
		                  fields="name, email, picture.width(120)"
		                  callback={ this.responseFacebook }
		                  onFailure={ this.onFailure }
		                  textButton="Facebook"
		                  cssClass="waves-effect waves-light btn blue darken-2"
		                  icon="fa fa-facebook"/>
		      		</div>
		      	</div>
	     	</div>
	      </div>
    );
  }
}

export default Login;
		         //         <GoogleLogin
			     			// clientId="529009097214-ph2qjat568i6kj9srujgu3g8js251j4d.apps.googleusercontent.com"
		         //          	onSuccess={ this.responseGoogle }
		         //          	onFailure={ this.onFailure }
		         //          	cookiePolicy={'single_host_origin'}
		         //          />