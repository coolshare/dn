import React from 'react';
import {
  Diagram,
  store as diagramStore,
  setEntities,
  setConfig,
  diagramOn,
} from '../lib/react-flow-diagram';
import model from './model-example';
import { config, customEntities } from './config-example';
import $ from 'jquery';

window.get = function (url, callback){
	
	$.ajax({
		  url:url,
		  type:"GET",
		  contentType:"application/json; charset=utf-8",
		  dataType:"json",
		  success: function(res){
			  callback(res)
		  }
		}).fail(function(response) {
			
			console.log('Error when get');
		});
}
window.loadStory = function (storyId, callback) {
	var url = window.homeUrl+"?filePath="+window.storyPath+"&fileName="+encodeURIComponent(storyId+".txt")
	window.get(url, function(res){
		window.curState = JSON.parse(res)
		window.entityMap = {}
		for (var i=0; i<window.curState.length; i++) {
			var item = window.curState[i]
			window.entityMap[item.id] = item
		}
		callback()
		window.curStory = storyId
		console.log(JSON.stringify(window.curState, null, 4))
	})
}

class CustomDiagram extends React.PureComponent {
  constructor(props) {
	  super(props)
	  this.state = {}
  }
  refresh() {
	  this.componentWillMount.call(this)
	  this.setState({refresh:this.state.refresh!==true?true:false})
  }
  componentWillMount() {
	//window.loadStory(window.storyId, function() {
		diagramStore.dispatch(setConfig(config));
	    var mm = window.curState||model
	    diagramStore.dispatch(setEntities(mm));
	    window.store = diagramStore
	    diagramOn('anyChange', entityState => {
	      // You can get the model back
	      // after modifying the UI representation
	      window.curState = Object.assign([], entityState)
	      console.info(entityState)
	    });
	//})
    
  }
  render() {
    return <Diagram customEntities={customEntities} />;
  }
}

export default CustomDiagram;
