var WebAPIConstants = require('../constants/WebAPIConstants');
var WebAPIActionCreators = require('../actions/WebAPIActionCreators');
var Request = require('superagent');

var WebAPIUtils = {
	getBlogInfo: function(){
		Request.get(WebAPIConstants.API_ROOT + 'get_blog_info').end(function(err, res){
			if(res.ok){
				WebAPIActionCreators.receiveBlogInfo(res.body);
			}
		});
	}
}

module.exports = WebAPIUtils;
