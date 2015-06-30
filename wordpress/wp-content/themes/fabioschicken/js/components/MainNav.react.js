var React = require('react');

function getMainNavState(){
	return({
		scrollPos: document.documentElement.scrollTop || document.body.scrollTop,
		currentClass: 'relative',
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
		return(
			<nav className={this.state.currentClass} id="nav-container">
				<ul>{this.state.items.map(function(m, index){
					return <li><a href="#">{m}</a></li>
				})}</ul>
			</nav>
		);
	},

    	_handleScroll: function(e){
		var currentScrollPos = getMainNavState().scrollPos;
		var triggerPos = document.getElementById('splash-container').offsetHeight;

		if(currentScrollPos >= triggerPos) this.setState({ currentClass: 'fixed' });
		else this.setState({ currentClass: 'relative' });
	}
});

module.exports = MainNav;
