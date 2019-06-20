import React, { Component } from 'react';
import CustomDiagram from './CustomDiagram';
import Reader from './Views/Reader'
import Login from './Views/Login'
import StoryDefine from './Views/StoryDefine'
import Register from './Views/Register'
import Dialog from './Views/Dialog'
import Tab from './Components/Tab'
import $ from 'jquery';
import './css/Reader.css'
import bg from "./images/bbb.gif"

import { library } from '@fortawesome/fontawesome-svg-core';

import {faGlobe, faCog, faQuestion, faPen, faEnvelope, faEdit, faPlug, faUser, faArrowDown, faArrowLeft, faChartBar, faTable, faWrench, faPlus, faTrashAlt, faSave, faUpload,
	faDownload, faSignal, faArrowUp, faSync, faCaretDown, faWindowClose, faTimes } from '@fortawesome/free-solid-svg-icons';
library.add(faGlobe, faCog, faQuestion, faPen, faEnvelope, faEdit, faPlug, faUser, faArrowDown, faArrowLeft, faChartBar, faTable, faWrench, faPlus, faTrashAlt, faSave, faUpload,
	faDownload, faSignal, faArrowUp,  faSync, faCaretDown, faWindowClose, faTimes);

var beforeNavigatedAway = function () {
	//saveStory()
};
window.homeUrl = "http://73.71.159.185:12345"
window.userPath = "./db/dn/user/"
window.storyPath = encodeURIComponent("./db/dn/stories/")
window.addEventListener('beforeunload', beforeNavigatedAway, false);
window.addEventListener('unload', beforeNavigatedAway, false);
window.storyId = "StoryA"

window.addEventListener("click", function(e) {
	if (e.target===window.app.dropdown) {
		return
	}
	window.showDD.call(window.app)
})

window.loadUser = function () {
	var url = window.homeUrl+"?filePath="+window.userPath+"&fileName=users.txt"
	window.get(url, function(res){
		window.users = res
		window.userMap = {}
		for (var i=0; i<window.users.length; i++) {
			var item = window.users[i]
			window.userMap[item.id] = item
		}
	})
}

window.saveStory = function(storyId) {
	
	storyId = storyId||window.curStory
	var data = {
			fileName:storyId+".txt",
			filePath:"./temp/Stories/",
			content:JSON.stringify(window.curState)
	}
	window.post( window.homeUrl+"/save", data);
	
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

window.initServer = function(response) {
	window.post( window.homeUrl+"/mkdir", {filePath:["./db", "./db/dn", "./db/dn/stories", "./db/dn/user"]}, function() {
		if (response) {
			response()
		}
	})
}
window.createStory = function (storyId) {
	window.app.showDialog(window.app.createStoryContent(), {top:"10px", width:"920px", height:"650px", title:"Create a Story", hideX:true, handleOK:function() {
		debugger
	}})
		
	window.curState = [{"id":"_start_","type":"StartPoint","width":40,"height":40,"x":95,"y":94,"name":"Home"}]
	var data = {
			fileName:storyId+".txt",
			filePath:"./temp/Stories/",
			content:JSON.stringify(window.curState)
	}
	window.post( window.homeUrl+"/save", data);
	window.location.reload()
}
window.showDD = function(show){
	var dd = this.dd
	if (dd===undefined) {
		return
	}
	if (show) {
		var r = this.dropdown.getBoundingClientRect()
		
		dd.style.top = r.top+r.height +"px"
		dd.style.left = (r.left+50)+"px"
		dd.style.width = dd.style.width|| (r.width +"px")
	}
			
	if (dd) {
		dd.style.display = show===true?"block":"none"
	}
}


window.post = function(url, data, response){
	let self = this;

	var ttt = {
			  url:url,
			  type:"POST",			  
			  contentType:"application/json; charset=utf-8",
			  data:JSON.stringify(data),
			  dataType:"json",
			  success: function(res, textStatus, xhr){
				  if (response) {
					  response(res)
				  }
			  }}
	$.ajax(ttt
		).fail(function(res2) {	
			if (res2.statusText==="OK") {
				if (response) {
					  response(res2)
				  }
			} else {
				console.log('Error');
			}
			
		});

}

class App extends Component {
  constructor(props) {
	  super(props)
	  this.state = {topView:"Login"}
	  window.app = this
  }
  
  componentDidMount() {
	  window.initServer(function() {
		  window.post( window.homeUrl+"/create", {filePath:"./db/dn/user", fileName:"users.txt", "content":[]}, function() {
	  
			  window.loadUser()
		  })
	  })
	  
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
      <div className="App" style={{height:"100vh", backgroundImage: `url(${bg})`}}>
      	{this.state.topView!=="Login"&&this.state.topView!=="Register" &&this.state.topView!=="StoryDefine" &&
	    	  <div>
		      	{ 
		      		this.state.Dialog && <Dialog options={this.state.Dialog.options}>{this.state.Dialog.content}</Dialog>
		      	}      	
		
		    	<h3 className="App-title">Welcome to Store Builder</h3>
		    	<div><div ref={(node)=>{this.dropdown=node}} style={{cursor:"pointer", textAlign:"center", paddingLeft:"25px", paddingRight:"25px", width:"30px", background:"#ccc", border: "solid 1px #000"}} onClick={e=>{window.showDD.call(this, true)}}>File</div>
			    {
			    	<div className="shadow" style={{display:"none", position:"fixed", width:"100px", zIndex:104, background:"#EEE", padding:"10px", borderRadius:"2px", boxShadow:"rgba(0, 0, 0, 0.5) 5px 5px 15px 0px"}} ref={(node)=>{this.dd = node}} >												
						 <div className="FlatItem"  onClick={e=>{window.createStory(window.storyId)}}><span style={{padding:"7px"}}>New</span></div>
						 <div className="FlatItem"  onClick={e=>{window.openFile(window.dispFile)}}><span style={{padding:"7px"}}>Load</span></div>
						 <div className="FlatItem" onClick={e=>{window.saveToDisk(window.storyId)}}><span style={{padding:"7px"}}>Save</span></div>
					</div>
			    }
			   </div>
		
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
		        	this.state.topView==="StoryReader"&&<Reader/>
		        }
		    </div>
		}
		{
        	this.state.topView==="Login"&&<Login/>
        }
    	{
        	this.state.topView==="Register"&&<Register/>
        }
    	{
        	this.state.topView==="StoryDefine"&&<StoryDefine/>
        }
      </div>
    );
  }
}

export default App;
