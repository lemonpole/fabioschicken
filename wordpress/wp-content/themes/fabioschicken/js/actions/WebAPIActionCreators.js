var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var ActionTypes = AppConstants.ActionTypes;

var WebAPIActionCreators = {
	receiveBlogInfo: function(data){
		AppDispatcher.dispatch({
			type: ActionTypes.RECEIVE_BLOGINFO,
			data: data
		});
	}
};

module.exports = WebAPIActionCreators;
