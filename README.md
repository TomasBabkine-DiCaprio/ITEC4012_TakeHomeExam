# Tomas Babkine-Di Caprio
# ITEC4012 - Take Home Exam - Fall 2021

For this take home exam, students had to design and build a full stack media application using React for the front-end, and Google Firebase for the back-end and user authentication.

I created React Overflow, a platform where developers of all calibers can share insights into how React works and help each other out.

Use the homepage to see a collection of all posts sorted by most recent to oldest and use the profile page to see all of your posts as well as add a new post. A new post can contain text as well as an image (not required). 

## Components

Here is how the app is broken into components:

**1. pages / home-page**
This component is rendered when the user first opens the app using a browser. The homepage fetches all the posts from the database and displays them dynamically in a post component.

**2. pages / my profile**
This page displays all the posts that the current logged in user posted. It also contains the form to add a new post to the app.

**3. pages / login page**
This page contains a form for the user to either register, or login to React Overflow. If the user isn't logged in, they are redirected to this logout page.

**4. Navbar**
This component is rendered on each page. It also checks wether or not the user is logged in. It only displays the links to the homepage and profile page if the user is logged in.

**5. Post item**
This component takes the content of the post as parameters and then displays them with styling on the home page and profile page.

**6. Logout**
Handles logging out the user.

## Global Context

To access all of the posts stored in the database at every level of the app, this information is stored in the global context which is then wrapped around the app. This is done when the information is first fetched from the API, but also used as a state, and updated as soon as the information in the database is modified or when a new post is added.
