// @flow

import React from 'react';
import style from 'styled-components';

import type { DiagComponentProps } from '../lib/react-flow-diagram';

/*
 * Presentational
 * ==================================== */

const ParagraphStyle = style.div`
  background-color: #fff;
  display: flex;
  flex-flow: row nowrap;
  align-items: ${props => (props.isEditing ? 'stretch' : 'center')};
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border-radius: .5rem;
  border: 2px solid #888;
`;

const Name = style.span`
  flex: 1 0;
  padding: .5em;
  font-size: .8rem;
`;

const EditName = style.textarea`
  padding: .5em;
  font-size: .8rem;
  text-align: center;
  resize: none;
  border: none;
  border-radius: .5rem;
`;

export type ParagraphProps = DiagComponentProps & {
  name: string,
  content1: string,
  content2: string,
  externalLinkEntryPoint:object,
  externalLinkExitPoint:object,
  isEditing: boolean,
  toggleEdit: boolean => void,
  refreshName: (SyntheticStartPoint<HTMLTextAreaElement>) => void,
  handleKeyPress: (SyntheticKeyboardStartPoint<HTMLTextAreaElement>) => void,
  handleRef: HTMLTextAreaElement => void,
};
const Paragraph = (props: ParagraphProps) => (
  <ParagraphStyle
    width={props.model.width}
    height={props.model.height}
    isEditing={props.isEditing}
  >
    <EditName
      value={props.name}
      onChange={props.refreshName}
      onKeyDown={props.handleKeyPress}
      innerRef={textarea => props.handleRef(textarea)}
      style={{ display: props.isEditing ? 'block' : 'none' }}
    />
    <Name
      onDoubleClick={() => { 
    	  props.toggleEdit(true, props.model.id) 
    }}
      style={{ display: !props.isEditing ? 'block' : 'none' }}
    >
      {props.model.name}
    </Name>
  </ParagraphStyle>
);

/*
 * Container
 * ==================================== */

type ParagraphComponentProps = DiagComponentProps;
type ParagraphComponentState = {
  isEditing: boolean,
  name: string,
  content1:string,
  content2:string,
  externalLinkEntryPoint:object,
  externalLinkExitPoint:object
};
class ParagraphComponent extends React.PureComponent<
  ParagraphComponentProps,
  ParagraphComponentState
> {
  textarea: ?HTMLTextAreaElement;

  state = {
    isEditing: false,
    name: this.props.model.name,
    content1: this.props.model.content1,
    content2: this.props.model.content2,
    externalLinkEntryPoint:this.props.model.externalLinkEntryPoint,
    externalLinkExitPoint:this.props.model.externalLinkExitPoint
  };

  componentWillUnmount() {
    this.textarea = null;
  }

  handleRef = (textarea: HTMLTextAreaElement) => {
    if (!this.textarea) {
      this.textarea = textarea;
    }
  };

  toggleEdit = (isEditing: boolean, id) => {
	  window.openParagraphDlg(id)
	 // window.app.switchView("Editor", this)
    /*const { textarea } = this;
    if (isEditing && textarea) {
      setTimeout(() => textarea.focus(), 16 * 4);
    }
    this.setState({ isEditing });*/
	
  };

  refreshName = (ev: SyntheticStartPoint<HTMLTextAreaElement>) => {
    this.setState({ name: ev.currentTarget.value });
  };

  handleKeyPress = (ev: SyntheticKeyboardStartPoint<HTMLTextAreaElement>) => {
    switch (ev.key) {
      case 'Enter':
        this.toggleEdit(false);
        this.props.setName({ id: this.props.model.id, name: this.state.name, content1: this.state.content1, content2: this.state.content2, externalLinkEntryPoint:this.state.externalLinkEntryPoint,
        	  externalLinkExitPoint:this.state.externalLinkExitPoint });
        break;
      case 'Escape':
        this.toggleEdit(false);
        this.setState({ name: this.props.model.name, content1: this.state.content1, content2: this.state.content2,  externalLinkEntryPoint:this.state.externalLinkEntryPoint,
      	  externalLinkExitPoint:this.state.externalLinkExitPoint  });
        break;
      // no default
    }
  };

  render() {
    return (
      <Paragraph
        {...this.props}
        isEditing={this.state.isEditing}
        name={this.state.name}
        content1={this.state.content1}
        content2={this.state.content2}
        externalLinkEntryPoint={this.state.externalLinkEntryPoint}
        externalLinkExitPoint={this.state.externalLinkExitPoint}
        toggleEdit={this.toggleEdit}
        refreshName={this.refreshName}
        handleKeyPress={this.handleKeyPress}
        handleRef={this.handleRef}
      />
    );
  }
}

export default ParagraphComponent;
