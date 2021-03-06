.PHONY: setup start test testCoverage openCoverage installDependencies exportVault help echo vaultLogin createDemo
default: start

INJECT_FILE_SRC="inject.template.js"
INJECT_FILE_DST="public/env.js"

export REACT_APP_LAUNCH_DARKLY_ID = $(shell vault kv get -field=REACT_APP_LAUNCH_DARKLY_ID secret/m10/servicenet/frontEnd/featureBranch)
export REACT_APP_ENV = local

start: exportVault installDependencies
	npm run start

test: installDependencies
	npm run test

testCoverage: installDependencies
	npm run test:coverage

installDependencies: ## Installs the dependencies required 
	npm config set registry https://artifactory.awsmgmt.massmutual.com/artifactory/api/npm/npm-virtual/ 
	npm install --prefer-offline --no-audit --loglevel silent --no-optional

exportVault:
	envsubst < "$(INJECT_FILE_SRC)" > "$(INJECT_FILE_DST)"

openCoverage: ## Opens up the coverage report generated by 
	open coverage/lcov-report/index.html

