var React = require('react');
var Router = require('./components/Router.react');
var Main = require('./components/Main.react');

var Routes = [
	["/", Main]
];

React.render(
	<Router routes={Routes} />,
	document.getElementById('app')
);
