import React, {Component} from 'react';

import Utils from './utils';
import TodoItem from './components/todo-item';
import TodoFooter from './components/footer';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nowShowing: Utils.ALL_TODOS,
      editing   : null,
      newTodo   : ''
    }
  }
  
  componentDidMount() {
    console.log(123)
    this.setState({nowShowing: Utils.ALL_TODOS});
   /* Router({
      '/'         : this.setState({nowShowing: Utils.ALL_TODOS}),
      '/active'   : this.setState({nowShowing: Utils.ACTIVE_TODOS}),
      '/completed': this.setState({nowShowing: Utils.COMPLETED_TODOS})
    }).init('/');*/
  }
  
  handleChange(event) {
    this.setState({newTodo: event.target.value});
  }
  
  handleNewTodoKeyDown(event) {
    if (event.keyCode !== Utils.ENTER_KEY) {
      return;
    }
    event.preventDefault();
    let val = this.state.newTodo.trim();
    if (val) {
      this.props.model.addTodo(val);
      this.setState({newTodo: ''});
    }
  }
  
  toggleAll(event) {
    let checked = event.target.checked;
    this.props.model.toggleAll(event);
  }
  
  toggle(todoToToggle) {
    this.props.model.toggle(todoToToggle);
  }
  
  destroy(todo) {
    this.props.model.destroy(todo);
  }
  
  edit(todo) {
    this.setState({editing: todo.id});
  }
  
  save(todoToSave, text) {
    this.props.model.save(todoToSave, text);
    this.setState({editing: null});
  }
  
  cancel() {
    this.setState({editing: null});
  }
  
  clearCompleted() {
    this.props.model.clearCompleted();
  }
  
  render() {
    let footer, main;
    let todos      = this.props.model.todos;
    let shownTodos = todos.filter(todo => {
      switch (this.state.nowShowing) {
        case Utils.ACTIVE_TODOS:
          return !todo.completed;
        case Utils.COMPLETED_TODOS:
          return todo.completed;
        default:
          return true;
      }
    });
    let todoItems  = shownTodos.map(todo => {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={this.toggle.bind(this, todo)}
          onDestroy={this.destroy.bind(this, todo)}
          onEdit={this.edit.bind(this, todo)}
          editing={this.state.editing===todo.id}
          onSave={this.save.bind(this, todo)}
          onCancel={::this.cancel}
        />
      )
    });
    
    let activeTodoCount = todos.reduce((accum, todo) => {
      return todo.completed ? accum : accum + 1;
    }, 0);
    
    let completedCount = todos.length - activeTodoCount;
    
    if (activeTodoCount || completedCount) {
      footer = <TodoFooter
        count={activeTodoCount}
        completedcount={completedCount}
        nowShowing={this.state.nowShowing}
        onClearCompleted={::this.clearCompleted}
      />
    }
    
    if (todos.length) {
      main = (
        <section className="main">
          <input
            className="toggle-all"
            type="checkbox"
            onChange={::this.toggleAll}
            checked={activeTodoCount === 0}
          />
          <ul className="todo-list">
            {todoItems}
          </ul>
        </section>
      );
    }
    
    return (
      <div>
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.newTodo}
            onKeyDown={::this.handleNewTodoKeyDown}
            onChange={::this.handleChange}
            autoFocus={true}
          />
        </header>
        {main}
        {footer}
      </div>
    );
    
    
  }
}