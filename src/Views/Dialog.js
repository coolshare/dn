import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Dialog extends Component {
	render() {
		return (
			<div>
				<div style={{"position":"fixed", "zIndex":100, "background":"#000", "left":"0px", "top":"0px", "width": "100vw", "height":"100vh", "opacity":0.5}}></div>
				<div style={{"position":"fixed", "zIndex":101, "left":(window.innerWidth-600)/2+"px", "top":(window.innerHeight-500)/2+"px", "width":"600px", "height":"500px", "background":"#EEE", "border-radius":"5px", "opacity":1.0}}>
						<div className="dlgHeader" style={{"background":"#90D7E9"}}>
							<div className="titleBar" style={{"padding":"5px", "background":"#90D7E9", "display":"flex", "justifyContent":"space-between","fontWeight":"bold"}} >
								<div style={{"float":"left"}}>{this.props.title}</div>
								<div className="xBox" style={{"background":"#90D7E9", "float":"right", "width":"20px"}}>
								<FontAwesomeIcon onClick={()=>{window.app.showDialog()}} style={{color:'#000', fontWeight:'bold', float:'right', fontSize:'16px', cursor:'pointer', width:"20px", height:"20px"}} icon="window-close" />
								</div>
								</div><br style={{"clear":"both"}}/>
							</div>
							
							
						</div>
						<div >{this.props.children}</div>
			</div>
		)
	}
}