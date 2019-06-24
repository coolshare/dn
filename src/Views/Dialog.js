import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Dialog extends Component {
	
	handleOK(e){
		if (this.props.options.handleOK) { 
			if (this.props.options.handleOK.call(this)!==true) {
				window.app.showDialog()
			}
		}
	}
	render() {
		var w = 600
		var ww = this.props.options.width
		if (ww) {
			var i = ww.indexOf("px")
			i = i>-1?i:ww.length
			w = parseInt(ww.substring(0, i))
		}
		return (
			<div className="DialogWrapper">
				<div style={{"position":"fixed", "zIndex":100, "background":"#000", "left":"0px", "top":"0px", "width": "100vw", "height":"100vh", "opacity":0.5}}></div>
				<div className="dlg" style={{"position":"fixed", "zIndex":101, "left":this.props.options.left||(window.innerWidth-w)/2+"px", "top":this.props.options.top||(window.innerHeight-500)/2+"px", "width":this.props.options.width||"600px", "height":this.props.options.height||"500px", "background":"#EEE", "borderRadius":"5px", "opacity":1.0}}>
						<div className="dlgHeader" style={{"background":"#90D7E9", height:"25px"}}>
							<div className="titleBar" style={{"padding":"5px", "background":"#90D7E9", "display":"flex", "justifyContent":"space-between","fontWeight":"bold"}} >
								<div style={{"float":"left"}}>{this.props.options.title||""}</div>
								{this.props.options.hideX!==true &&
									<div className="xBox" style={{"background":"#90D7E9", "float":"right", "width":"20px"}}>
										<FontAwesomeIcon onClick={(e)=>{window.app.showDialog()}} style={{color:'#000', fontWeight:'bold', float:'right', fontSize:'16px', cursor:'pointer', width:"20px", height:"20px"}} icon="window-close" />
									</div>
								}
							</div><br style={{"clear":"both"}}/>
						</div>
						<div className="dlgBody" style={{marginTop:"10px", padding:"10px"}}>{this.props.children}</div>	
						<div style={{padding:"10px", display:"flex", adjustItems:"center", justifyContent:"center"}}>
							{this.props.options.hideOK!==true && <button onClick={(e)=>{this.handleOK(e)}} ref={(node)=>{this.okButton = node}} style={{width:"100px", marginRight:"20px"} }>OK</button>}
							{this.props.options.hideCancel!==true && <button onClick={(e)=>{window.app.showDialog();if (this.props.options.handleCancel) this.props.options.handleCancel.call(this)}} ref={(node)=>{this.cancelButton = node}} style={{width:"100px"} }>Cancel</button>}
						</div>	
				</div>
						
			</div>
		)
	}
}