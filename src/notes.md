[] Recipe model
name - input 
content - textarea
comments - default empty array
rating - default null - enum 1 to 5
author - the current user

[] Rating model
value enum 1 to 5
author

[] Comment model
author 
text

[] Profile model
one to one relation with user
recipes
ratings
comments



OneRecipe

- name - string
- content - string
- comments - array
- createdAt - date
- author - profile.name (link to profile maybe?)
- ratings - array 

Todo



Accounts: 
  sven - created
  lich - created
  es - created 
  cm - created 
  wk - created

Profile data: 

recipes  array - name, content, profile, ratings, comments
comments array
ratings  array


Migrating to bootstrap
[x] navbar
[x] create recipe page
[x] list all recipes
[x] modal 
[x] show recipe
[x] add a comment.
[x] conditional render delete recipe if author id === current user id...
[x] conditional render delete comment if author id === current user id...

[] rating -> only length for now
[x] edit recipe comment
[x] register

200918
[] Pagination. 6 recipes per page.
  - count the number of pages we have. /recipe/count































  
