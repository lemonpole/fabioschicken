var keyMirror = require('keymirror');

module.exports = {
	RoutePaths: {
		ROOT_PATH: '/'
	},
	ActionTypes: keyMirror({
		RECEIVE_BLOGINFO: null,
		RECEIVE_PRIMARYNAV: null,
	}),
	WebAPI: {
		API_ROOT: 'http://fabioschicken.dev/wp-admin/admin-ajax.php?action='
	}
};
