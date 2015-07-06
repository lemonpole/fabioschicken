var React = require('react');
var Index = require('./components/Index.react');
var WebAPIUtils = require('./utils/WebAPIUtils');

WebAPIUtils.getBlogInfo();

React.render(
	<Index />,
	document.getElementById('app')
);
