Router.configure({
  layoutTemplate: "ApplicationLayout"
});

Router.route('/', function () {
  this.render("navbar", {to: "header"});
  this.render("palette", {to: "palette"});
  this.render("canvas", {to: "canvas"});
});