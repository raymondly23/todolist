'use strict'

$(document).ready(init);

function init() {
	getAllTodos();
	$('#addTodo').click(addTodo);
	// $('#checkbox').toggle(checkbox)
}

function getAllTodos() { 
 $.ajax({
 	method: 'GET',
 	url:  '/todos',
 	success: function(data) {
 			data = JSON.parse(data);
 			var check;
 			var $todos = data.map(function(todo){
 			todo = JSON.parse(todo);
 			var $todo = $('#template').clone();
 			$todo.removeAttr('id');
 			$todo.find('.desc').text(todo.desc);
 			$todo.find('.dueDate').text(todo.due);
 			return $todo;
 		})
 		$('#todoTable').append($todos);
 	}
 })
}

function addTodo() {
	var desc = $('#desc').val();
	var due = $('#date').val();
	var complete;
	$.ajax({
		method: 'POST',
		url: '/todos',
		data: {
			desc: desc, 
			due: due ,

		},
		success: function(data) {
			console.log('data', JSON.parse(data));
			var $todo = $('#template').clone;
			$todo.removeAttr('id');
 			$todo.find('.desc').text(data.desc);
 			$todo.find('.dueDate').text(data.due);
 			$('#todoTable').append($todo);
		},
		error: function(err) {
			console.log('err: ', err)
		}
	})
}

// function checkbox() {
//  		$('#checkbox').prop('check', todo.complete);

// }