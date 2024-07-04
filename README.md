## Express.Js Generic Repository Pattern

Using Express.js, I aimed to interact with the Google Books API using a generic repository pattern and allow users to add books to their bookmarks by registering and logging in with their email and password.

## Technologies Used

- Typescript
- Sequelize
- googleapis
- jsonwebtoken
- mysql
- redis
- zod

## Installation

Steps required to run the project:

1. Clone this project on your computer

```bash
$ git clone https://github.com/ertugrulemrecihan/expressjs-generic-repository-pattern.git
```

2. Open terminal and write this command

```bash
$ npm install
```

3. Create a new '.env' file and fill it according to .env.sample
4. Run the docker command to get the database and redis running in your project.

```bash
$ docker-compose --env-file ./.env up
```

## Usage

1. Run the following command to run the project.

```bash
$ npm run build
$ npm start
```

2. Test API Endpoints in Postman
   [<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/14572817-8c7ba612-47e1-4a73-b796-99f2a7fc01d4?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D14572817-8c7ba612-47e1-4a73-b796-99f2a7fc01d4%26entityType%3Dcollection%26workspaceId%3D82d870f9-5b20-4578-b357-feb611933028#?env%5BToken%5D=W3sia2V5IjoidG9rZW4iLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJhbnkiLCJzZXNzaW9uVmFsdWUiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKa1lYUmhJanA3SW1sa0lqb3hMQ0psYldGcGJDSTZJbTFsY21GcmJHbGpiMlJsY2tCbmJXRnBiQzVqYjIwaWZTd2lhV0YwSWpveE56SXdNVEF4TmpjMExDSmxlSEFpT2pFMy4uLiIsInNlc3Npb25JbmRleCI6MH1d)
