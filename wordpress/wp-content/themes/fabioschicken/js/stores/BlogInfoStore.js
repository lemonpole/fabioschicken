var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var ActionTypeConstants = require('../constants/ActionTypeConstants.js');
var EventEmitter = require('events').EventEmitter;
var Assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _bloginfo = {};

var BlogInfoStore = Assign({}, EventEmitter.prototype, {
	emitChange: function(){
		this.emit(CHANGE_EVENT);
	},
	addChangeListener: function(callback){
		this.on(CHANGE_EVENT, callback);
	},
	removeChangeListener: function(callback){
		this.removeListener(CHANGE_EVENT, callback);
	},
	get: function(){
		return _bloginfo;
	}
});

BlogInfoStore.dispatchToken = AppDispatcher.register(function(action){
	switch(action.type){
		case ActionTypeConstants.RECEIVE_BLOGINFO:
			_bloginfo = action.data;
			BlogInfoStore.emitChange();
			break;
		default:
			// do nothing
	}
});

module.exports = BlogInfoStore;
