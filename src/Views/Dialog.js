import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Dialog extends Component {
	render() {
		return (
			<div className="DialogWrapper">
				<div style={{"position":"fixed", "zIndex":100, "background":"#000", "left":"0px", "top":"0px", "width": "100vw", "height":"100vh", "opacity":0.5}}></div>
				<div className="dlg" style={{"position":"fixed", "zIndex":101, "left":(window.innerWidth-600)/2+"px", "top":(window.innerHeight-500)/2+"px", "width":this.props.options.width||"600px", "height":this.props.options.height||"500px", "background":"#EEE", "borderRadius":"5px", "opacity":1.0}}>
						<div className="dlgHeader" style={{"background":"#90D7E9"}}>
							<div className="titleBar" style={{"padding":"5px", "background":"#90D7E9", "display":"flex", "justifyContent":"space-between","fontWeight":"bold"}} >
								<div style={{"float":"left"}}>{this.props.options.title||""}</div>
								{this.props.options.hideX!==true &&
									<div className="xBox" style={{"background":"#90D7E9", "float":"right", "width":"20px"}}>
										<FontAwesomeIcon onClick={(e)=>{window.app.showDialog()}} style={{color:'#000', fontWeight:'bold', float:'right', fontSize:'16px', cursor:'pointer', width:"20px", height:"20px"}} icon="window-close" />
									</div>
								}
							</div><br style={{"clear":"both"}}/>
						</div>
						<div className="dlgBody" style={{padding:"10px"}}>{this.props.children}</div>	
						<div style={{padding:"10px", display:"flex", adjustItems:"center", justifyContent:"center"}}>
							{this.props.options.hideOK!==true && <button onClick={(e)=>{window.app.showDialog();if (this.props.options.handleOK) this.props.options.handleOK.call(this)}} ref={(node)=>{window.app.okButton = node}} style={{width:"100px", marginRight:"20px"} }>OK</button>}
							{this.props.options.hideCancel!==true && <button onClick={(e)=>{window.app.showDialog();if (this.props.options.handleCancel) this.props.options.handleCancel.call(this)}} ref={(node)=>{window.app.cancelButton = node}} style={{width:"100px"} }>Cancel</button>}
						</div>	
				</div>
						
			</div>
		)
	}
}