import React, { Component } from 'react';
import CustomDiagram from './CustomDiagram';
import Editor from './Views/Editor'
import Reader from './Views/Reader'
import Dialog from './Views/Dialog'
import Tab from './Components/Tab'
import $ from 'jquery';

import { library } from '@fortawesome/fontawesome-svg-core';

import {faGlobe, faCog, faQuestion, faPen, faEnvelope, faEdit, faPlug, faUser, faArrowDown, faArrowLeft, faChartBar, faTable, faWrench, faPlus, faTrashAlt, faSave, faUpload,
	faDownload, faSignal, faArrowUp, faSync, faCaretDown, faWindowClose, faTimes } from '@fortawesome/free-solid-svg-icons';
library.add(faGlobe, faCog, faQuestion, faPen, faEnvelope, faEdit, faPlug, faUser, faArrowDown, faArrowLeft, faChartBar, faTable, faWrench, faPlus, faTrashAlt, faSave, faUpload,
	faDownload, faSignal, faArrowUp,  faSync, faCaretDown, faWindowClose, faTimes);

var beforeNavigatedAway = function () {
	//saveStory()
};

window.addEventListener('beforeunload', beforeNavigatedAway, false);
window.addEventListener('unload', beforeNavigatedAway, false);



window.saveStory = function(storyId) {
	storyId = storyId||window.curStory
	var data = {
			fileName:storyId+".txt",
			filePath:"./temp/Stories/",
			fileContent:JSON.stringify(window.curState)
	}
	post( "http://73.71.159.185:12345", data);
	
}


window.resetStory = function (storyId) {
	window.curState = [{"id":"_start_","type":"StartPoint","width":40,"height":40,"x":95,"y":94,"name":"Home"}]
	var data = {
			fileName:storyId+".txt",
			filePath:"./temp/Stories/",
			fileContent:JSON.stringify(window.curState)
	}
	post( "http://73.71.159.185:12345", data);
	window.location.reload()
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
  findAStory(entityMap) {
		return this.findNextSection(entityMap, entityMap["_start_"], [])
	}
	findNextSection(entityMap, node, path) {
		path.push(node)
		if (node.linksTo) {
			var index = 0
			if (node.linksTo.length>1) {
				index = Math.floor(Math.random()*node.linksTo.length)
			}
			var n = entityMap[node.linksTo[index].target]
			path = this.findNextSection(entityMap, n, path)
	
		}
		return path
	}
  refresh() {
	  this.setState({refresh:this.state.refresh!==true?true:false})
  }
  showDialog(content, options={}) {
	  var d = undefined
	  if (content!==undefined) {
		  d = Object.assign({}, {content:content, options})
	  }
	  this.setState({Dialog:d})
  }
  switchView(v, node) {
	  this.setState({topView:v})
  }
  
  handleTitleChange() {
	  window.app.okButton.disabled = this.titleInput.value.trim()===""
  }
  
  createParagraph() {
	  return <div>
	  	<div><div style={{display:"inline-block", width:"100px", paddingLeft:"7px", paddingRight:"7px"}}>Title</div><input ref={(node)=>{this.titleInput = node}} defaultValue={"Paragraph_"+new Date().valueOf()} onChange={(e)=>{window.app.handleTitleChange.call(this)}}/></div>
	  	<div style={{padding:"10px", display:"flex", adjustItems:"flex-start"}}><div style={{display:"inline-block", width:"100px", paddingRight:"7px"}}>Content</div><textarea  ref={(node)=>{this.contentTextarea = node}} style={{width:"450px", height:"350px"}}></textarea></div>
	  	
	  </div>
  }
  editParagraph(entity) {
	  return <div>
	  	<div><div style={{display:"inline-block", width:"100px", paddingLeft:"7px", paddingRight:"7px"}}>Title</div><input ref={(node)=>{this.titleInput = node}} defaultValue={entity.name} onChange={(e)=>{window.app.handleTitleChange.call(this)}}/></div>
	  	<div style={{padding:"10px", display:"flex", adjustItems:"flex-start"}}><div style={{display:"inline-block", width:"100px", paddingRight:"7px"}}>Content</div><textarea defaultValue={entity.content} ref={(node)=>{this.contentTextarea = node}} style={{width:"450px", height:"350px"}}></textarea></div>
	  	
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
                        	 window.pages = [window.entityMap["_start_"]]
                        	 
                        	 window.app.state.topView = "StoryReader"
                        		 this.props.container.refresh()
                                 window.app.refresh()
                         },
                     }
                 ]}
	  
    return (
      <div className="App">
      	{ 
      		this.state.Dialog && <Dialog options={this.state.Dialog.options}>{this.state.Dialog.content}</Dialog>
      	}      	
        {
        	this.state.topView!=="Editor" && 
        	<header className="App-header">
          		<h3 className="App-title">Welcome to Store Builder</h3>
          		<div><button onClick={e=>{window.saveStory("StoryA")}}>Save</button><button onClick={e=>{window.resetStory("StoryA")}}>Reset</button></div>
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
