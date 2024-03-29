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
		var user = this.userName.value
		var password = this.password.value
		var u = window.userMap[user]
		if (u!==undefined && u.password===password) {
			window.setCurUser(user)
			window.addUser({user:user, storyMap:{}})
			window.post( window.homeUrl+"/mkdir", {filePath:["./db/dn/stories/"+window.getUser().user]}, function() {
				  
				window.loadStories(function(){
					window.app.switchView("MainView")
				})
				  
			})
			
			
		} else {
			if (u===undefined) {
				window.alertBox("Wrong user name", "Warning")
			} else {
				window.alertBox("Wrong password", "Warning")
			}
			
		}
	}
	
	handleSignUp() {
		window.app.switchView("Register")
	}
	
	enableButton() {
		this.RegisterButton.disabled = this.password.value.trim().length<1
	}
	handleKeyDown(e) {
		if (e.which===13) {
			this.handleLogin()
		}
	}
	render() {
		var self = this
		return (
			<div  style={{height:"100%", display:"flex", justifyContent:"center",backgroundImage: `url(${bg})`}}>
				<div style={{display:"flex", justifyContent:"center", flexDirection:"column"}}>
			    	<h3>Welcome to Story Builder</h3>
			    	<h5>Login</h5>
			    	<div >												
						 <div><input style={{margin:"7px"}} ref={(node)=>{this.userName=node}} placeholder="User Name"/></div>
						 <div><input style={{margin:"7px"}} ref={(node)=>{this.password=node}} onKeyUp={e=>this.handleKeyDown(e)} type="password" placeholder="Password"/></div>
						 <div><button style={{margin:"7px"}} ref={(node)=>{this.RegisterButton=node}} onClick={e=>{this.handleLogin()}}>Login</button><a href="javascript:void(0)" onClick={e=>{this.handleSignUp()}}>Sign up</a></div>
				   </div>
			
			    </div>
		    </div>
		)
	}

}