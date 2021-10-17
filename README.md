## System requirements

- Node 14+
- npm 8.0.0

## How to run

- Create `backend/.env` file from the `backend/example.env` file and populate values for those variables.
- Install all the backend dependencies using `npm install` in backend directory
- To navigate to backend directory use `cd backend/`
- Run backend in development mode using command `npm run dev`
- Run backend tests using command `npm run test`
- Install all the frontend dependencies using `npm install` in frontend directory
- To navigate to frontend directory use `cd frontend/`
- Run frontend in development mode using command `npm start`

## Project video

- [Project video](https://drive.google.com/file/d/1H8XAY-hYI8dD93nu-JJY9LykavHvg1gQ/view?usp=sharing)

## Tech stack

Used number of open source projects to work properly:

- For frontend:

  - React & Redux with TypeScript
  - Material UI

- For backend:
  - Node.js (Express)
  - MongoDB with Mongoose
  - Jest for unit testing

## Sample tokens

Admin token: `qweQj4giRJSdMNzB8g1XIa6t3YtRIHPH`
User token: `Q5rhN18LObM8nzegvvLpIqd685svJpD2`

## Routes

# User

- Creates new user

  - POST `/api/v1/user`
  - Body:

  ```
    {
    "email": "random_user_email@gmail.com",
    "name": "Random_name"
    }
  ```

  - Response:

  ```
    {
        "success": true,
        "data": {
            "id": "616c5d7eeabb491924f8e8f7"
        }
    }
  ```

- Get all users

  - GET `/api/v1/user`

- Read user by Id

  - GET `/api/v1/user/616c5d7eeabb491924f8e8f7`
  - Response:

  ```
   {
       "success": true,
       "data": {
           "name": "Random_name",
           "email": "random_user_email@gmail.com",
           "password": "1nONJG",
           "token": "y8CrCiqsfeDu3UuxC5HGxFnKEVwCgviG",
           "maxCalories": 2100,
           "role": "user",
           "createdAt": "2021-10-17T17:13:46.535Z",
           "updatedAt": "2021-10-17T17:13:46.535Z",
           "id": "616c5d7eeabb491924f8e8f7"
       }
  }
  ```

- Update user by Id

  - PUT `/api/v1/user/616c5d7eeabb491924f8e8f7`
  - Body:

  ```
  {
  "maxCalories": 2500
  }
  ```

- Delete user by Id
  - DELETE `/api/v1/user/616c5d7eeabb491924f8e8f7`

# Meal

- Creates new meal

  - POST `/api/v1/meal`
  - Body:

  ```
    {
    "type": "brunch",
    "maxAllowed": 1
    }
  ```

  - Response:

  ```
    {
    "success": true,
    "data": "616c5dabeabb491924f8e8fb"
    }
  ```

- Get all meals

  - GET `/api/v1/meal`

- Read meal by Id

  - GET `/api/v1/meal/616c5dabeabb491924f8e8fb`
  - Response:

  ```
   {
        "success": true,
        "data": {
            "type": "brunch",
            "maxAllowed": 1,
            "createdAt": "2021-10-17T17:21:28.884Z",
            "updatedAt": "2021-10-17T17:22:49.328Z",
            "id": "616c5dabeabb491924f8e8fb"
        }
   }
  ```

- Update meal by Id

  - PUT `/api/v1/user/616c5dabeabb491924f8e8fb`
  - Body:

  ```
  {
    "type": "brunch",
    "maxAllowed": 3
  }
  ```

- Delete meal by Id
  - DELETE `/api/v1/user/616c5dabeabb491924f8e8fb`

# FoodEntry

- Creates new food entry

  - POST `/api/v1/foodEntry`
  - Body:

  ```
    {
    "meal":"616c5dabeabb491924f8e8fb",
    "name": "banana",
    "date": "2021-10-13",
    "time": 1000,
    "calories": 2000,
    "user": "616c5d7eeabb491924f8e8f7"
   }
  ```

  - Response:

  ```
    {
    "success": true,
    "data": "616c5de9eabb491924f8e902"
    }
  ```

- Get all foodentries(paginated)

  - GET `/api/v1/foodEntry?page=0`

- Read foodentry by Id

  - GET `/api/v1/foodEntry/616c5de9eabb491924f8e902`
  - Response:

  ```
   {
        "success": true,
        "data": {
            "name": "banana",
            "date": "2021-10-13",
            "time": 1000,
            "calories": 2000,
            "user": "616c5d7eeabb491924f8e8f7",
            "meal": "616c5dabeabb491924f8e8fb",
            "createdAt": "2021-10-17T17:31:21.979Z",
            "updatedAt": "2021-10-17T17:31:21.979Z",
            "id": "616c5de9eabb491924f8e902"
        }
   }
  ```

- Get foodEntry of user(paginated)

  - GET `/api/v1/foodEntry/616c5d7eeabb491924f8e8f7?page=0`
  - Response:

  ```
  {
      "success": true,
      "data": {
          "count": 1,
          "page": 0,
          "perPage": 10,
          "rows": [
              {
                  "name": "banana",
                  "date": "2021-10-13",
                  "time": 780,
                  "calories": 100,
                  "user": {
                      "name": "Random_name",
                      "email": "random_user_email@gmail.com",
                      "password": "QvohMJ",
                      "token": "X51iS7i8rpbVof8ia2ZM42lyD6dVdYdw",
                      "maxCalories": 2100,
                      "role": "user",
                      "createdAt": "2021-10-17T17:29:34.170Z",
                      "updatedAt": "2021-10-17T17:29:34.170Z",
                      "id": "616c5d7eeabb491924f8e8f7"
                  },
                  "meal": {
                      "type": "brunch",
                      "maxAllowed": 1,
                      "createdAt": "2021-10-17T17:30:19.623Z",
                      "updatedAt": "2021-10-17T17:30:19.623Z",
                      "id": "616c5dabeabb491924f8e8fb"
                  },
                  "createdAt": "2021-10-17T17:31:21.979Z",
                  "updatedAt": "2021-10-17T17:34:28.333Z",
                  "id": "616c5de9eabb491924f8e902"
              }
          ]
      }
  }
  ```

- Update foodentry by Id

  - PUT `/api/v1/foodEntry/616c5de9eabb491924f8e902`
  - Body:

  ```
  {
    "time": 780,
    "calories": 100,
    "meal": "616c5dabeabb491924f8e8fb",
    "user": "616c5d7eeabb491924f8e8f7"
  }
  ```

- Delete foodentry by Id
  - DELETE `/api/v1/foodEntry/616c5de9eabb491924f8e902`

# Invite a Friend

- Invite a friend using email and name

  - POST `/api/v1/auth/signup`
  - Body:

  ```
  {
    "name": "parth",
    "email": "parthpatel@gmail.com"
  }
  ```

  - Response:

  ```
  {
        "success": true,
        "data": {
            "token": "nyM6vepKEKLelZ5sBHT8bhxpB19qNsu5",
            "password": "$2b$10$1AM8GkfCXqhqgSQg3E.WhO6RR7XGJStfeulUL.Rg5H5QvSeypdS4y"
        }
  }
  ```

  - Signin using token
  - POST `/api/v1/auth/login`
  - Body:

  ```
      {
          "token": "nyM6vepKEKLelZ5sBHT8bhxpB19qNsu5"
      }
  ```

  - Response:

  ```
  {
        "success": true,
        "user": {
            "name": "parth",
            "email": "parthpatel@gmail.com",
            "password": "$2b$10$1AM8GkfCXqhqgSQg3E.WhO6RR7XGJStfeulUL.Rg5H5QvSeypdS4y",
            "token": "nyM6vepKEKLelZ5sBHT8bhxpB19qNsu5",
            "maxCalories": 2100,
            "role": "user",
            "createdAt": "2021-10-17T17:39:46.101Z",
            "updatedAt": "2021-10-17T17:39:46.101Z",
            "id": "616c5fe2eabb491924f8e929"
        }
  }
  ```

# Report

- Get number of foodentries created in past week and past's past week report of admin

  - GET `/api/v1/report/foodEntries`
  - Response:

  ```
  {
      "success": true,
      "data": {
          "pastWeekCount": 28,
          "past2WeekCount": 1
      }
  }
  ```

- Get average calories added by each user in past 7 days report

  - GET `/api/v1/report/calories`
  - Response:

  ```
  {
      "success": true,
      "data": {
          "entries": [
              {
                  "_id": "616a830d53ee1d484079438d",
                  "average": 518
              },
              {
                  "_id": "616a830d53ee1d484079438a",
                  "average": 568
              },
              {
                  "_id": "616c5d7eeabb491924f8e8f7",
                  "average": 14
              }
          ]
      }
  }
  ```

- Get total number of calories added by user on each day - user report
  - GET `/api/v1/report/user/616c5d7eeabb491924f8e8f7`
  - Response:
  ```
  {
      "success": true,
      "data": {
          "entries": [
              {
                  "_id": "2021-10-13",
                  "sum": 100
              }
          ]
      }
  }
  ```

NOTE: Above requests and response are sample responses
