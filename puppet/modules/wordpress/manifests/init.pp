class wordpress::install {
	# Create the Wordpress database
	exec { 'create-database':
		unless  => '/usr/bin/mysql -u root -pvagrant wordpress',
		command => '/usr/bin/mysql -u root -pvagrant --execute=\'create database wordpress\'',
	}
	exec { 'create-user':
		unless  => '/usr/bin/mysql -u wordpress -pwordpress wordpress',
		command => '/usr/bin/mysql -u root -pvagrant --execute="GRANT ALL PRIVILEGES ON wordpress.* TO \'wordpress\'@\'localhost\' IDENTIFIED BY \'wordpress\'"',
	}

	# Get a new copy of the latest wordpress release
	exec { 'download-wordpress':
		command => '/usr/bin/wget http://wordpress.org/latest.tar.gz',
		cwd     => '/vagrant/',
		creates => '/vagrant/latest.tar.gz'
	}
	exec { 'untar-wordpress':
		cwd     => '/vagrant/',
		command => '/bin/tar xzvf /vagrant/latest.tar.gz',
		require => Exec['download-wordpress'],
		#creates => '/vagrant/wordpress',
	}
	exec { 'delete-wordpress-tar':
		cwd     => '/vagrant/',
		command => '/bin/rm /vagrant/latest.tar.gz',
		require => Exec['untar-wordpress'],
	}

	# Import a MySQL database for a basic wordpress site.
	file { '/tmp/wordpress-db.sql':
		#source => 'puppet:///modules/wordpress/wordpress-db-${db_suffix}.sql'
		source => sprintf('puppet:///modules/wordpress/wordpress-db-%s.sql', $db_suffix)
	}
	exec { 'load-db':
		command => '/usr/bin/mysql -u wordpress -pwordpress wordpress < /tmp/wordpress-db.sql && touch /home/vagrant/db-created',
		creates => '/home/vagrant/db-created',
	}

	# Copy a working wp-config.php file for the vagrant setup.
	file { '/vagrant/wordpress/wp-config.php':
		source => 'puppet:///modules/wordpress/wp-config.php'
	}

	# Create the Wordpress Unit Tests database
	exec { 'create-tests-database':
		unless  => '/usr/bin/mysql -u root -pvagrant wp_tests',
		command => '/usr/bin/mysql -u root -pvagrant --execute=\'create database wp_tests\'',
	}
	exec { 'create-tests-user':
		unless  => '/usr/bin/mysql -u wordpress -pwordpress',
		command => '/usr/bin/mysql -u root -pvagrant --execute="GRANT ALL PRIVILEGES ON wp_tests.* TO \'wordpress\'@\'localhost\' IDENTIFIED BY \'wordpress\'"',
	}

	# Copy a working wp-tests-config.php file for the vagrant setup.
	file { '/vagrant/wordpress/wp-tests-config.php':
		source  => 'puppet:///modules/wordpress/wp-tests-config.php',
		require => Exec['untar-wordpress'],
	}
}
