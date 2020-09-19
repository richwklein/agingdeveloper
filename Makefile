buildDir :=public
modulesDir :=node_modules
lockFile :=package-lock.json

.DEFAULT_GOAL := help

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Install npm dependencies
	@echo "Installing Node dependencies."
	@npm install

uninstall: clean ## Uninstall npm dependencies
	@echo "Uninstalling npm dependencies."
	@rm -rdf $(modulesDir)
	@echo "Removing package lock file."
	@rm -f package-lock.json

build: ## Create a production build
	@echo "Creating production build."
	@npm run build

build-ci: ## Create a ci build
	@echo "Creating a CI build"
	@npm run build:ci
	
clean: ## Remove the build directory
	@echo "Removing build directories."
	@npm run clean

develop: ## Start the development server
	@echo "Starting the development server."
	@npm run develop

serve: ## Serve the production build
ifneq ($(wildcard $(buildDir)),)
	@echo "Serving production build."
	@npm run serve
else
	@echo "Could not find build directory. Run 'make build' first."
endif


check: ## Run tests to check build
	@echo "Running tests."
	@npm run test

format: ## Format source code
	@echo "Formating source code."
	@npm run format

lint: ## Lint source code
	@echo "Linting source code."
	@npm run lint
