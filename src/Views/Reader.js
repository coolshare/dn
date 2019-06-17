import React, { Component } from 'react';

export default class Reader extends Component {
	findAStory(entityMap) {
		return this.findNextSection(entityMap, entityMap["_start_"], [])
	}
	findNextSection(entityMap, node, path) {
		path.push(node.name)
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
	render() {
		var entities = window.store.getState().entity
		var entityMap = {}
		for (var i=0; i<entities.length; i++) {
			var item = entities[i]
			entityMap[item.id] = item
		}
		
		var path = this.findAStory(entityMap)
		return <div style={{"height":"600px", "width":"1000px"}}>
			{path.join("->")}
		</div>
	}
}