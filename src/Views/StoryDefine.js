import React, { Component } from 'react';
import FlippingPages from 'flipping-pages'
/* IMPORTANT */
import '../css/FlippingPages.css'
import '../css/Reader.css'
import bg from "../images/bbb.gif"

export default class StoryDefine extends Component {
	constructor(props) {
        super(props)

        
    }
	handleCreate() {
		
	}
	render() {
		var self = this
		return (
			<div  style={{height:"100%", display:"flex", justifyContent:"center",backgroundImage: `url(${bg})`}}>
				<div style={{display:"flex", justifyContent:"center", flexDirection:"column"}}>
			    	<h3>Welcome to Store Builder</h3>
			    	<h5>Please define your story</h5>
			    	<div >												
						 <div><input style={{margin:"7px"}} ref={(node)=>{this.userName=node}} placeholder="Story Name"/></div>
						 <div><textarea style={{margin:"7px"}} ref={(node)=>{this.password=node}}  placeholder="Description"></textarea></div>
						 <div><button style={{margin:"7px"}} ref={(node)=>{this.RegisterButton=node}} onClick={e=>{this.handleCreate()}} disabled>Create Story</button></div>
				   </div>
			
			    </div>
		    </div>
		)
	}

}