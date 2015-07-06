var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypeConstants = require('../constants/ActionTypeConstants');

var WebAPIActionCreators = {
	receiveBlogInfo: function(data){
		AppDispatcher.dispatch({
			type: ActionTypeConstants.RECEIVE_BLOGINFO,
			data: data
		});
	}
};

module.exports = WebAPIActionCreators;
