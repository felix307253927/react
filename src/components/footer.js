/**
 * @license Created by felix on 16-11-17.
 * @email   307253927@qq.com
 */

import React from 'react';
import classNames from 'classnames';
import Utils from '../utils';

export default class TodoFooter extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let activeTodoWord = Utils.pluralize(this.props.count, 'item');
    let clearButton    = null;
    
    if (this.props.completedCount > 0) {
      clearButton = (
        <button
          className="clear-completed"
          onClick={this.props.onClearCompleted}>
          clear completed
        </button>
      )
    }
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{this.props.count}</strong> {activeTodoWord} left
        </span>
        <ul className="filters">
          <li>
            <a href="#/" className={classNames({selected:this.props.nowShowing===Utils.ALL_TODOS})}>All</a>
          </li>
          <li>
            <a href="#/active" className={classNames({selected:this.props.nowShowing===Utils.ACTIVE_TODOS})}>Active</a>
          </li>
          <li>
            <a href="#/completed" className={classNames({selected:this.props.nowShowing===Utils.COMPLETED_TODOS})}>Completed</a>
          </li>
        </ul>
        {clearButton}
      </footer>
    )
  }
}