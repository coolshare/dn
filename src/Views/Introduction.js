import React, { Component } from 'react';
import FlippingPages from 'flipping-pages'
/* IMPORTANT */
import '../css/FlippingPages.css'
import '../css/Reader.css'
import bg from "../images/bbb.gif"

export default class Introduction extends Component {
	render() {
		var self = this
		return (
			<ul style={{padding:"30px"}}>
				<li style={{paddingTop:"10px"}}>To start, first click at the "File" menu and then select "New" to create a new Story.</li>
				<li style={{paddingTop:"10px"}}>You can also load your saved stories from local disk by clicking at "Load".</li>
				<li style={{paddingTop:"10px"}}>You can save all your stories on to the local disk by clicking at "Save".</li>
				<li style={{paddingTop:"10px"}}>Your story will also be saved remotely at the sever. They will be loaded initially and
				listed in the dropdown at next to the "File" menu.</li>	
				
			</ul>
		)
	}

}