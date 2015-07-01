var React = require('react');

function getMobileNavBtnState(){
	return({
		showBar: false,
		active: false,
		scrollPos: document.documentElement.scrollTop || document.body.scrollTop,
	});
}

var MobileNavBtn = React.createClass({
	getInitialState: function(){
		return getMobileNavBtnState();
	},
    	componentDidMount: function(){
		window.addEventListener('scroll', this._handleScroll);
	},
    	componentWillUnmount: function(){
		window.removeEventListener('scroll', this._handleScroll);
	},
	render: function(){
		var shown = this.state.showBar? 'yes-bg': 'no-bg';
		var text = this.state.active? 'active': '';
		return(
			<div id="mobile-nav-container" className={shown}>
				<div id="toggle-btn" className={text} onClick={this._handleClick}><span></span></div>
			</div>
		);
	},

	_handleClick: function(e){
		var mainNavElem = document.getElementById('nav-container');
		mainNavElem.style.opacity = (this.state.active)? '0': '.85';
		this.setState({ active: !this.state.active });
	},
	_handleScroll: function(e){
		var currentScrollPos = getMobileNavBtnState().scrollPos;
		var triggerPos = document.getElementById('splash-container').offsetHeight;

		if(currentScrollPos >= triggerPos) this.setState({ showBar: true });
		else this.setState({ showBar: false });
	},
});

module.exports = MobileNavBtn;
