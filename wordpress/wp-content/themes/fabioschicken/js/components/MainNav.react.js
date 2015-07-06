var React = require('react');
var WebAPIUtils = require('../utils/WebAPIUtils');
var PrimaryNavStore = require('../stores/PrimaryNavStore');

function getMainNavState(){
	return({
		scrollPos: document.documentElement.scrollTop || document.body.scrollTop,
		fixed: false,
		navData: PrimaryNavStore.get()
	});
}

var MainNav = React.createClass({
	getInitialState: function(){
		return getMainNavState();
	},
    	componentDidMount: function(){
		WebAPIUtils.getPrimaryNav();
		window.addEventListener('scroll', this._handleScroll);
		PrimaryNavStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function(){
		window.removeEventListener('scroll', this._handleScroll);
		PrimaryNavStore.addChangeListener(this._onChange);
	},
	render: function(){
		var text = (this.state.fixed)? 'yes-fixed': 'no-fixed';
		return(
			<nav className={text} id="nav-container" dangerouslySetInnerHTML={{__html: this.state.navData}} />
		);
	},

    	_handleScroll: function(e){
		var currentScrollPos = getMainNavState().scrollPos;
		var triggerPos = document.getElementById('splash-container').offsetHeight;

		if(currentScrollPos >= triggerPos) this.setState({ fixed: true });
		else this.setState({ fixed: false });
	},
	_onChange: function(){
		this.setState(getMainNavState());
	}
});

module.exports = MainNav;
