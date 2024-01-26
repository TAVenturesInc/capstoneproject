# TA Ventures Inc

#### [Text Adventure Game for Education](https://eecs.engineering.oregonstate.edu/capstone/submission/pages/viewSingleProject.php?id=vb6UGCzMnMAabuur)

There are 2 main parts to this project, each hosted in different websites: A TA Game Creator, and a TA Game Player.

TA Game Creator Website

- This should be fairly simple and easy to use; for non-techies
- User can register/login and view/edit their own created games
- The output of the Creator is a large json file that contains all info for the TA Game (but the user never sees this)
- The json file should include all game elements: Description, rooms, objects, inventory, npc's, puzzles, actions, educational asides, etc.
- A series of forms can be used to create/edit a new game, including all the elements above
  - There should be some way to easily jump around and edit what has been created so far.
  - One way could be a separate window that has a set of hierarchical links. Clicking a link takes you to a form for that element.
    Or use something graphical, like a map
- A test button opens a new window (TA Game Player) where you can test your work so far
- A publish button creates the final json file and publishes it on the web server for public use

#### TA Game Player Website

- A user (student) can visit the site and choose from a series of TA games
- Or a user can scan a QR code or click a link and immediately be taken to the Player loaded with a game
- Either the entire game is hosted client-side, or game state info is stored in cookies and passed back and forth, or game state is stored server side while the game is played. What are the trade-offs? What is best-practice?

#### Stretch Goals

- Images are uploaded in the TA Game Creator and are displayed in the TA Game Player page
- Responsive website for the Player that works on mobile.
- The Player is an actual mobile app.
- Different publishing options: public or private. Private games must use a link or QR code for distribution. Anyone can find a list of public games on one of the TA Game Player pages.
  A rating system for public published games.

## How to start server Django Server:

1. `python3 manage.py runserver`

## How to start the React front:

1. `<fill in>`
