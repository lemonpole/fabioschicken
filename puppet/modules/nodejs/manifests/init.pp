class nodejs::install {
	package {[
		'nodejs',
		'npm'
	]:
		ensure => installed,
	}
}
