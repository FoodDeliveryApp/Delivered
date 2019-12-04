function createInitData() {
    //create customers
    customer1 = new RegisteredCustomer(110, "password1", "Stan", "Orzechowski", "stan@hotmail.com", 5.0, "7184145678",
        "60 Pinapple street, Brooklyn, NY", "card1");
    customer2 = new RegisteredCustomer(112, "password2", "Marina", "Orzechowski", "marina@hotmail.com", 4.0, "7184145679",
        "60 Pinapple street, Brooklyn, NY", "card1");
    customer3 = new RegisteredCustomer(111, "password3", "Mike", "Harrison", "mike@hotmail.com", 3.0, "7184145456",
        "23 Herald square, NY", "card1");
    customer4 = new RegisteredCustomer(109, "password4", "John", "Li", "john@hotmail.com", 3.0, "7184145456",
        "30Times Square, NY", "card1");

    //create delivery people
    delivery_guy1 = new DeliveryPerson(113, "password3", "John", "Shephard", "john@gmail.com", 4.9, false);
    delivery_guy2 = new DeliveryPerson(114, "password4", "Tom", "Hanks", "tom@gmail.com", 4.5, true);
    delivery_guy3 = new DeliveryPerson(115, "password5", "Alice", "Brown", "alice@gmail.com", 4.7, false);


    // create array of orders
    ordersToBidFor = [];
    ordersToBidFor.push(new Order(4, customer3, "60 Monroe St Hoboken NJ", new Date(), "Burger", 12.88, true));
    ordersToBidFor.push(new Order(5, customer1, "15 Pinapple street, Brooklyn, NY", new Date(), "Chocolate", 5.50, true));
    ordersToBidFor.push(new Order(6, customer4, "Herald square New York NY", new Date(), "noodles", 3.50, true));
    ordersToBidFor.push(new Order(7, customer2, "City College of New York", new Date(), "pizza", 5.45, true));
}
