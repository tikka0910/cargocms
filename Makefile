deploy-production-docker:
	- ssh jenkins@localhost docker rm -f sails_sample_prod
	ssh jenkins@localhost docker run -d --name sails_sample_prod -p 8800:1337 agileworks/sails_sample_prod

deploy-production-legacy:
	ssh jenkins@localhost mkdir -p ~/deploy/production
	scp sailsSampleProd.tar.gz jenkins@localhost:~/deploy/production
	tar -C ~/deploy/production/ -vxf ~/deploy/production/sailsSampleProd.tar.gz

package-production:
	- rm sailsSampleProd.tar.gz
	tar cvf ./sailsSampleProd.tar.gz ./

restart-production:
	- ssh jenkins@localhost cd ~/deploy/production && pm2 delete production
	ssh jenkins@localhost  cd ~/deploy/production && NODE_ENV=production pm2 start -f app.js --name 'production'

e2e-test-with-docker:
	- docker run --name selenium-firefox -d -p 4444:4444 -p 5900:5900 selenium/standalone-firefox-debug:2.53.0
	npm run test-e2e-docker

preview:
	- pm2 stop cargo-preview
	- pm2 delete cargo-preview
	pm2 start app.js --name cargo-preview
