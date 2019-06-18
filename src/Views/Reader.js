import React, { Component } from 'react';
import FlippingPages from 'flipping-pages'
/* IMPORTANT */
import '../css/FlippingPages.css'
import bg1 from '../images/bg1.png';

export default class Reader extends Component {
	constructor(props) {
        super(props)
        this.state = {
            selected: 1,
        }
        this.references = {}
        this.handleSelectedChange = this.handleSelectedChange.bind(this)
        this.previous = this.previous.bind(this)
        this.next = this.next.bind(this)
        
    }
	componentDidMount(){

	}
	handleMouseMove(e) {
		var x = e.clientX
		if (x>window.innerWidth/2+100) {
			if (window.pages[window.pages.length-1].linksTo===undefined && this.state.selected  === window.pages.length || this.state.selected  === window.pages.length+1) {
				e.target.style.cursor = "default"
				return
			}
			e.target.style.cursor = "e-resize"
		} else if (x<window.innerWidth/2-100) {
			if (this.state.selected<2) {
				e.target.style.cursor = "default"
				return
			}
			e.target.style.cursor = "w-resize"
		} else {
			e.target.style.cursor = "default"
		}
	}
	
	handleClick(e) {
		var x = e.clientX
		if (x>window.innerWidth/2+100) {
			if (window.pages[window.pages.length-1].linksTo===undefined && this.state.selected  === window.pages.length || this.state.selected  === window.pages.length+1) {
				return
			}
			this.next.call(this)
		} else if (x<window.innerWidth/2-100) {
			if (this.state.selected<2) {
				return
			}
			this.previous.call(this)
		}
	}
	
	handleSelectedChange(selected) {
        this.setState({selected})
    }

    previous() {
        this.setState(state => ({
            selected: state.selected - 1
        }))
    }

    next() {
    	var node = window.pages[window.pages.length-1]
    	if (this.state.selected+1>window.pages.length) {
    		if (node.linksTo===undefined) {
        		return
        	}
        	var index = 0
        	if (node.linksTo.length>1) {
        		if (node.branchingLogic) {
        			window.app.showDialog(window.app.showBranchingLogic.call(window.app, node), {title:"Please select one", hideX:true, height:"400px", handleOK:function() {
        				debugger
        				var n = window.entityMap[window.branchingLogicSelection]
        				if (n) {
        					window.pages.push(n)
            	    		var n = window.entityMap[node.linksTo[index].target]
            				window.pages.push(n)
        				} else {
        					index = Math.floor(Math.random()*node.linksTo.length)
        					var n = window.entityMap[node.linksTo[index].target]
        					window.pages.push(n)
        				}
        	    		
        			}})
        			return
        		} else {
        			index = Math.floor(Math.random()*node.linksTo.length)
        		}
        	} 
    		var n = window.entityMap[node.linksTo[index].target]
    		window.pages.push(n)
    	}
    	

        this.setState(state => ({
            selected: state.selected + 1
        }))
    }

    
	render() {
		var self = this
		return <div style={{"height":"650px", "width":"1000px", paddingTop:"10px", paddingBottom:"10px"}} onClick={(e)=>{this.handleClick(e)}} onMouseMove={(e)=>{this.handleMouseMove(e)}}>
				<button style={{margin:"10px"}}
			        onClick={this.previous}
			        disabled={this.state.selected<2}
			    	>Previous</button>
			    <button
			        onClick={this.next}
			        disabled={window.pages[window.pages.length-1].linksTo===undefined && this.state.selected  === window.pages.length || this.state.selected  === window.pages.length+1}
			    	>Next</button>
    		<FlippingPages
			        className="App-pages"
			        direction="horizontal"
			        selected={this.state.selected}
			        onSelectedChange={this.handleSelectedChange}
			        /* touch-action attribute is required by pointer events
			        polyfill */
			        touch-action="none"
			    > {
			    	window.pages.map((page, idx)=>{
			    		return (<div key={idx} style={{width:"900px", height:"650px", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundImage: `url(${bg1})`}}>
			    			<h3 style={{paddingLeft:"80px", paddingTop:"30px"}} ref={(node)=>{self.references["title_"+idx]=node}}>{page.name}</h3>
			    			<p  style={{paddingLeft:"80px", paddingTop:"30px"}} ref={(node)=>{self.references["content_"+idx]=node}}>{page.content||"[Content of "+page.name+"]"}</p>
			    		</div>)
			    	})
			    }			       
			    </FlippingPages>
			    {/* Buttons are required for keyboard navigation */}
			    <button  style={{margin:"10px"}}
			        onClick={this.previous}
			        disabled={this.state.selected<2}
			    >Previous</button>
			    <button 
			        onClick={this.next}
			        disabled={window.pages[window.pages.length-1].linksTo===undefined && this.state.selected  === window.pages.length || this.state.selected  === window.pages.length+1}
			    >Next</button>
		</div>
	}
}