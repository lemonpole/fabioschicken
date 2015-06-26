var React = require('react');
var Router = require('./Router.react');
var Home = require('./Home.react');

var Routes = [
	['/', Home]
];

var Index = React.createClass({
	render: function(){
		return(
			<Router routes={Routes} />
		);
	}
});

module.exports = Index;
