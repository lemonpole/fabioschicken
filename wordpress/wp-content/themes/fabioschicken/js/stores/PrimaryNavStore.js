var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var Assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';
var _navData = {};

var PrimaryNavStore = Assign({}, EventEmitter.prototype, {
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
		return _navData;
	}
});

PrimaryNavStore.dispatchToken = AppDispatcher.register(function(action){
	switch(action.type){
		case ActionTypes.RECEIVE_PRIMARYNAV:
			_navData = action.data;
			PrimaryNavStore.emitChange();
			break;
		default:
			// do nothing
	}
});

module.exports = PrimaryNavStore;
