# ECSE428 Project Backend

## API Documentation

### Task

#### Get All Tasks

Endpoint: GET `/tasks/:username`  
Body: No message required in body  
Response: Array of all the tasks in the database for that given user with owner: username

#### Get Task by Id

Endpoint GET `/task/:id`  
Body: No message required in body  
Response: Object of the task item with the provided id.  
Id must be the standard 24 character id issued by MongoDB.  
If no item with provided id exists, returns empty response.  
If incorrect id characters, returns the error message:  
`Argument passed in must be a single String of 12 bytes or a string of 24 hex characters`

#### Add New Task

Endpoint: POST `/task/new`  
Body: Object of the task to be added  
Body Example:

```json
{
  "task": {
    "name": "Test112",
    "ownerUser": "Orange",
    "password": "123456789",
    "course": "FALL2023",
    "status": "COMPLETED",
    "dueDateTime": "2015-03-25T12:00:00Z"
  }
}
```

Response: Returns the added task along with the auto assigned id by mongoDB.  
Example Response:

```json
{
  "name": "Test112",
  "ownerUser": "Orange",
  "password": "123456789",
  "course": "FALL2023",
  "status": "COMPLETED",
  "dueDateTime": "2015-03-25T12:00:00Z",
  "_id": "617e046897542f914594f9f6"
}
```

#### Delete Task

Endpoint: DELETE `/task/delete`  
Body: `_id` parameter inside a task object that is to be deleted.  
Body Example:

```json
{
  "task": {
    "_id": "617c5875352e0043e8e0a928"
  }
}
```

Response: Success object received from Mongodb when delete operation is performed. Note that `n` in this reponse denotes the number of items deleted. As such, when `n: 0` that means no items are deleted, possibly due to incorrect `_id`. For a successful delete, `n` is 1.  
Response Example:

```json
{
  "n": 1,
  "opTime": {
    "ts": "7025073836206850051",
    "t": 99
  },
  "electionId": "7fffffff0000000000000063",
  "ok": 1,
  "$clusterTime": {
    "clusterTime": "7025073836206850051",
    "signature": {
      "hash": "rfhCRi/ge111MflPoEBIovepASs=",
      "keyId": "6959644085376253953"
    }
  },
  "operationTime": "7025073836206850051"
}
```

#### Delete All Tasks

Endpoint: DELETE `/task/delete-all`  
Body: No body required.  
Response: Success object received from Mongodb when delete operation is performed. Note that `n` in this reponse denotes the number of items deleted. As such, when `n: 0` that means no items are deleted, possibly due to incorrect `_id` (provided that the collection is not empty to start with). For a successful delete, `n` is greater than 0 if items already exist in the database.  
Response Example:

```json
{
  "n": 1,
  "opTime": {
    "ts": "7025073836206850051",
    "t": 99
  },
  "electionId": "7fffffff0000000000000063",
  "ok": 1,
  "$clusterTime": {
    "clusterTime": "7025073836206850051",
    "signature": {
      "hash": "rfhCRi/ge111MflPoEBIovepASs=",
      "keyId": "6959644085376253953"
    }
  },
  "operationTime": "7025073836206850051"
}
```

#### Update Task

This API can be used to modify any property of a task. In particular, properties that can be updated are: `name`, `course`, `status`, `dueDateTime`.  
Properties that cannot be updated using this api are: `_id`, `ownerUser`.  
Endpoint: POST `/task/update`  
Body: Property value(s) that need to be updated for a task along with the `_id` property.  
Body Example:  
Updating individual parameter:

```json
{
  "task": {
    "_id": "617e03c186fde990d0ae1a5b",
    "course": "FALL2021"
  }
}
```

Updating multiple parameters at once:

```json
{
  "task": {
    "_id": "617e03c186fde990d0ae1a5b",
    "course": "FALL2021",
    "name": "Updated Name",
    "status": "COMPLETED"
  }
}
```

Response: Same as body sent.

#### Set Course for Task

Sets the `course` property of a task to a valid (i.e. existing) course's `_id`.  
Endpoint: POST `/task/setcourse`  
Body: The taskId for the task which needs to have the course's id and the courseId to be set. Must be sent as body in the exact format as shown in the example below.  
Body Example:

```json
{
  "taskId": "617e0351864de910d0ae1a5b",
  "courseId": "61750d6663317d304df374fd"
}
```

Response: If successful in setting `course: courseId` for the task with `taskId`, returns the result object as returned by MongoDb. If `taskId` or `courseId` does not exist, returns an error message.  
Example Response:  
On Success:

```json
{
  "n": 1,
  "nModified": 1,
  "opTime": {
    "ts": "7025093726200397833",
    "t": 99
  },
  "electionId": "7fffffff0000000000000063",
  "ok": 1,
  "$clusterTime": {
    "clusterTime": "7025093726200397833",
    "signature": {
      "hash": "/DgQyULcIXJYA23lPxfLL9DjxPM=",
      "keyId": "6959644085376253953"
    }
  },
  "operationTime": "7025093726200397833"
}
```

On Failure:  
Task with provided `taskId` does not exist:  
`The task with the provided id does not exist.`  
Course with provided `courseId`does not exist:  
`The course with the provided id does not exist.`

### Course

#### Get All Courses

Endpoint: GET `/courses`  
Body: No message required in body.
Response: Array of all the courses in the database

#### Get Course by Id

Endpoint: GET `/course/:id`  
Body: Object of the course item with the provided id.  
Id must be the standard 24 character id issued by MongoDB.  
If no item with provided id exists, returns empty response.  
If incorrect id characters, returns the error message:  
`Argument passed in must be a single String of 12 bytes or a string of 24 hex characters`

#### Add New Course

Endpoint: POST `/course/new`  
Body: Object of the course to be added.  
Body Example:

```json
{
  "course": {
    "code": "ECSEXXX",
    "name": "TestCourse",
    "ownerUser": "Orange",
    "password": "123456789",
    "term": "Fall2022"
  }
}
```

Response: Returns the added course along with the auto assigned id by mongoDB.  
Example Response:

```json
{
  "code": "ECSEXXX",
  "name": "TestCourse",
  "term": "Fall2022",
  "_id": "617e275e3f36b599e013acfb"
}
```

#### Delete Course

Endpoint: DELETE `/task/delete`  
Body: `_id` parameter inside a course object that is to be deleted.  
Body Example:

```json
{
  "course": {
    "_id": "617e275e3f36b599e013acfb"
  }
}
```

Response: Success object received from Mongodb when delete operation is performed. Note that `n` in this reponse denotes the number of items deleted. As such, when `n: 0` that means no items are deleted, possibly due to incorrect `_id`. For a successful delete, `n` is 1.  
Response Example:

```json
{
  "n": 1,
  "opTime": {
    "ts": "7025099077729648647",
    "t": 99
  },
  "electionId": "7fffffff0000000000000063",
  "ok": 1,
  "$clusterTime": {
    "clusterTime": "7025099077729648647",
    "signature": {
      "hash": "CiWgFVWigzbqQrDDmHm0r6RYMH4=",
      "keyId": "6959644085376253953"
    }
  },
  "operationTime": "7025099077729648647"
}
```

#### Delete All Courses

Endpoint: DELETE `/course/delete-all`  
Body: No body required.  
Response: Success object received from Mongodb when delete operation is performed. Note that `n` in this reponse denotes the number of items deleted. As such, when `n: 0` that means no items are deleted, possibly due to incorrect `_id` (provided that the collection is not empty to start with). For a successful delete, `n` is greater than 0, if items already exist in the database.  
Response Example:

```json
{
  "n": 1,
  "opTime": { "ts": "7025073836206850051", "t": 99 },
  "electionId": "7fffffff0000000000000063",
  "ok": 1,
  "$clusterTime": {
    "clusterTime": "7025073836206850051",
    "signature": {
      "hash": "rfhCRi/ge111MflPoEBIovepASs=",
      "keyId": "6959644085376253953"
    }
  },
  "operationTime": "7025073836206850051"
}
```

#### Logging out

Endpoint: PUT `/user/logout`  
Body: user id  
Response: lastLogin field will be set to 0 and user will be informed with successfully logged out.  
Response Example:

```json
{
  "_id": { "$oid": "61926e981c240b841ee09694" },
  "username": "markburger",
  "name": "User B",
  "password": "5678",
  "lastLogin": { "$numberInt": "0" }
}
```

## For Group 7 Devs:

To run the server:

1. `npm install`
2. `npm start`

A new account for MongoDb is created and the database is integrated.
To access the account in case you wish to see the data in the database:

1. Access [MongoDB](https://account.mongodb.com/account/login)
2. Enter account credentials: email: `talhariaz3077@live.com`, password: `ECSE428Project`
3. Go to Databases > Browse Collections.

AddTask API is also added. You can download [Postman](https://www.postman.com/) to query API endpoints.

To use the AddTask API:

1. Start the server
2. Open Postman
3. Make a POST request to `localhost:8080/task/new`
4. Select Body tab, select RAW JSON and add a task, for example:

`{ "task": { "name":"another9", "ownerUser": "user1", "course":"ecse428", "status":"IN_PROGRESS" } }`

5. Click Send button
6. You will be able to see the new task under tasks the MongoDb account.

Feel free to update the README as required.

Cheers :)
