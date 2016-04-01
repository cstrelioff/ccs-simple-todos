import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';

import './task.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.body.helpers({
  tasks() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // checked, filter tasks
      return Tasks.find({ checked: { $ne: true } },
                        { sort: { createdAt: -1 } });
    }
    // not checked, return all taks
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
  incompleteCount() {
    return Tasks.find({ checked: { $ne: true} }).count();
  },
});

Template.body.events({
  'submit .new-task'(event) {
    event.preventDefault();

    // get form text
    const target = event.target;
    const text = target.text.value;

    // Insert task
    // insecure -- will be fixed later
    Tasks.insert({
      text,
      createdAt: new Date(),
    });

    // clear form text
    target.text.value = '';
  },
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  }
});
