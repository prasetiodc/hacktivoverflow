# hacktivoverflow

## Project setup
```
npm install
```
## Compiles

```javascript
-server
npm run dev

-client
npm run serve
```

## Routes Users
|Routes|HTTP Method|Request|Response|Description| 
|----|----|----|----|----|----|
|/user  |POST  |fullname: String, email: String,  password: String |Success: {object},<br /> Error: Internal server error |Register a user|
|/user/login  |POST  |email: String , password: String |Success: {object},<br/>Error: Internal server error |User login |
|/user/:id  |GET  |id: String  |Success: {object}, <br />Error: Internal server error | User profile|
|/user/:id  |DELETE  |id: String  |Success: Delete Success (String), <br />Error: Internal server error | Delete a user|

## Routes Questions
|Routes|HTTP Method|Request|Response|Description|
|----|----|----|----|----|----|
|/questions  |GET  |none|Success: {object},<br /> Error: Internal server error|Get all question|
|/questions/:id  |GET  |id: String|Success: {object},<br /> Error: Internal server error|Get a question|
|/questions/:id/user  |GET  |id: String|Success: {object},<br /> Error: Internal server error|Get all question a user|
|/questions  |POST  |title : String, <br /> description: String|Success: {object},<br /> Error: Internal server error | Create a question|
|/questions/:id  |PUT  |id : String, <br /> title : String, <br /> description: String| Success: {object}, <br />Error: Internal server error |Update a question|
|/questions/:id  | DELETE  |id : String |Success: Delete success,<br /> Error: Internal server error |Delete a question|
|/questions/:id/upvote  |PATCH  |id: String|Success: {object},<br /> Error: Internal server error|Update upvote value in a question|
|/questions/:id/downvote  |PATCH  |id: String|Success: {object},<br /> Error: Internal server error|Update downvote value in a question|


## Routes Answers
|Routes|HTTP Method|Request|Response|Description| 
|----|----|----|----|----|----|
|/answers  |GET  | token : String  |Success: [ {object} ], <br />Error: Internal server error | Get all answer|
|/answers  |POST  |token : String <br/> title : String, <br /> description: String  |Success: {object}, <br />Error: Internal server error | Add answer to question|
|/answers/:id | PUT  | id : String, token : String <br/> title : String, <br /> description: String  |Success: {object},<br /> Error: Internal server error | Update a answer| 
|/answers/:id/upvote  |PATCH  |id: String|Success: {object},<br /> Error: Internal server error|Update upvote value in a answer|
|/answers/:id/downvote  |PATCH  |id: String|Success: {object},<br /> Error: Internal server error|Update downvote value in a answer|
