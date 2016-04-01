import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './task.js';
import './body.html';

Template.body.helpers({
  tasks() {
    return Tasks.find({}, { sort: { createdAt: -1 } });
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
});
