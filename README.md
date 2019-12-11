# Delivered
## CSC322 Software Engineering Final Project
Created by: Chrystal Mingo, Marina Skachko, Maya Dara Sofia Pasiliao, Mayra Vazquez-Sanchez

CSS, HTML, JavaScript, and PostgreSQL, Node.js, Express, Jquery were used to build Delivered. We decided on a web based GUI, as that is what our team is most familiar with. To enable log in functionality, usernames and passwords are stored in a database. The front end was all written using CSS, HTML, and JavaScript. A Google API was used to display the map for the delivery subsystem and to calculate shortest route. JavaScript was used to display ratings, dropped items, and customer orders.

Half the system uses PostgreSQL. However, we underestimated the time it would take to integrate all the pages using our database, and had to switch to using txt files.

Delivered can be used by multiple users which include customers, cooks, salespeople, and managers of restaurants in the local area. Each user has a unique experience. Customers can proceed as a visitor or log in as a registered or vip customer. They have the same experience except visitor cannot rate and does not get any promos upon checkout. Managers are able to adjust personnel pay, accept registrations, put customers on the blacklist, chat with personnel, and manage customer complaints. Cooks can edit menu items, rate supplies, and create shopping list for supplies. Salespeople can order supplies based on cooks' list.

As the creativity portion of the project, a chatbot and status bar were included to add to the customer experience. The chatbot uses Dialogflow by Google to function. Customers can chat with the bot and ask for advice on what to order and how to sign up. The status bar displays the orders' progress so customers have a realistic timeline.
