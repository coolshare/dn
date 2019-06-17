import React, { Component } from 'react';
import CustomDiagram from './CustomDiagram';
import Editor from './Views/Editor'
import Reader from './Views/Reader'
import Dialog from './Views/Dialog'
import Tab from './Components/Tab'
import $ from 'jquery';
var beforeNavigatedAway = function () {
	saveStory()
};

window.addEventListener('beforeunload', beforeNavigatedAway, false);
window.addEventListener('unload', beforeNavigatedAway, false);



function saveStory(storyId) {
	var data = {
			fileName:storyId+".txt",
			filePath:"./temp/Stories/",
			fileContent:JSON.stringify(window.curState)
	}
	post( "http://73.71.159.185:12345", data);
	
}



function post(url, data){
	let self = this;

	var ttt = {
			  url:url,
			  type:"POST",			  
			  contentType:"application/json; charset=utf-8",
			  data:JSON.stringify(data),
			  dataType:"json",
			  success: function(res, textStatus, xhr){
				  debugger
			  }}
	$.ajax(ttt
		).fail(function(response) {			
			console.log('Error');
		});

}

class App extends Component {
  constructor(props) {
	  super(props)
	  this.state = {topView:"FlowDesign"}
	  window.app = this
  }
  refresh() {
	  this.setState({refresh:this.state.refresh!==true?true:false})
  }
  showDialog(content) {
	  this.setState({DialogContent:content})
  }
  switchView(v, node) {
	  this.setState({topView:v})
  }
  
  creatParagraph() {
	  return <div>
	  	PPPP
	  </div>
  }
  
  render() {
	  var tabProps = {
	    		"stlyle":{"height":"100%"},
	    		"container":this,
	    		"items": [
                     {
                         "name": "FlowDesign", "label": "Story Flow Design",
                         "isSelectedFun": function () {
                             return window.app.state.topView === "FlowDesign"
                         },
                         "handler": function () {
                        	 window.app.state.topView = "FlowDesign"
                        		 this.props.container.refresh()
                                 window.app.refresh()
                         },
                     },
                     {
                         "name": "StoryReader", "label": "Story Reader",
                         "isSelectedFun": function () {
                             return window.app.state.topView === "StoryReader"
                             
                         },
                         "handler": function () {
                        	 window.app.state.topView = "StoryReader"
                        		 this.props.container.refresh()
                                 window.app.refresh()
                         },
                     }
                 ]}
	  
    return (
      <div className="App">
      	{ 
      		this.state.DialogContent && <Dialog >{this.state.DialogContent}</Dialog>
      	}      	
        {
        	this.state.topView!=="Editor" && 
        	<header className="App-header">
          		<h3 className="App-title">Welcome to Store Builder</h3>
          		<div><button onClick={e=>{saveStory("StoryA")}}>Save</button></div>
          	</header>
        }
        {
        	this.state.topView!=="Editor" && 
          	<Tab {...tabProps}/>
        }
        {
          	this.state.topView==="FlowDesign"&&
          	<main className="main">
          		<CustomDiagram  app={this}/>
            </main>
        }
        {
        	this.state.topView==="Editor"&&<Editor app={this} />
        }
        {
        	this.state.topView==="StoryReader"&&<Reader app={this}/>
        }
      </div>
    );
  }
}

export default App;
