var React = require('react');

function getMainNavState(){
	return({
		scrollPos: document.documentElement.scrollTop || document.body.scrollTop,
		fixed: false,
		items: ['Home', 'Services', 'About', 'Contact Us']
	});
}

var MainNav = React.createClass({
	getInitialState: function(){
		return getMainNavState();
	},
    	componentDidMount: function(){
		window.addEventListener('scroll', this._handleScroll);
	},
	componentWillUnmount: function(){
		window.removeEventListener('scroll', this._handleScroll);
	},
	render: function(){
		var text = (this.state.fixed)? 'yes-fixed': 'no-fixed';
		return(
			<nav className={text} id="nav-container">
				<ul>{this.state.items.map(function(m, index){
					return <li><a href="#">{m}</a></li>
				})}</ul>
			</nav>
		);
	},

    	_handleScroll: function(e){
		var currentScrollPos = getMainNavState().scrollPos;
		var triggerPos = document.getElementById('splash-container').offsetHeight;

		if(currentScrollPos >= triggerPos) this.setState({ fixed: true });
		else this.setState({ fixed: false });
	}
});

module.exports = MainNav;
