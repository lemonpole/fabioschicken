/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TodoStore and passes the new data to its children.
 */
var React = require('react');

// Helper function to retrieve the current state of the App
function getAppState(){
	return {
		// TODO: get data from stores
	}
}

var App = React.createClass({
	getInitialState: function(){
		return getAppState();
	},
	componentDidMount: function(){
		// TODO
	},
	componentWillUnmount: function(){
		// TODO
	},
	onChange: function(){
		// TODO
	},
	render: function(){
		return(
			<h1>Hello, world</h1>
		);
	}
});

module.exports = App;
