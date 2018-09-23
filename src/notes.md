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

------------------------------------------------
Links:
  https://webkul.github.io/vivid/cheatsheet.html

  https://pixabay.com/en/photos/?q=pizza+drawing&hp=&image_type=all&order=popular&cat=&min_width=&min_height=

  https://www.hellofresh.com/recipes/

Left bar:
[] Show All </ p >
[] Order by name </ p >
[] Order by date published </ p >
[] Order by rating </ p >
[] show only from a category -> select </ p >
[] also be able to hand the left bar. -> then 4 recipes per page. </ p >

Other
[] Change how many recipes are shown on the page </ p >
[x] Change how are they shown -> 1 or 3 or 6 on one row </ p >
[] Show all recipes and when clicking load more -> more are loaded obviously

on top
[] currently shown recipe like a jumbotron that can be changed </ p >

for each recipe
[] maybe calories, time to cook </ p >






























  
