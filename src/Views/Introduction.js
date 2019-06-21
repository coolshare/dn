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
				<li style={{paddingTop:"10px"}}>You can always right click at any paragraph in the diagram to bring up the context popup menu so that you can do edit, delete and so on.</li>
				<br/>
				<li style={{paddingTop:"10px"}}>You can also import your saved stories from local disk by clicking at "Import".</li>
				<li style={{paddingTop:"10px"}}>You can save all your stories on to the local disk by clicking at "Export".</li>
				<li style={{paddingTop:"10px"}}>Your story will also be saved remotely at the sever byt clicking at "Save"</li>	
				<li style={{paddingTop:"10px"}}>Your saved story will be loaded initially and listed in the dropdown at next to the "File" menu.</li>
				
				
				
			</ul>
		)
	}

}