
# crud-angular-spring


The project boils down to a course management service, where you can create courses and associate them with your definitive classes.

## API Reference

#### Get all course

```SHELL
  GET /api/courses
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | **Required**. Run the server and the client |

#### Get course

```SHELL
  GET /api/courses/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `long` | **Required**. Id of course to fetch |

#### Crate course

```SHELL
  POST /api/courses
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Name, Category, Status and Lessons`      | `JSON` | **Required**. Parameters to create a course |

#### Update course

```SHELL
  PUT /api/courses/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Name, Category, Status and Lessons`      | `JSON, long` | **Required**. Parameters to create a course and ID to update|

#### Delete course

```SHELL
  DELETE /api/courses/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `ID`      | `long` | **Required**. Id of course to delete|


## Tech Stack

**Client:** Angular, Angular Material, TypeScript

**Server:** Java, Spring Boot, H2 Database

