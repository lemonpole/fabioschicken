var React = require('react');
var Router = require('./Router.react');
var RouterConstants = require('../constants/RouterConstants');
var Home = require('./Home.react');

var Routes = [
	[RouterConstants.ROOT_PATH, Home]
];

var Index = React.createClass({
	render: function(){
		return(
			<Router routes={Routes} />
		);
	}
});

module.exports = Index;
