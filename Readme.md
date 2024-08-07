# Blog API

## Overview

This API provides functionality for managing blog posts and comments. It includes user authentication and authorization features, allowing users to interact with posts and comments. Admins have additional privileges for managing posts.

## User Credentials

### User Credentials

- **User**
  - **Email:** gojo@gmail.com
  - **Password:** gojo12345

- **Admin**
  - **Email:** lisa@gmail.com
  - **Password:** lisa12345

## API Endpoints

### Authentication

- **Login**
  - **Endpoint:** `POST users/login`
  - **Description:** Authenticate users and admins. Returns a JWT token.
  - **Request Body:**
    ```json
    {
      "email": "user@example.com",
      "password": "userpassword"
    }
    ```
- **Register**
  - **Endpoint:** `POST users/register`
  - **Description:** Register a new user.
  - **Request Body:**
    ```json
    {
      "email": "user@example.com",
      "password": "userpassword"
    }
    ```

### Posts

- **Create Post**
  - **Endpoint:** `POST posts/addPost`
  - **Description:** Create a new blog post.
  - **Request Body:**
    ```json
    {
      "title": "Post Title",
      "content": "Post content"
    }
    ```

- **Get Post**
  - **Endpoint:** `GET /posts/getPosts`
  - **Description:** Display all blog posts.

- **Get Post By ID**
  - **Endpoint:** `GET /posts/getPost/:postId`
  - **Description:** Retrieve a specific blog post by its ID.

- **Update Post**
  - **Endpoint:** `PATCH /posts/updatePost/:postId`
  - **Description:** Update a specific blog post.
  - **Request Body:**
    ```json
    {
      "title": "Updated Post Title",
      "content": "Updated post content"
    }
    ```

- **Delete Post**
  - **Endpoint:** `DELETE /posts/deletePost/:postId`
  - **Description:** Delete a specific blog post.

- **Delete Post By Admin**
  - **Endpoint:** `DELETE /posts/deletePostByAdmin/:postId`
  - **Description:** Can delete a post from all users.


### Comments

- **Add Comment**
  - **Endpoint:** `POST /posts/addComment/:postId`
  - **Description:** Add a comment to a specific blog post.
  - **Request Body:**
    ```json
    {
      "comment": "This is a comment"
    }
    ```
- **Get Comments**
    - **Endpoint:** `GET /posts/getComments/:postId`
    - **Description:** Display all comments for a specific post.

- **Delete Comment**
  - **Endpoint:** `DELETE /posts/deleteComment/:postId/:commentId`
  - **Description:** Delete a specific comment from a post.

