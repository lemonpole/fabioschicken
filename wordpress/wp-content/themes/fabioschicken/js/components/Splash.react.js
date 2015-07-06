var React = require('react');
var BlogInfoStore = require('../stores/BlogInfoStore');
var WebAPIUtils = require('../utils/WebAPIUtils');

function getSplashState(){
	return {
		blogInfoData: BlogInfoStore.get(),
		winHeight: window.innerHeight
	};
}

var Splash = React.createClass({
	getInitialState: function(){
		return getSplashState();
	},
	componentDidMount: function(){
		WebAPIUtils.getBlogInfo();
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
					<h1>{this.state.blogInfoData.name}</h1>
					<h2>{this.state.blogInfoData.description}</h2>
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
