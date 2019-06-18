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
			
			console.log('Error');
		});
}
window.loadStory = function (storyId, callback) {
	var url = "http://73.71.159.185:12345?filePath=.%2Ftemp%2FStories%2F&fileName="+encodeURIComponent(storyId+".txt")
	window.get(url, function(res){
		window.curState = JSON.parse(res)
		window.entityMap = {}
		for (var i=0; i<window.curState.length; i++) {
			var item = window.curState[i]
			window.entityMap[item.id] = item
		}
		callback()
		window.curStory = storyId
	})
}

class CustomDiagram extends React.PureComponent {
  componentWillMount() {
	window.loadStory("StoryA", function() {
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
	})
    
  }
  render() {
    return <Diagram customEntities={customEntities} />;
  }
}

export default CustomDiagram;
