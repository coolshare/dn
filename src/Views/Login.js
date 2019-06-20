import React, { Component } from 'react';
import FlippingPages from 'flipping-pages'
/* IMPORTANT */
import '../css/FlippingPages.css'
import '../css/Reader.css'
import bg from "../images/bbb.gif"

export default class Login extends Component {
	constructor(props) {
        super(props)

        
    }


	handleLogin() {
		
	}
	
	handleSignUp() {
		window.app.switchView("Register")
	}
	
	enableButton() {
		this.RegisterButton.disabled = this.password.value.trim().length<1
	}
    
	render() {
		var self = this
		return (
			<div  style={{height:"100%", display:"flex", justifyContent:"center",backgroundImage: `url(${bg})`}}>
				<div style={{display:"flex", justifyContent:"center", flexDirection:"column"}}>
			    	<h3>Welcome to Store Builder</h3>
			    	<h5>Login</h5>
			    	<div >												
						 <div><input style={{margin:"7px"}} ref={(node)=>{this.userName=node}} placeholder="User Name"/></div>
						 <div><input style={{margin:"7px"}} ref={(node)=>{this.password=node}} type="password" placeholder="Password"/></div>
						 <div><button style={{margin:"7px"}} ref={(node)=>{this.RegisterButton=node}} onClick={e=>{this.handleLogin()}} disabled>Register</button><a href="javascript:void(0)" onClick={e=>{this.handleSignUp()}}>Sign up</a></div>
				   </div>
			
			    </div>
		    </div>
		)
	}

}