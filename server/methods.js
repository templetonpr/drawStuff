Meteor.methods({
  'clear': function () {
    Points.remove({});
  }
});