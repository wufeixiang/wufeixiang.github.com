// JavaScript Document


// Model 
var Todo = Backbone.Model.extend({
	defaults :{
		title : '' , 
		completed : true
	}
});

// create a model 
var myTodo = new Todo({
	title : 'hello world' ,
});


// View

var TodoView = Backbone.View.extend({
	tagName : 'li',
	todoTpl : _.template($('#item-template').html() ),
	events: {
		'dblclick label':'edit',
		'keypress .edit': 'updateOnEnter',
		'blur .edit': 'close' 
	},
	initialize: function(){
		this.$el = $('#todo');
	},
	render:function()
	{
		this.$el.html( this.todoTpl(this.model.toJSON() ) );
		this.input = this.$('edit');
		return this ; 
	},
	//events here 
	edit:function()
	{
		
	},
	updateOnEnter:function(e)
	{
		
	},
	close:function()
	{
		
	},
});


// create a view 
var todoView = new TodoView({model:myTodo});
todoView.render();









