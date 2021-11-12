# Working with the RWT Challenge Toolbox Prototype

## Clone the repo

## Add dependencies in package.json to node_modules 
yarn install

# Running the unit tests
npm run tests
yarn tests

# Running the website locally

## Build to dist folder
yarn build 

## Start local server and go to file
parcel <_path to file>
parcel ./src/modals/challenge.html
parcel ./src/modals/celebrate.html

Go to: http://localhost:1234 

** You have to delete the .babelrc file for this to work! Please remember to add it back after ;-) **

NB Power-up state is stored by Trello. Locally there is no persistent storage.


