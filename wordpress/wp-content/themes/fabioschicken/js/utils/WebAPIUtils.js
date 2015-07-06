var AppConstants = require('../constants/AppConstants');
var WebAPIActionCreators = require('../actions/WebAPIActionCreators');
var Request = require('superagent');

var WebAPI = AppConstants.WebAPI;
var WebAPIUtils = {
	getBlogInfo: function(){
		Request.get(WebAPI.API_ROOT + 'get_blog_info').end(function(err, res){
			if(res.ok){
				WebAPIActionCreators.receiveBlogInfo(res.body);
			}
		});
	}
}

module.exports = WebAPIUtils;
