# Working with the RTW Challenge Toolbox Prototype

Welcome to the Responsible Tech Work Trello Prototype.

## Set up
    git clone https://github.com/ResponsibleTechWork/challenge-toolbox-prototype.git
    yarn install

## Working with the prototype
    yarn build
    yarn build --public-url ./
    yarn tests

Commit updates to the main branch. The Trello Power-Up points at the trello branch. To update this branch, make a pull request.

We each have a directory for experimenting under play/. To run this locally:

    parcel <path to file>
    parcel ./src/modals/challenge.html
    parcel ./src/modals/celebrate.html

Parcel creates a new server endpoint at: http://localhost:1234 

NB Power-up state is stored by Trello. Locally there is no persistent storage.

## gh-pages

The Trello Power-Up (rtw-challenge-toolbox-prototype) is served from a GitHub page: https://responsibletechwork.github.io/challenge-toolbox-prototype/.

For more on configuring the Trello Power-Up: https://trello.com/power-ups/61891dc2d6918449e3c28bdc/edit

The gh-pages branch must contain only "public" directory files. To push the "public" directory to gh-pages branch use:

    git subtree push --prefix public origin gh-pages
    git push origin `git subtree split --prefix public main`:gh-pages --force

From https://clontz.org/blog/2014/05/08/git-subtree-push-for-deployment/

*** WARNING !! CURRENT BUILD TO PUBLIC DOES NOT USE CORRECT URLS - THESE MUST BE CHANGED MANUALLY !! ***