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
	handleOK() {
		var res = {name:this.storyName.value, description:this.description.value, entityMap:{}}
		if (res.name.trim().length===0) {
			window.alertBox("Please enter a name for your story", "Warning")
			return
		} else if (res.name.trim().length<2) {
			window.alertBox("Please enter a name with at least 2 characters for your story", "Warning")
			return
		}
		
		var firstSection = {"id":"_start_","type":"Paragraph","width":90,"height":60,"x":95,"y":94,"name":"Start Point"}
		res.entityMap[firstSection.id] = firstSection
		res.id = "ID"+new Date().valueOf()
		window.setCurStory(firstSection.id)
		window.addStory(res)
		window.app.refresh()
	}
	render() {
		var self = this
		return (
			<div  style={{height:"100%", display:"flex", justifyContent:"center"}}>
				<div style={{display:"flex", justifyContent:"center", flexDirection:"column"}}>
			    	<h3>Welcome to Story Builder</h3>
			    	<h5>Please define your story</h5>
			    	<div >												
						 <div><input style={{margin:"7px"}} ref={(node)=>{this.storyName=node}} placeholder="Story Name"/></div>
						 <div><textarea style={{margin:"7px"}} ref={(node)=>{this.description=node}}  placeholder="Description"></textarea></div>
						
				   </div>
			
			    </div>
		    </div>
		)
	}

}