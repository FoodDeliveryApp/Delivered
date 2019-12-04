class Bid {
    constructor(delivery_person, amount) {
        this.delivery_person = delivery_person;
        this.amount;
    }
    increase_amount(new_amount) { this.amount = new_amount };
    remove_bid() { delete this };

}