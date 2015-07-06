var React = require('react');
var Router = require('./Router.react');
var Home = require('./Home.react');
var AppConstants = require('../constants/AppConstants');

var RoutePaths = AppConstants.RoutePaths;
var Routes = [
	[RoutePaths.ROOT_PATH, Home]
];

var Index = React.createClass({
	render: function(){
		return(
			<Router routes={Routes} />
		);
	}
});

module.exports = Index;
