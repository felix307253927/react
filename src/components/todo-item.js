/**
 * @license Created by felix on 16-11-16.
 * @email   307253927@qq.com
 */
'use strict';
import React from 'react';
import classNames from 'classnames';
import Utils from '../utils';

export default class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editText: props.title};
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.todo !== this.props.todo ||
      nextProps.editing !== this.props.editing ||
      nextState.editText !== this.state.editText
    )
  }
  
  componentDidUpdate(prevProps) {
    if (!prevProps.editing && this.props.editing) {
      let node = this.refs.editField;
      node.focus();
      let length = node.value.length;
      node.setSelectionRange(length, length);
    }
  }
  
  handleSubmit(event) {
    let val = this.state.editText.trim();
    if (val) {
      this.props.onSave(val);
      this.setState({editText: val});
    } else {
      this.props.onDestroy();
    }
  }
  
  handleEdit() {
    this.props.onEdit();
    this.setState({editText: this.props.todo.title});
  }
  
  handleKeyDown(event) {
    if (event.keyCode === Utils.ESCAPE_KEY) {
      this.setState({editText: this.props.todo.title});
      this.props.onCancel(event);
    } else if (event.keyCode === Utils.ENTER_KEY) {
      this.handleSubmit(event);
    }
  }
  
  handleChange(event) {
    this.props.editing && this.setState({editText: event.target.value});
  }
  
  render() {
    return (
      <li className={classNames({
        completed:this.props.todo.completed,
        editing:this.props.editing
      })}>
        <div className="view">
          <input type="checkbox" className="toggle" checked={this.props.todo.completed} onChange={this.props.onToggle}/>
          <label onDoubleClick={::this.handleEdit}>
            {this.props.todo.title}
          </label>
          <button className="destroy" onClick={this.props.onDestroy}></button>
        </div>
        <input type="text" ref="editField" className="edit" value={this.state.editText} onBlur={::this.handleSubmit} onChange={::this.handleChange} onKeyDown={::this.handleKeyDown}/>
      </li>
    )
  }
}