# Imperial Unit Converter

A simple message board application that allows for the creation of boards for specific topic, post threads on boards, and leave replies to posts.

CRUD application built for one of the FreeCodeCamp Backend challanges.

Node / express app built with MongoDB / Mongoose for data persistance

## Live Demo
[https://oddert-fcc-backend-message-board.glitch.me/](https://oddert-fcc-backend-message-board.glitch.me/)

## Installation
```
$ git clone https://github.com/Oddert/fcc-backend-message-board.git
$ cd fcc-backend-message-board
$ npm i
```
### For development
```
$ npm run dev
```
### For a production build
```
$ npm start
```

## Scripts
| script | command                                        | action
|--------|------------------------------------------------|------------------------------------------------|
| start  | node app.js                                    | runs the server                                |
| dev | nodemon app.js                                 | runs the server with auto restart              |

# Routes
| Route  | Method | Param | Query | Body | Returns
|--------|--------|-------|-------|------|---------|
| /  | GET | | | | returns a basic html page to interact with the API |
| /board/seed  | GET |  | |  | Creates two default boards, returns a redirect to home
| /admin/board/new  | POST |  | | Attributes required for a new board (see models/Board) | Creates a board and redirects to /
| /b/:board_name  | GET | board_name {String}: the name of the board to view |  | | The board with populated threads
| /b/:board_name/:thread_id  | GET | board_name {String}: the name of the board the thread bellongs to. thread_id {String}: The id of the specific thread to view. |  | | Renders a thread with all replies populated
| /api/replies/:board_id  | GET |  |  | | A json object with all the replies for a particular board.
| /api/replies/:board_id  | POST | board_id {String}: The board the thread exists on |  | thread_id {String}: The specific thread to post a responce to. All other attributes needed for a new reply (see models/Reply) | Posts a reply to the specific thread, redirects to the thread posted on 
| /api/replies/:board_id  | PUT | thread_name {String}: The thread the board bellongs to. reply_id {String}: The reply to report. |  |  | Signs a reply as reported and sends success or error message
| /api/threads/:board_name  | GET | board_name {String}: The name of the board to get threads from |  |  | An object containing all threads on that board.
| /api/threads/:board_id  | POST | board_id {String}: The board to create the thread on |  | required attributes for a new thread (see models.Thread) | Creates a thread on a board and redirects to that board
| /api/threads/:board_id  | PUT | board_id {String}: The board to be reported | | thread_id {String}: The thread the board bellongs to | Signs a board as reported and sends success or error message
| /api/threads/:board_id  | DELETE | board_id {String}: The id of the board on which the target thread exists | | thread_id: The specific isd for the threat to delete. delete_password: the passwrod to authorised the delete if matching the thread. | Deletes a given thread if the password suplpied matches
| /:thread_name/:reply_id  | DELETE | thread_name {String} The thread the reply exists on. reply_id {String}: The reply to be deleted. |  |  | Deletes a reply. Redirects backwards
---
