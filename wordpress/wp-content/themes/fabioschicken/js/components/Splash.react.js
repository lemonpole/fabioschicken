var React = require('react');
var BlogInfoStore = require('../stores/BlogInfoStore');
var WebAPIUtils = require('../utils/WebAPIUtils');

var _isLoaded = false;

function getSplashState(){
	return {
		blogInfoData: BlogInfoStore.get(),
		winHeight: window.innerHeight,
	};
}

var Splash = React.createClass({
	getInitialState: function(){
		return getSplashState();
	},
	componentDidMount: function(){
		this._handleResize();
		WebAPIUtils.getBlogInfo();
		window.addEventListener('resize', this._handleResize);
		BlogInfoStore.addChangeListener(this._onChange);
	},
    	componentWillUnmount: function(){
		window.removeEventListener('resize', this._handleResize);
		BlogInfoStore.removeChangeListener(this._onChange);
	},
	render: function(){
		var elem;
		if(!_isLoaded) elem = <BeforeLoad />;
		else elem = <AfterLoad data={this.state.blogInfoData} />;

		return(
			<div id="splash-container" style={{height: this.state.winHeight + 'px'}}>
				{elem}
			</div>
		);
	},

	_handleResize: function(e){
		var navHeight = document.getElementById('nav-container').offsetHeight;
		navHeight = (navHeight == window.innerHeight)? 0: navHeight; // for mobile
		this.setState({ winHeight: window.innerHeight - navHeight });
	},
	_onChange: function(){
		_isLoaded = true;
		this.setState({ blogInfoData: BlogInfoStore.get() });
	}
});

var BeforeLoad = React.createClass({
	render: function(){
		return(
			<div className="text loading">
				<i className="fa fa-spinner fa-pulse fa-4x"></i>
			</div>
		);
	}
});
var AfterLoad = React.createClass({
	render: function(){
		return(
			<div className="text">
				<h1>{this.props.data.name}</h1>
				<h2>{this.props.data.description}</h2>
			</div>
		);
	}
});

module.exports = Splash;
