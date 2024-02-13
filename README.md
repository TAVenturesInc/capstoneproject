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

## Dependencies

- Register an account with [MongoDB account](https://www.mongodb.com/)
- Within your cluster insert the database: `taventures`
  - Within `taventures` insert the collections: `game_data`, `users`, & `reviews`.
  - (Schema structure to be determined)
- After, from your command line run:
  - `touch server/config.env`
  - `vim server/config.env`
  - Then paste: `ATLAS_URI=mongodb+srv://<username>:<password>@sandbox.jadwj.mongodb.net/employees?retryWrites=true&w=majority
PORT=5000`
  - Fill in the `<username>` and `<password>` with your MongoDB account username and password.
  - Then paste on a new line below ATLAS_URI: JWT_SECRET=<yourSecretKey>
  - Fill in the `<yourSecretKey>` with a longm random string that serves as your JWT secret.


## How to Run localy:

1. Open two command line terminals from the project directory.
1. From the first run the commands:
   1. `cd server`
   1. `node server.js`
1. From the second run the commands:
   1. `cd client`
   1. `npm start`

## How to deploy:

1. Open account with `https://render.com/`
1. Deploy Frontend project
   1. Create New `Static Site`
   1. Connect the repository if it is not yet connected
   1. `Connect`
      1. Choose a site name.
      1. Build Command: `npm run install-client && npm run build-client`
      1. Publish Directory: `./client/build`
1. Deploy Backend project
   1. Create new `Web Service`
   1. Connect the repository if it is not yet connected
      1. Choose a service name.
      1. Runtime: `Node`
      1. Build Command: `npm run install-server`
      1. Start Command: `npm run start-server`
1. Add All Render IP addresses to MongoDB Atlas
   1. From the Backend Project select `Environment`
      1. Click `Connect`
      1. Copy all Outbound Static IP Addresses
   1. Open the MongoDB Atlas site.
      1. Select Network Access
      1. Add each IP address to the IP Access List
