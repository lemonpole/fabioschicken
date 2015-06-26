var React = require('react');
var Splash = require('./Splash.react.js');

var Home = React.createClass({
	render: function(){
		return(
			<div>
				<Splash />
			</div>
		);
	}
});

module.exports = Home;
