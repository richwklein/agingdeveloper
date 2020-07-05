buildDir := public
modulesDir :=node_modules
cacheDir :=.cache
lockFile :=package-lock.json

.DEFAULT_GOAL := help

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Install npm dependencies
	@echo "Installing Node dependencies."
	@npm install
	@npm install -g prettier

uninstall: clean ## Uninstall npm dependencies
	@echo "Removing $(cacheDir) directory."
	rm -rdf $(cacheDir)
	@echo "Uninstalling npm dependencies."
	rm -rdf $(modulesDir)
	@echo "Removing package lock file."
	rm -f package-lock.json

production: ## Create a production build
	@echo "Creating production build."
	@npx gatsby build

clean: ## Remove the build directory
	@echo "Removing $(buildDir) directory."
	rm -rdf $(buildDir)

develop: ## Start the development server
	@echo "Starting the development server."
	@npx gatsby develop

serve: ## Serve the production build
ifneq ($(wildcard $(buildDir)),)
	@echo "Serving production build."
	@npx gatsby serve
else
	@echo "Could not find build directory. Run 'make build' first."
endif

check: ## Run tests to check build
	@echo "Running tests."
