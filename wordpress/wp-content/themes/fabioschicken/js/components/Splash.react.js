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
		window.addEventListener('resize', this._handleResize);
	},
    	componentWillUnmount: function(){
		window.removeEventListener('resize', this._handleResize);
	},
	render: function(){
		return(
			<div className="conainer-fluid" id="splash-container" style={{height: this.state.winHeight + 'px'}}>
				<div className="text">
					<h1>Fabios Chicken</h1>
					<h2>4805 North Front Street</h2>
				</div>
			</div>
		);
	},

	_handleResize: function(e){
		this.setState(getSplashState());
	}
});

module.exports = Splash;
