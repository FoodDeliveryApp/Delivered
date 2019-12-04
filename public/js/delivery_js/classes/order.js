class Order {
    constructor(order_id, customer, location, time_of_placement, menu_items, price, is_paid) {
        this.order_id = order_id;
        this.customer = customer;
        this.location = location;
        this.time_of_placement = time_of_placement;

        this.menu_items = menu_items;
        this.price = price;
        this.is_paid = is_paid;
        this.winning_bid = NaN;
        this.delivery_person = NaN;
    }

    setBid(delivery_person, amount) {

    }

}

