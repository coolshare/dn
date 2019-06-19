import React, { Component } from 'react';
import CustomDiagram from './CustomDiagram';
import Reader from './Views/Reader'
import Dialog from './Views/Dialog'
import Tab from './Components/Tab'
import $ from 'jquery';
import './css/Reader.css'

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
window.storyId = "StoryA"


window.saveStory = function(storyId) {
	
	storyId = storyId||window.curStory
	var data = {
			fileName:storyId+".txt",
			filePath:"./temp/Stories/",
			fileContent:JSON.stringify(window.curState)
	}
	post( "http://73.71.159.185:12345", data);
	
}

window.saveToDisk = function(storyId) {
	storyId = storyId||window.curStory
	var FileSaver = require('file-saver');
	var blob = new Blob([JSON.stringify(window.curState)], {type: "text/plain;charset=utf-8"});
	FileSaver.saveAs(blob, storyId+".txt");

	
}


window.dispFile = function(contents) {
	window.curState = JSON.parse(contents)
	window.entityMap = {}
	for (var i=0; i<window.curState.length; i++) {
		var item = window.curState[i]
		window.entityMap[item.id] = item
	}
	window.app.customDiagram.refresh()
}
window.clickElem = function(elem) {
	// Thx user1601638 on Stack Overflow (6/6/2018 - https://stackoverflow.com/questions/13405129/javascript-create-and-save-file )
	var eventMouse = document.createEvent("MouseEvents")
	eventMouse.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
	elem.dispatchEvent(eventMouse)
}
window.openFile = function(func) {
	var readFile = function(e) {
		var file = e.target.files[0];
		if (!file) {
			return;
		}
		var reader = new FileReader();
		reader.onload = function(e) {
			var contents = e.target.result;
			fileInput.func(contents)
			document.body.removeChild(fileInput)
		}
		reader.readAsText(file)
	}
	var fileInput = document.createElement("input")
	fileInput.type='file'
	fileInput.style.display='none'
	fileInput.onchange=readFile
	fileInput.func=func
	document.body.appendChild(fileInput)
	window.clickElem(fileInput)
}


window.createStory = function (storyId) {
	window.app.showDialog(window.app.createStoryContent(), {top:"10px", width:"920px", height:"650px", title:"Create a Story", hideX:true, handleOK:function() {
		debugger
	}})
		
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
  
  handleShowSelect(e) {
	  window.branchingLogicSelection = e.target.id
  }
  
  handleTitleChange() {
	  window.app.okButton.disabled = this.titleInput.value.trim()===""
  }
  showBranchingLogic(node){
	  var selections = []
	  for (let i=0; i<4; i++) {
		  var exist = node.branchingLogic?node.branchingLogic.selections[i]:{}
		  if (exist.selection===undefined) {
			  continue
		  }
		  selections.push(<div style={{padding:"10px"}}><input id={exist.branch} ref={(node)=>{this["selection_"+i]}} onClick={(e)=>{this.handleShowSelect(e)}} type="radio" name="selection"/>{(exist.selection)}</div>)
	  }
	  return <div>
	  	<h3 style={{padding:"20px"}}>{node.branchingLogic.question}</h3>
	  	<ul>{selections}</ul>
	  	
	  </div>
  }
  
  handleBranchingLogic() {
	  var node = window.app.selectedEnity
	  var selections = []
	  var dd = ["A", "B", "C", "D"]
	  for (let i=0; i<4; i++) {
		  var exist = node.branchingLogic?node.branchingLogic.selections[i]:{}
		  selections.push(<ul><li>{"Selection "+(dd[i])}</li><span>If select:</span><input defaultValue={exist.selection} style={{marginRight:"10px"}} ref={(node)=>{this["selectionInput_"+i] = node}} /><span style={{marginLeft:"10px"}}>go to</span>
		  	<select defaultValue={exist.branch} ref={(node)=>{this["branchSelect_"+i] = node}} ><option value="_RANDOM_">Randomly selected one</option>
		  		{
		  			node.linksTo.map((link, idx)=>{
		  				var n = window.entityMap[link.target]
		  				return <option value={n.id}>{n.name}</option>
		  			})
		  		}
		  		</select>
		  </ul>)
	  }
	  return <div>
	  	<div><div style={{display:"inline-block", width:"100px", paddingLeft:"7px", paddingRight:"7px"}}>Question:</div><input style={{marginLeft:"10px", width:"400px"}} ref={(node)=>{this.questionInput = node}} defaultValue={node.branchingLogic && node.branchingLogic.question||""} /></div>
	  	<div>{selections}</div>
	  	
	  </div>
  }
  
  createStoryContent() {
	  return <div >
	  	<div style={{marginBottom:"5px"}}><div style={{display:"inline-block", width:"100px", paddingLeft:"7px", paddingRight:"7px"}}>Title</div><input style={{width:"300px"}} ref={(node)=>{this.titleInput = node}} defaultValue={"Paragraph_"+new Date().valueOf()} onChange={(e)=>{window.app.handleTitleChange.call(this)}}/></div>
	  	<div  className="book1" style={{display:"flex", justifyContent:"space-between", width:"900px", padding:"10px", display:"flex", adjustItems:"flex-start"}}>
	  		<textarea className="textarea" ref={(node)=>{this.contentTextarea1 = node}} style={{float:"left",margin:"30px", width:"380px", height:"400px"}}></textarea>
	  		<textarea  className="textarea" ref={(node)=>{this.contentTextarea2 = node}} style={{float:"right", margin:"30px", width:"380px", height:"400px"}}></textarea>
	  	</div>
	  </div>
  }
  createParagraph() {
	  return <div >
	  	<div style={{marginBottom:"5px"}}><div style={{display:"inline-block", width:"100px", paddingLeft:"7px", paddingRight:"7px"}}>Title</div><input style={{width:"300px"}} ref={(node)=>{this.titleInput = node}} defaultValue={"Paragraph_"+new Date().valueOf()} onChange={(e)=>{window.app.handleTitleChange.call(this)}}/></div>
	  	<div  className="book1" style={{display:"flex", justifyContent:"space-between", width:"900px", padding:"10px", display:"flex", adjustItems:"flex-start"}}>
	  		<textarea className="textarea" ref={(node)=>{this.contentTextarea1 = node}} style={{float:"left",margin:"30px", width:"380px", height:"400px"}}></textarea>
	  		<textarea  className="textarea" ref={(node)=>{this.contentTextarea2 = node}} style={{float:"right", margin:"30px", width:"380px", height:"400px"}}></textarea>
	  	</div>
	  </div>
  }
  editParagraph(entity) {
	  return <div >
	  	<div style={{marginBottom:"5px"}}><div style={{display:"inline-block", width:"100px", paddingLeft:"7px", paddingRight:"7px"}}>Title</div><input style={{width:"300px"}} ref={(node)=>{this.titleInput = node}} defaultValue={entity.name} onChange={(e)=>{window.app.handleTitleChange.call(this)}}/></div>
	  	<div  className="book1" style={{display:"flex", justifyContent:"space-between", width:"900px", padding:"10px", display:"flex", adjustItems:"flex-start"}}>
	  		<textarea className="textarea"  ref={(node)=>{this.contentTextarea1 = node}} style={{float:"left",margin:"30px", width:"380px", height:"400px"}}>{entity.content1}</textarea>
	  		<textarea className="textarea"  ref={(node)=>{this.contentTextarea2 = node}} style={{float:"right", margin:"30px", width:"380px", height:"400px"}}>{entity.content2}</textarea>
	  	</div>
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
          		<div>
          			<button onClick={e=>{window.saveToDisk(window.storyId)}} style={{marginLeft:"20px", marginRight:"20px"}}>Save Story</button>
          			<button onClick={e=>{window.openFile(window.dispFile)}} style={{marginLeft:"20px", marginRight:"20px"}}>Load Story</button>
          			<button onClick={e=>{window.createStory(window.storyId)}} style={{marginLeft:"20px", marginRight:"20px"}}>New Story</button></div>
          	</header>
        }
        {
        	this.state.topView!=="Editor" && 
          	<Tab {...tabProps}/>
        }
        {
          	this.state.topView==="FlowDesign"&&
          	<main className="main">
          		<CustomDiagram  ref={(node)=>{this.customDiagram = node}}/>
            </main>
        }
        {
        	this.state.topView==="StoryReader"&&<Reader app={this}/>
        }
      </div>
    );
  }
}

export default App;
