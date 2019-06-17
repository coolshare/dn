import React, { Component } from 'react';

export default class Dialog extends Component {
	render() {
		return <div>
			<div style={{"position":"fixed", "zIndex":100, "background":"#000", "left":"0px", "top":"0px", "width": "100vw", "height":"100vh", "opacity":0.5}}></div>
			<div style={{"position":"fixed", "zIndex":101, "left":(window.innerWidth-600)/2+"px", "top":(window.innerHeight-500)/2+"px", "width":"600px", "height":"500px", "background":"#EEE", "border-radius":"5px", "opacity":1.0}}>{this.props.children}</div>
		</div>
	}
}