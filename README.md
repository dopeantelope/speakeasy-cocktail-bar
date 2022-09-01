# Speakeasy Cocktail Bar
A Speakeasy Cocktail bar that requires a password to enter. Upon entering, user can enter a key word and browse through the cocktail menu.

**Link to project:** https://speakeasy-bar.netlify.app/

![Alt Text](https://i.ibb.co/qN58Jp0/Screenshot-2022-08-30-at-11-10-15-1.png)

## How It's Made:

A Node.js app using the Twitter and Genius API to Tweet random lyrics of artist Rexx Life Raj. A song is chosen at random and the URL of that song is generated, the HTML is scraped to acquire the lyrics using Cheerio and converted to text. The text is then parsed to remove any lyrics that are by another artist and two lines (in succession) are chosen at random and Tweeted. The Tweets are automated daily using CronJob.

**Tech used:** JavaScript, Node.js, Twitter API, Genius API


## Optimizations

Further optimizations would include Tweeting a Spotify link if there is one available for the song. If there is not one available then potentially including a YouTube link.


## Lessons Learned:

- [x] How the Twitter API works
- [x] Learnt how to use CronJob to automate processes
- [x] That using a logger such as Winston is super helpful when using Node
- [x] Grew more confident using Postman as I used it a lot when working with the Genius API
- [x] Learnt how to scrape from a webpage using Cheerio and to use regex to replace break tags with \n to handle text easier
