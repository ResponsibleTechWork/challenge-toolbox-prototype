# Working with the RTW Challenge Toolbox Prototype

Welcome to the Responsible Tech Work Trello Prototype.

## Set up

    git clone https://github.com/ResponsibleTechWork/challenge-toolbox-prototype.git
    yarn install

## Viewing files locally

(Some) Trello popups and (all) modals require independent html pages which are loaded in an iframe. These can be viewed locally (you will have to make allowances for Trello references especially the global variable t).

    parcel <path to file>

e.g. 

    parcel ./src/popups/board-buttons-popup-authors.html

Parcel creates a new server endpoint where the page can be viewed at: http://localhost:1234 

We each have a directory for experimenting under play.

## How to update the Trello Power-Up

The Trello Power-Up (rtw-challenge-toolbox-prototype) is served from a GitHub page.

The repo is at: https://github.com/ResponsibleTechWork/challenge-toolbox-prototype/tree/gh-pages.

1) To check the tests are all passing run the command:

    yarn tests

2) To update the Power-Up from the command line run:

    yarn build
    git commit -m 'commit message goes here…'
    yarn release

For more on configuring the Trello Power-Up: https://trello.com/Power-Ups/61891dc2d6918449e3c28bdc/edit.

NB Power-Up state is stored by Trello. Locally there is no persistent storage.

### More on gh-pages

The gh-pages branch must contain only "public" directory files. To push the "public" directory to gh-pages branch use:

    git subtree push --prefix public origin gh-pages
    git push origin `git subtree split --prefix public main`:gh-pages --force

From https://clontz.org/blog/2014/05/08/git-subtree-push-for-deployment/