## SocialNetworkApp
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.

You can view Social Network App [Here](https://social-network-angular.herokuapp.com/home)

## Idea
An application that every user can post article, comment article, delete own article.
Every user can create a post that can be viewed by all users

## Public part
* Anonymus user
  * On landing page login provided.
  * User has access to register page.
  * User has access to login page.
  * If a user forgot password. It is possible to reset.
## Private part
* Authorized user
  * User can create a post.
  * User has access to all posts.
  * User has access to all registered users.
  * User has access to his own profile page.
## Design
* Responsive
## Functionality
* Create post
  * Choose a file from file system and upload it to firebase storage.
* Posts
  * Like and dislike every post.
  * Access to detail page for every post.
 * Write a comment on every post.
  * If a logged user is an author he can delete a post.
* Users
  * In the user list for each user are presented links to his posts.
  * Can search for a user by name, email or title of his post.
* Profile
  * User can reset password.
  * User can delete account
