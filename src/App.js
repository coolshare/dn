import React, { Component } from 'react';
import CustomDiagram from './CustomDiagram';
import Reader from './Views/Reader'
import Login from './Views/Login'
import StoryDefine from './Views/StoryDefine'
import Register from './Views/Register'
import Introduction from './Views/Introduction'
import LinkParagraphView from './Views/LinkParagraphView'
import Dialog from './Views/Dialog'
import Tab from './Components/Tab'
import $ from 'jquery';
import './css/Reader.css'
import bg from "./images/bbb.gif"

import { library } from '@fortawesome/fontawesome-svg-core';

import {faFileImport, faFileExport, faCodeBranch, faGlobe, faCog, faQuestion, faPen, faEnvelope, faEdit, faPlug, faUser, faArrowDown, faArrowLeft, faChartBar, faTable, faWrench, faPlus, faTrashAlt, faSave, faUpload,
	faDownload, faSignal, faArrowUp, faSync, faCaretDown, faWindowClose, faTimes } from '@fortawesome/free-solid-svg-icons';
library.add(faFileImport, faFileExport, faCodeBranch, faGlobe, faCog, faQuestion, faPen, faEnvelope, faEdit, faPlug, faUser, faArrowDown, faArrowLeft, faChartBar, faTable, faWrench, faPlus, faTrashAlt, faSave, faUpload,
	faDownload, faSignal, faArrowUp,  faSync, faCaretDown, faWindowClose, faTimes);

var beforeNavigatedAway = function () {
	//window.saveStories()
};
window.storyMap = {}
window.userMap = {}
window.homeUrl = "http://73.71.159.185:12345"
window.userPath = "./db/dn/"
window.storyPath = "./db/dn/stories/"
window.addEventListener('beforeunload', beforeNavigatedAway, false);
window.addEventListener('unload', beforeNavigatedAway, false);

window.addEventListener("click", function(e) {
	if (e.target===window.app.dropdown || e.target===window.app.references.contextMenu) {
		return
	}
	window.showDD.call(window.app)
	window.app.references.contextMenu.style.display = "none"
})
window.addEventListener("resize", function(e) {
	window.app.refresh()
})
window.loadUsers = function () {
	var url = window.homeUrl+"?filePath="+window.userPath+"&fileName=users.txt"
	window.get(url, function(res){
		window.userMap = res
	})
}

window.saveStories = function() {
	for (var i in window.getUser().storyMap) {
		window.saveStory(window.getUser().storyMap[i])
	}
}
window.saveStory = function(story) {
	var data = {
			fileName:story.id+".txt",
			filePath:window.storyPath+window.getUser().user,
			content:story
	}
	window.post( window.homeUrl+"/save", data);
	
}

window.exportUser = function() {
	var FileSaver = require('file-saver');
	var blob = new Blob([JSON.stringify(window.getUser)], {type: "text/plain;charset=utf-8"});
	FileSaver.saveAs(blob, window.getUser().user+".txt");

	
}


window.dispFile = function(contents) {
	window.getUser = JSON.parse(contents)
	
	window.app.refresh()

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

window.confirmBox = function(message, title, handleYes, handleNo) {
	window.app.showDialog(<div>{message}</div>, {top:"10px", width:"600px", height:"150px", title:title, hideX:true, handleOK:function() {
		if (handleYes) {
			handleYes()
		}
	}, handleCancel:function() {
		if (handleNo) {
			handleNo()
		}
	}})
}
window.alertBox = function(message, title) {
	window.app.showDialog(<div>{message}</div>, {top:"10px", width:"500px", height:"150px", title:title})
}
window.deleteStory = function() {
	if (window.getStory()===undefined) {
		return
	}
	window.confirmBox("Are you sure to delete "+window.getStory().name+"?", "Delete a Story", function() {
		delete window.getUser().storyMap[window.getStory().id]
		window.setCurStory()
		window.app.refresh()
	})
}

window.initServer = function(response) {
	window.post( window.homeUrl+"/mkdir", {filePath:["./db", "./db/dn", "./db/dn/stories"]}, function() {
		if (response) {
			response()
		}
	})
}
window.createStory = function () {

	window.app.showDialog(<StoryDefine ref={(node)=>{window.app.references.StoryDefine=node}}/>, {top:"10px", width:"600px", height:"350px", title:"Create a Story", hideX:true, handleOK:function() {
		var storyDefine = window.app.references.StoryDefine
		storyDefine.handleOK.call(storyDefine)
	}})
}
	
window.exposeStory = function(e, level=1) {
	e.preventDefault();
	window.getStory().expose = level
}

window.exposeParagraph = function(e, level=1) {
	e.preventDefault();
	window.getStory().expose = level 
	window.getEntity().expose = level
	window.app.refresh()
}
window.linkParagraph = function(e, fromContextMenu) {
	e.preventDefault();
	window.app.showDialog(<LinkParagraphView fromContextMenu={fromContextMenu}/>, {title:"Link Paragraph to Others", hideX:true, top:"10px", left:"10px", width:"1000px", height:"600px", handleOK:function() {
		
	
	}})
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

window.loadStories = function(response) {
	var url = window.homeUrl+"/dir?filePath=./db/dn/stories/"+window.getUser().user
	window.get(url, function(res){
		window.getUser().storyMap = res
		if (response) {
			response(res)
		}
	})
	url = window.homeUrl+"/dir?filePath=./db/dn/stories/&fieldName=expose&fieldValue=1&fieldValueType=int"
	window.get(url, function(res){
		var uu = window.getUser()
		for (var u in res) {
			if (u===uu.user) {
				continue
			}
			window.userMap[u].storyMap = res[u]
		}
		
	})
}

window.popupBranchingLogic = function() {
	window.app.showDialog(window.app.handleBranchingLogic(), {title:"Create BranchingLogic", hideX:true, height:"400px", handleOK:function() {
		var branchingLogic = {question:window.app.questionInput.value.trim(), selections:[]}
		for (var i=0; i<4; i++) {
			var item = window.app["selectionInput_"+i].value.trim()
			if (item==="") {
				branchingLogic.selections.push({})
			} else {
				branchingLogic.selections.push({selection:item, branch:window.app["branchSelect_"+i].value})
			}
			
		}
		window.getEntity().branchingLogic = branchingLogic
	
	}})
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


window.showConextMenu = function(e) {
	var menu = window.app.references.contextMenu
	var c = e.target
	
	var r = c.getBoundingClientRect()
	menu.style.top = (r.top+20)+"px"
	menu.style.left = (r.left+r.width)+"px"
	menu.style.display = "block"
}

window.openEditParagraphDlg = function(id) {
	id = id||window.getEntity().id
	var entity = window.getStory()[id]
	  window.app.showDialog(window.app.editParagraph(entity), {top:"10px", width:"920px", height:"650px",title:"Edit "+entity.name, hideX:true, handleOK:function() {
		
		entity.name = window.app.titleInput.value
		entity.content1 = window.app.contentTextarea1.value
		entity.content2 = window.app.contentTextarea2.value
		window.saveStory()
		window.location.reload()
	}})
}




/// Story
window.getStory = function(sId, uId) {
	sId = sId||window.curStoryId
	uId = uId||window.getUserId
	var u = window.getUser(uId)
	if (u) {
		return u.storyMap[sId]
	}
	
}

window.setCurStory = function(id) {
	window.curStoryId = id
}
window.addStory = function(s) {
	window.getUser().storyMap[s.id] = s
}

window.removeStory = function(id) {
	delete window.getUser().storyMap[id]
}




/// Entity
window.getEntity = function(eId, sId, uId) {
	eId = eId||window.curEntityId
	sId = sId||window.curStoryId
	uId = uId||window.getUserId
	var u = window.getUser()
	if (u) {
		var s = u.storyMap[sId]
		if (s) {
			return s.entityMap[eId]
		}
	}
	
}

window.setCurEnity = function(id) {
	window.curEntityId = id
}

window.addEnity = function(e) {
	var s = window.getStory()
	s.entityMap[e.id] = e
}

window.removeEnity = function(e, id) {
	e.preventDefault();
	var entity = id?window.getEntity(id):window.getEntity()
	var s = window.getStory()
	delete s.entityMap[id]
	for (var i in s.entityMap) {
		var item = s.entityMap[i];
		if (item.linksTo) {
			var rr = []
			for (var j=0; j<item.linksTo.length; j++) {
				var link = item.linksTo[j]
				if (link.target===entity.id) {
					continue
				}
				rr.push(link)
			}
			item.linksTo = rr
		}
	}
	window.app.refresh()
}

///User
window.getUser = function(id) {
	return window.userMap[id]
}
window.getUser = function(id) {
	id = id||window.getUserId
	return window.userMap[id]
}
window.setCurUser = function(id) {
	window.curUserId = id
}
window.addUser = function(u) {
	window.userMap[u.user] = u
}

window.removeUser = function(id) {
	delete window.userMap[id]
}
//////////////////////////////////////////////////////// app ////////////////////
class App extends Component {
  constructor(props) {
	  super(props)
	  this.state = {topView:"Login", topTabView:"FlowDesign"}
	  this.references = {}
	  window.app = this
  }
  
  componentDidMount() {
	  window.initServer(function() {
		  window.post( window.homeUrl+"/create", {filePath:"./db/dn", fileName:"users.txt", "content":{}}, function() {
			  window.loadUsers()
			  
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
	  if (window.app.references.CustomDiagram) {
		  window.app.references.CustomDiagram.refresh()
	  }
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
	  window.app.references.Dialog.okButton.disabled = this.titleInput.value.trim()===""
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
	  var node = window.getEntity()
	  var selections = []
	  var dd = ["A", "B", "C", "D"]
	  for (let i=0; i<4; i++) {
		  var exist = node.branchingLogic?node.branchingLogic.selections[i]:{}
		  selections.push(<ul><li>{"Selection "+(dd[i])}</li><span>If select:</span><input defaultValue={exist.selection} style={{marginRight:"10px"}} ref={(node)=>{this["selectionInput_"+i] = node}} /><span style={{marginLeft:"10px"}}>go to</span>
		  	<select defaultValue={exist.branch} ref={(node)=>{this["branchSelect_"+i] = node}} ><option value="_RANDOM_">Randomly selected one</option>
		  		{
		  			node.linksTo.map((link, idx)=>{
		  				var n = window.getStory()[link.target]
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
  handleStorySelect(e) {
	  var id = e.target.value
	  if (id==="") {
		  window.setCurStory()
		  this.refresh()
		  return
	  }
	  window.setCurStory(id)
	  window.app.refresh()
	  
	  
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
	  var self = this
	  var tabProps = {
	    		"stlyle":{"height":"100%"},
	    		"container":self,
	    		"items": [
                     {
                         "name": "FlowDesign", "label": "Story Flow Design",
                         "isSelectedFun": function () {
                             return window.app.state.topTabView === "FlowDesign"
                         },
                         "handler": function () {
                        	 window.app.state.topTabView = "FlowDesign"
                        		 self.props.container.refresh()
                                 window.app.refresh()
                         },
                     },
                     {
                         "name": "StoryReader", "label": "Story Reader",
                         "isSelectedFun": function () {
                             return window.app.state.topTabView === "StoryReader"
                             
                         },
                         "handler": function () {
                        	 window.pages = [window.getStory()["_start_"]]
                        	 
                        	 window.app.state.topTabView = "StoryReader"
                        		 self.props.container.refresh()
                                 window.app.refresh()
                         },
                     }
                 ]}
	  
    return (
      <div className="App" style={{padding:"10px", height:"100vh", backgroundImage: `url(${bg})`}}>
      	{self.state.topView==="MainView" &&
	    	  <div>
		      	    	
		
		    	<h3 className="App-title">Welcome to Store Builder</h3>
		    	<div style={{marginLeft:"20px"}}>
		    		<div ref={(node)=>{self.dropdown=node}} style={{display:"inline-block", cursor:"pointer", textAlign:"center", paddingLeft:"25px", paddingRight:"25px", width:"30px", background:"#ccc", border: "solid 1px #000"}} onClick={e=>{window.showDD.call(self, true)}}>File</div>
				    {
				    	<div className="shadow" style={{display:"none", position:"fixed", width:"200px", zIndex:104, background:"#EEE", padding:"10px", borderRadius:"2px", boxShadow:"rgba(0, 0, 0, 0.5) 5px 5px 15px 0px"}} ref={(node)=>{self.dd = node}} >												
							 <div className="FlatItem"  onClick={e=>{window.createStory(e)}}><span style={{padding:"7px"}}>New</span></div>							 
							 <div className="FlatItem" onClick={e=>{window.saveStories(e)}}><span style={{padding:"7px"}}>Save</span></div>
							 <div className="FlatItem" onClick={e=>{window.deleteStory(e)}}><span style={{padding:"7px", color:window.getStory()?"#000":"#999"}}>Delete</span></div>
							 <hr/>
							 <div className="FlatItem"  onClick={e=>{window.exposeStory(e, 2)}}><span style={{padding:"7px"}}>Expose Current Story</span></div>
							 <div className="FlatItem"  onClick={e=>{window.openFile(window.dispFile)}}><span style={{padding:"7px"}}>Import</span></div>
							 <div className="FlatItem" onClick={e=>{window.exportUser(e)}}><span style={{padding:"7px"}}>Export</span></div>
						</div>
				    }
					<div style={{display:"inline-block", marginLeft:"10px"}}>
						<span>Stories:</span>
						<select style={{width:"200px"}} onChange={e=>{this.handleStorySelect(e)}}><option value=""></option>
							{
								Object.keys(window.getUser().storyMap).map((key, idx)=>{
									let story = window.getUser().storyMap[key]
								
									return <option value={story.id}>{story.name}</option>
								})
								
							}
						</select>
					</div>
				</div>
		        {
		        	self.state.topTabView==="FlowDesign"&&  window.getStory()!==undefined &&
		          	<main className="main"   ref={(node)=>{self.references.main = node}} style={{borderRadius:"10px", margin:"10px", height:"700px"}}>
		          		<CustomDiagram ref={(node)=>{self.references.CustomDiagram = node}}/>
		            </main>
		        }
		        {
		        	self.state.topTabView==="StoryReader"&& window.getStory()!==undefined && <Reader  ref={(node)=>{self.references.Reader = node}}/>
		        }
	        	{
		        	window.getStory()===undefined && <Introduction  ref={(node)=>{self.references.Introduction = node}}/>
		        }
		    </div>
		}
		{
        	self.state.topView==="Login"&&<Login ref={(node)=>{self.references.Login = node}}/>
        }
    	{
        	self.state.topView==="Register"&&<Register ref={(node)=>{self.references.Register = node}}/>
        }
    	{ 
      		self.state.Dialog && <Dialog ref={(node)=>{self.references.Dialog = node}} options={self.state.Dialog.options}>{self.state.Dialog.content}</Dialog>
      	}  
    	<div className="shadow" style={{display:"none", position:"fixed", width:"250px", zIndex:104, background:"#EEE", padding:"10px", borderRadius:"2px", boxShadow:"rgba(0, 0, 0, 0.5) 5px 5px 15px 0px"}} ref={(node)=>{window.app.references.contextMenu = node}} >																		 
			 <div className="FlatItem" onClick={e=>{window.openEditParagraphDlg(e)}}><span style={{padding:"7px"}}>Edit</span></div>
			 <div className="FlatItem" onClick={e=>{window.removeEnity(e)}}><span style={{padding:"7px", color:window.getStory()?"#000":"#999"}}>Delete</span></div>
			 <div className="FlatItem" onClick={e=>{window.exposeParagraph(e)}}><span style={{padding:"7px", color:window.getStory()?"#000":"#999"}}>Expose this paragraph</span></div>
			 <div className="FlatItem" onClick={e=>{window.linkParagraph(e, true)}}><span style={{padding:"7px", color:window.getStory()?"#000":"#999"}}>Link to another paragraph...</span></div>
		</div>
      </div>
    );
  }
}

export default App;
