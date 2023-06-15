# Project Blitzkarte
Blitzkarte means "Lightning Map" in German, and it is a program which automates a global variation of the social game Diplomacy.
Players control a country as they cooperate and compete to be among the 3 winners.
It is a turn based game where players submit orders for their countries in secret, and then orders are simultaneously processed and announced, revealing everyone's true colors.

Please keep in mind this is a work in progress.
Game logic and operations have been prioritized over many of the aesthetics, which may currently appear rough or implemented in a non-final state.

## Key Features
### Map Operations
The beautiful dynamically rendered map displays the state of the world.
Province colors, unit positions and flags and orders.
Changes to orders update the map in real-time with color coded circles, arrows and curves to clearly visualize the various commands.
Units counter-zoom to create more real estate, and panning left-right seemlessly wraps around the world.

### Custom Game Creation
Users are provided with a template which can be modified to match their vision of game settings and balance.
This is then uploaded and parsed, readying the map and world for the next game.
Clear guidelines are embedded with the options available to change the map, and a thorough validator also gives immediate feedback should there be any issues.
The entire network of compatible movement options available can be displayed.

### Account Logins and Flexibility
Users have the option to signup through site-specific emil or leverage Oauth for a Google (or later Facebook) provider login!
Users can even add secondary login methods to link to their account, allowing for a degree of flexibility should they choose to discontinue using a method.
Being managed by an industry standard Google Firebase, this fast tracks security and reliability.

### Proper Development, Testing and Production Workflow
Two pairs of EC2s are dedicated to the testing and live environments.
Utilizing test and www subdomain DNS routing, main and test branches are managed independently, with different databases for each.
This allows for responsible test-driven development of new features in one environment which will not disturb smooth operations of production operations.

## Implementation
The glory of React is leveraged to dynamically render a variety of complex operations.
The game state is displayed as a map through the harmony of React, SVGs and navigated through Greensock.
React renders the possible orders for the player, which is properly permissioned while leveraging firebase.
ReactQuery is excellent at managing states and renders throughout the request lifecycle.
We have site navigation powered by Next and various flair is accented by Material UI.


Everything is saved and progressed by [Erzahler](https://github.com/Eccentricware/Erzahler), the backend of the project.

## Technologies:
<img height="30" src="https://img.shields.io/badge/typescript-blue?style=for-the-badge&logo=typescript&logoColor=white"/>
<img height="30" src="https://img.shields.io/badge/react-white?style=for-the-badge&logo=react&logoColor=blue"/>
<img height="30" src="https://img.shields.io/badge/next-black?style=for-the-badge&logo=next.js&logoColor=white"/>
<img height="30" src="https://img.shields.io/badge/firebase-blue?style=for-the-badge&logo=firebase&logoColor=orange"/>
<img height="30" src="https://img.shields.io/badge/svg-white?style=for-the-badge&logo=svg&logoColor=orange"/>
<img height="30" src="https://img.shields.io/badge/greensock-black?style=for-the-badge&logo=greensock&logoColor=green"/>
<img height="30" src="https://img.shields.io/badge/react_query-white?style=for-the-badge&logo=reactquery&logoColor=red"/>
<img height="30" src="https://img.shields.io/badge/material_ui-white?style=for-the-badge&logo=mui&logoColor=blue"/>
