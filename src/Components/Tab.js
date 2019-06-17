import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../css/Tab.css';

export default class Tab extends React.Component{
	constructor(props) {
		super(props);
	}
	refresh() {
		  this.setState({refresh:this.refresh!==true?true:false})
	  }
    render() {
    	var self = this
    	var background = "#EEE"
    	if (this.props.backgroundTop) {
    		background = this.props.backgroundTop
    	}
		var cellContainerStyle = Object.assign({"marginBottom":"0px", "background":background}, this.props.cellContainerStyle, this.props.cellContainerStyleFun!==undefined?this.props.cellContainerStyleFun.call(this):{})
		var list = this.props.items||[]
        return (
        	<ul className="tabrow" style={cellContainerStyle}>
        	{
        		list.map((item, idx)=>{
        			if (item.showFun && item.showFun.call(self)!==true) {
        				return null
        			}
        			var cn = item.isSelectedFun && item.isSelectedFun.call(self)===true?"selected":""
        			var label = item.label
        			if (item.labelFun) {
        				label = item.labelFun.call(this)
        			}
        			var itemStyle = {}
        			
        			if (item.closeFun===undefined) {
        				itemStyle.paddingRight = "15px"
        			}
        			var disabled = false
        			if (item.disableFun) {
        				disabled = item.disableFun.call(self)
        			}
        			var pp = {"style":{}}
        			if (disabled!==true) {
        				pp.onClick  = e=>{
        					
        					item.handler.call(self)
        				}
        			} else {
        				pp.style.cursor = "no-drop"
        				pp.style.color = "#BBB"
        			}
        			return <li key={idx} className={cn} style={itemStyle}><a href="#" {...pp}>{label}</a>        				
        			</li>
        		})
        	}
        	</ul>
        );
    }
}


