/**
 * @license Created by felix on 16-11-16.
 * @email   307253927@qq.com
 */
'use strict';

import Utils from '../utils';

export default class TodoModel {
  constructor(key) {
    this.key       = key;
    this.todos     = Utils.store(key);
    this.onChanges = [];
  }
  
  subscribe(onChange) {
    this.onChanges.push(onChange);
  }
  
  inform() {
    Utils.store(this.key, this.todos);
    this.onChanges.forEach(cb => cb());
  }
  
  addTodo(title) {
    this.todos.push({
      id       : Utils.uuid(),
      title    : title,
      completed: false
    });
    this.inform();
  }
  
  toggle(todoToToggle) {
    this.todos = this.todos.map(todo => {
      return todo !== todoToToggle ? todo : Utils.extend({}, todo, {completed: !todo.completed})
    });
    this.inform();
  }
  
  toggleAll(checked) {
    this.todos = this.todos.map(todo => {
      return Utils.extend({}, todo, {completed: checked});
    });
    this.inform();
  }
  
  destroy(todo) {
    this.todos = this.todos.filter(candidate => {
      return candidate !== todo;
    });
    this.inform();
  }
  
  save(todoToSave, text) {
    this.todos = this.todos.map(todo => {
      return todo !== todoToSave ? todo : Utils.extend({}, todo, {title: text});
    });
    this.inform();
  }
  
  clearCompleted() {
    this.todos = this.todos.filter(todo => {
      return !todo.completed;
    });
    this.inform();
  }
}