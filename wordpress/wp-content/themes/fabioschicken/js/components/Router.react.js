var React = require('react');
var Page = require('page');

var Router = React.createClass({
	getInitialState: function(){
		return {
			component: <div />
		}
	},
	componentDidMount: function(){
		var self = this;

		this.props.routes.forEach(function(route){
			var Component = route[1];
			Page(route[0], function(ctx){
				self.setState({ component: <Component params={ctx.params} querystring={ctx.querystring} /> });
			});
		});

		Page.start();
	},
	render: function(){
		return this.state.component;
	}
});

module.exports = Router;
