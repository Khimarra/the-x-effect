# The X Effect

## [Reddit Wiki](https://www.reddit.com/r/theXeffect/wiki/index)

The X Effect is a habit-building method first introduced to [r/getdisciplined](https://www.reddit.com/r/getdisciplined/comments/1x99m6/im_a_piece_of_shit_no_more_games_no_more_lies_no/cf9dz72/) by [u/Bombjoke](https://www.reddit.com/user/Bombjoke/) back in 2014. The idea is to set a goal of doing a specific, simple thing every day for 50 days in order to build a new habit. Originally, u/Bombjoke suggested using an index card divided into a 7x7 grid, and putting a big red X in each square for each day you do the thing. If you miss a day, leave that square blank. Once the card is finished, that's 49 squares. The 50th day is one giant X across the whole card.

This app is meant to accomplish the same task as the index cards, but with a little more customization. Grids can be of varying sizes, and notes can be added to specific boxes in case you want to track *why* you missed a day. 

## Wireframes

![wireframes](https://i.imgur.com/7SJRM5o.png)

## Backend Planning

Using Express and MongoDB because Mongo databases are so easily scalable and this app will likely grow in the future. 

### Schema

``` 
User Schema
- email address
- password
- Grids
    - Title
    - Description
    - Start Date
    - End Data
    - Success fill
    - Missed fill
    - Notes fill
    - Days
        - Success
        - Notes 
```

## Frontend Planning

Using ReactJS because it is great for creating responsive single-page applications.

### Component Heirarchy
