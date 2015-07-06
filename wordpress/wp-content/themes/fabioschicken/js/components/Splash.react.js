var React = require('react');
var BlogInfoStore = require('../stores/BlogInfoStore');

function getSplashState(){
	return {
		bloginfo: BlogInfoStore.get(),
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
		BlogInfoStore.addChangeListener(this._onChange);
	},
    	componentWillUnmount: function(){
		window.removeEventListener('resize', this._handleResize);
		BlogInfoStore.removeChangeListener(this._onChange);
	},
	render: function(){
		return(
			<div id="splash-container" style={{height: this.state.winHeight + 'px'}}>
				<div className="text">
					<h1>{this.state.bloginfo.name}</h1>
					<h2>{this.state.bloginfo.description}</h2>
				</div>
			</div>
		);
	},

	_handleResize: function(e){
		var navHeight = document.getElementById('nav-container').offsetHeight;
		navHeight = (navHeight == window.innerHeight)? 0: navHeight; // for mobile
		this.setState({ winHeight: window.innerHeight - navHeight });
	},
	_onChange: function(){
		this.setState(getSplashState());
	}
});

module.exports = Splash;
