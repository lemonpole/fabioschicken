# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
	# general config
	config.vm.box = "ubuntu/trusty32"
	#config.vm.synced_folder "src/", "/vagrant/wordpress", :create => true

	# setup virtual hostname and provision local IP
	config.vm.network :forwarded_port, guest: 80, host: 8080
	config.vm.hostname = 'fabioschicken.dev'
	config.hostmanager.enabled = true
	config.hostmanager.manage_host = true
	config.hostmanager.ignore_private_ip = false
	config.hostmanager.include_offline = true
	config.vm.define 'fabioschicken.dev' do |node|
		node.vm.hostname = 'fabioschicken.dev'
		node.vm.network :private_network, ip: '192.168.42.43'
		node.hostmanager.aliases = 'www.fabioschicken.dev'
	end

	# allows running commands globally in shell for installed composer libraries
	config.vm.provision :shell, path: "files/scripts/setup.sh"

	# setup puppet
	config.vm.provision :puppet do |puppet|
		puppet.facter = {
			"db_suffix" => ENV['DB_SUFFIX'].nil?? 'fresh': ENV['DB_SUFFIX']
		}

		puppet.manifests_path = "puppet/manifests"
		puppet.module_path = "puppet/modules"
		puppet.manifest_file  = "init.pp"
	end
end
