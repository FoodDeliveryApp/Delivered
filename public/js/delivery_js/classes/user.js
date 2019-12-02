class User {
    constructor(user_id, password, first_name, last_name, email, rating) {
        this.user_id = user_id;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.rating = rating;
    }
    create_account() { console.log("created new account") };
    delete_account() { console.log("deleted an account") };
    log_in() { console.log("logged in") };
    log_out() { console.log("logged out") };
}

class RegisteredCustomer extends User {
    constructor(user_id, password, first_name, last_name, email, rating, phone_number, address, payment_method) {
        super(user_id, password, first_name, last_name, email, rating);
        this.phone_number = phone_number;
        this.address = address;
        this.payment_method = payment_method;
    }
}

class DeliveryPerson extends User {
    constructor(user_id, password, first_name, last_name, email, rating, is_busy) {
        super(user_id, password, first_name, last_name, email);
        this.is_busy = is_busy;
    }
}
