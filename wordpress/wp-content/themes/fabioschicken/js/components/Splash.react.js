var React = require('react');

function getSplashState(){
	return {
		winHeight: window.innerHeight
	};
}

var Splash = React.createClass({
	getInitialState: function(){
		return getSplashState();
	},
	componentDidMount: function(){
		this._handleResize();
		window.addEventListener('resize', this._handleResize);
	},
    	componentWillUnmount: function(){
		window.removeEventListener('resize', this._handleResize);
	},
	render: function(){
		return(
			<div id="splash-container" style={{height: this.state.winHeight + 'px'}}>
				<div className="text">
					<h1>React JS Example</h1>
					<h2>Woah, nelly! A subtitle goes here!</h2>
				</div>
			</div>
		);
	},

	_handleResize: function(e){
		var navHeight = document.getElementById('nav-container').offsetHeight;
		navHeight = (navHeight == window.innerHeight)? 0: navHeight; // for mobile
		this.setState({ winHeight: window.innerHeight - navHeight });
	}
});

module.exports = Splash;
