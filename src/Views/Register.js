import React, { Component } from 'react';
import FlippingPages from 'flipping-pages'
/* IMPORTANT */
import '../css/FlippingPages.css'
import '../css/Reader.css'
import bg from "../images/bbb.gif"

export default class Register extends Component {
	constructor(props) {
        super(props)

        
    }

	
	handleRegister() {
		var res = {user:this.userName.value, password:this.password.value}
		
		if (window.userMap[res.user]!==undefined) {
			alert("The user name has been used by others. Please enter a different one")
			return
		}
		window.users.push(res)
		window.post( window.homeUrl+"/save", {filePath:"./db/dn/user", fileName:"users.txt", "content":window.users}, function() {
			window.post( window.homeUrl+"/mkdir", {filePath:["./db/dn/stories/"+res.user]})
			window.app.switchView("Login")
		})
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
			    	<h5>Sign up</h5>
			    	<div >												
						 <div><input style={{margin:"7px"}} ref={(node)=>{this.userName=node}} placeholder="User Name"/></div>
						 <div><input style={{margin:"7px"}} ref={(node)=>{this.password=node}} onChange={e=>{this.enableButton()}} type="password" placeholder="Password"/></div>
						 <div><input style={{margin:"7px"}} ref={(node)=>{this.password2=node}} type="password" placeholder="Retype Password"/></div>
						 <div><button style={{margin:"7px"}} ref={(node)=>{this.RegisterButton=node}} onClick={e=>{this.handleRegister()}} >Register</button></div>
				   </div>
				</div>
			</div>
		)
	}
}