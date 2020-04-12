# Memebook Client

## Back-end repository
[Back-end](https://github.com/averyburne/memeface-api)

## Deployed Site
[Website](https://averyburne.github.io/memeface-client/#/)

![Screenshot of App](/public/img/memeface-screenshot.png?raw=true)

## Technologies Used
- JavaScript
- HTML5
- CSS3
- Bootstrap
- React

## User Stories
- As a user, I want to be able to sign up
- As a user, I want to be able to sign in
- As a user, I want to be able to sign out
- As a user, I want to be able to change my password
- As a user, I want to be able to make my own unique username
- As a user, I want to be able to upload memes shared on other websites (like Imgur)
- As a user, I want to be able to see the memes I’ve upload on my pages
- As a user, I want to have the ability to ‘like’ memes
- As a user, I want to have the ability to comment on memes
Stretch:
- As a user, I want to only see memes from myself and the users I follow
- As a user, I want to be able to like and commit on users I follow’s memes

## Wireframe
[Wireframe](https://imgur.com/gallery/mmKSdA2)

## How it Works
The is fairly simple, it works by simply signing up with an email and password and
then uploading memes via a url. In the menu at the top of the page, just select "Upload"
and then it will bring you to a new page with a spot to add a title and a spot to paste
in the link to the meme. If you want to view the memes, which would include all memes
uploaded by yourself and by other people, just select the memes link in the navigation
bar(right next to the upload). To view a single meme, just click on the image and it
will bring you to an individual page with the meme and its title. If the meme was
uploaded by you then when you go to the individual page there will be a delete and
edit button. This will allow you to either delete the meme from the API or change the
title to something else(using the edit button).

## Planning

My first step in developing this application involved me getting version 1 to work
correctly. This was actually fairly simple since it just involved storing 2 different
string values(the title and the url) into the MongDB database. It also made it simple
to display images since the url string could just be turned into the img src url to
display the image. Since this was my first time using React there was some things that
were a bit more challenging at first. Mostly passing the props through the Authenticated
routes was a bit puzzling, but with help from classmates I was able to figure it out
and make sure the React components had access to the needed values.

Version 2(which is not apart of the master branch currently). Proved to be much more
challenging as it involved uploading image files and not just image urls. The back-end
uploads images to AWS and returns a url(detailed in back-end README), but getting React
to send a file as apart of the form was a difficult process since none of my techniques
seemed to work with React. Originally I would just add a file input type to the form
and then use the event.target.files[0] attribute to access the file before sending it
to the API, but I could not get my program to read the files attribute. Thankfully, one
of my instructors showed me how to use the FormData method to send the data in the
right format, allowing the file to be uploaded to AWS and the url to be returned.

## Unsolved Issues
The biggest issue still remains with making sure that Version 2 is running properly.
I believe that is not far away as the main issue of the file upload has been solved.
After that I would like to fix the layout to look a little more use friendly, possibly
decreasing meme sizes and displaying multiple on one line. Then for Version 3 I would
like to make it so other users are able to comment on others memes as well as leaving
likes on ones that they enjoyed.
