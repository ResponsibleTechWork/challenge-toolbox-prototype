# Working with the RTW Challenge Toolbox Prototype

Welcome to the Responsible Tech Work Trello Prototype.

## Set up
    git clone https://github.com/ResponsibleTechWork/challenge-toolbox-prototype.git
    yarn install

## Working with the prototype
    yarn build
    yarn tests

Commit updates to the main branch. The Trello Power-Up points at the trello branch. To update this branch, make a pull request.

We each have a directory for experimenting under play/. To run this locally:

    parcel <path to file>
    parcel ./src/modals/challenge.html
    parcel ./src/modals/celebrate.html

Parcel creates a new server endpoint at: http://localhost:1234 

NB Power-up state is stored by Trello. Locally there is no persistent storage.