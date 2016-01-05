Meteor.methods({
  'clear': function () {
    points.remove({});
  }
});