
import React from 'react';
import style from 'styled-components';
import Icon from '../icon/component';
var _templateObject = _taggedTemplateLiteralLoose(['\n  position: absolute;\n  right: -.5em;\n  transform: translateX(100%);\n  align-self: flex-start;\n'], ['\n  position: absolute;\n  right: -.5em;\n  transform: translateX(100%);\n  align-self: flex-start;\n']),
_templateObject2 = _taggedTemplateLiteralLoose(['\n  cursor: pointer;\n'], ['\n  cursor: pointer;\n']);

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

/*
 * Presentational
 * ==================================== */

var ContextMenuStyle = style.ul(_templateObject);

var Action = style.li(_templateObject2);

var stopActionPropagation = function stopActionPropagation(action) {
  return function (ev) {
    ev.stopPropagation();
    action(ev);
  };
};

var ContextMenu = function ContextMenu(props) {
	
  return React.createElement(
    ContextMenuStyle,
    null,
    props.actions.map(function (action) {
    	var sel = window.getEntity()
    	if (sel && sel.type==="LinkToOthers" && (action.iconVariety==="arrow" ||action.iconVariety==="Paragraph" ||action.iconVariety==="LinkToOthers") ||action.iconVariety==="delete" || action.iconVariety==="BranchingLogic" && (sel===undefined || sel && (sel.linksTo===undefined||sel.linksTo.length<2))) {
    	  	  return null
    	    }
      return React.createElement(
        Action,
        {
          key: action.label,
          onMouseDown: stopActionPropagation(action.action)
        },
        React.createElement(Icon, { name: action.iconVariety, label: action.label })
      );
    })
  );
};

export default ContextMenu;