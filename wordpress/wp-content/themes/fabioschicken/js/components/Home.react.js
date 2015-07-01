var React = require('react');
var Splash = require('./Splash.react');
var MainNav = require('./MainNav.react');
var MobileNavBtn = require('./MobileNavBtn.react');

var Home = React.createClass({
	render: function(){
		return(
			<div>
				<MobileNavBtn />
				<Splash />
				<MainNav />

				<div style={{height: 2000}} />
			</div>
		);
	}
});

module.exports = Home;
