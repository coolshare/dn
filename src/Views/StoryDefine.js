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
		var res = {name:this.storyName.value, description:this.description.value}
		if (res.name.trim().length===0) {
			alert("Please enter a name for your story")
			return
		} else if (res.name.trim().length<2) {
			alert("Please enter a name with at least 2 characters for your story")
			return
		}
		window.curStory = res
		window.curStory.sections = [{"id":"_start_","type":"Paragraph","width":40,"height":40,"x":95,"y":94,"name":"StartPoint"}]
		window.curStory.id = "ID"+new Date().valueOf()
	}
	render() {
		var self = this
		return (
			<div  style={{height:"100%", display:"flex", justifyContent:"center",backgroundImage: `url(${bg})`}}>
				<div style={{display:"flex", justifyContent:"center", flexDirection:"column"}}>
			    	<h3>Welcome to Store Builder</h3>
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