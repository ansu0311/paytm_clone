<div align="center">
  <br>
  <h1>FLUX: Payment App </h1>
</div>

## About
This payment app, inspired by Paytm, makes digital transactions easy and secure. The project allowed hands-on experience with technologies like JWTs, session-based operations, and Tailwind.

Link to live website : [FLUX](https://paytm-clone-gamma.vercel.app/)

## Table of Contents

- [About](#about)
- [Table of Contents](#table-of-contents)
- [Technologies](#technologies)
- [Features](#features)
- [Getting Started](#getting-started)
- [Project Status](#project-status)
- [Room For Improvement](#room-for-improvement)
- [Contributing](#contributing)

## Technologies
- React.js
- Tailwind CSS
- Node.js
- Express.js
- JWT
- MongoDB

## Features
- Frontend: Built a user-friendly interface using React.js for a smooth user experience.
- Backend: Utilized Node.js with Express.js to create a robust and scalable backend architecture.
- Authentication: Implemented secure user authentication with JSON Web Tokens (JWT) for seamless access and enhanced security.
- Database: Integrated MongoDB for efficient storage and retrieval of user and transaction data, ensuring data integrity.
- Transaction Management: Orchestrated secure fund transfer functionalities with robust session-based mechanisms, prioritizing user confidence and transaction security.

## Getting Started
Within the project directory, two distinct folders are present: one designated for setting up the backend server, while the other specifically pertains to the frontend portion of the project. To initiate the project, Node software must be installed on the system. After cloning the repositories to the system, please follow the steps below.

### Backend initialization

To start the backend server on your system, change the working directory to the backend folder.

```bash
cd backend
```
First, create a .env file and add an environment variable similar to the example file named .env.example. These variables are needed to connect to the MongoDB database.

```bash
code .env
```
Setting up the backend server is just a step away. After installing the dependencies, the program can run and respond to API calls from the front end.

```bash
npm install

npm run dev
```
### Frontend initialization

Setting up the Frontend is pretty straightforward. Start by changing the working directory to the frontend folder.

```bash
cd frontend
```
Like the backend process, we create a .env file and add an environment variable specifying the URL of the backend server for API calls. We can use the .env.example file as a reference.

```bash
code .env
```
After installing the necessary dependencies, we can successfully run the FLUX payment application on our local system. The MongoDB database will store the generated data using the provided credentials during the backend setup.

```bash
npm install

npm run dev
```

## Project Status
FLUX is a constantly evolving portfolio project that will continue to improve. Version 2 will be released shortly, and some of the features and improvements listed below will be incorporated.

## Room For Improvement
### Improvements
- Ensure the Balance Auto-update feature is functioning properly.
- Verify that the analytics page is working correctly.
- Implement animation and interaction as required.
### Features that can be added
-  To add a new payee, enter their details manually instead of displaying all existing contacts.
-  allowing users to add recent and favorite payees for quick and easy transfers.

## Contributing

Pull requests are welcome, but for significant changes, please open an issue first to discuss it.

[⬆ Back to Top](#about)

<div align="center">
  <br>
  <hr/>
  <h3>Socials :</h3>
<p>
    <span style="margin-right: 30px;">
    </span>
    <a href="https://www.linkedin.com/in/ansumannayak03">
        <svg xmlns="http://www.w3.org/2000/svg" height="32" width="28" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#0072b1" d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"/></svg>
    </a>
    <span style="margin-right: 30px;">
    </span>
    <a href="https://github.com/ansu0311">
       <svg xmlns="http://www.w3.org/2000/svg" height="32" width="31" viewBox="0 0 496 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#6e5494" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
    </a>
    <span style="margin-right: 30px;">
    </span>
    <a href="https://dribbble.com/Ansu0311">
       <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ea4c89" d="M256 8C119.3 8 8 119.3 8 256s111.3 248 248 248 248-111.3 248-248S392.7 8 256 8zm164 114.4c29.5 36 47.4 82 47.8 132-7-1.5-77-15.7-147.5-6.8-5.8-14-11.2-26.4-18.6-41.6 78.3-32 113.8-77.5 118.3-83.5zM396.4 97.9c-3.8 5.4-35.7 48.3-111 76.5-34.7-63.8-73.2-116.2-79-124 67.2-16.2 138 1.3 190.1 47.5zm-230.5-33.3c5.6 7.7 43.4 60.1 78.5 122.5-99.1 26.3-186.4 25.9-195.8 25.8C62.4 147.2 106.7 92.6 165.9 64.6zM44.2 256.3c0-2.2 0-4.3 .1-6.5 9.3 .2 111.9 1.5 217.7-30.1 6.1 11.9 11.9 23.9 17.2 35.9-76.6 21.6-146.2 83.5-180.5 142.3C64.8 360.4 44.2 310.7 44.2 256.3zm81.8 167.1c22.1-45.2 82.2-103.6 167.6-132.8 29.7 77.3 42 142.1 45.2 160.6-68.1 29-150 21.1-212.8-27.9zm248.4 8.5c-2.2-12.9-13.4-74.9-41.2-151 66.4-10.6 124.7 6.8 131.9 9.1-9.4 58.9-43.3 109.8-90.8 142z"/></svg>
    </a>
    <span style="margin-right: 30px;">
    </span>
</p>
</div>