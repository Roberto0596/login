import React, { Component } from 'react'
import "./index.css"
import { Redirect } from 'react-router-dom'

class Home extends Component
 {
	constructor()
	{
		super();
		this.state={
			profileImage: '',
			fullName:'',
			isLogout: false,
		}
		this.onLogout = this.onLogout.bind(this);
	}


	onLogout(e)
	{
		localStorage.clear();
		this.setState({
			isLogout:true
		})
	}

	componentWillMount()
	{
		let fData = JSON.parse(localStorage.getItem("fbData"));
		let gData = JSON.parse(localStorage.getItem("ggData"));

		if (!fData&& !gData)
		{
			this.setState({
				isLogout:true
			})
		}
		if (fData)
		{
			this.setState({
				profileImage: fData.picture, 
				fullName: fData.name
			})
		}
		else if (gData)
		{
			this.setState({
				profileImage: gData.picture, 
				fullName: gData.name
			})
		}
	}

 	render()
 	{
 		if (this.state.isLogout)
 		{
 			return(<Redirect to="/"/>)
 		}
	    return(
	      <div className="Home">
	        <nav>
		        <div className="nav-wrapper">
			        <a className="brand-logo">Logo</a>
			        <ul id="nav-mobile" className="right hide-on-med-and-down">
						<li>{ this.state.fullName }</li>
						<li><img className="circle Home-avatar" src={ this.state.profileImage } alt="profile"/></li>
			        	<li>
			        		<i onClick={this.onLogout} className="Home-logout fa fa-power-off"></i>
			        	</li>
			        </ul>
		        </div>
	        </nav>
	      </div>
	    );
  }
}

export default Home;
