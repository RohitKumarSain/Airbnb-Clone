const mongoose = require('mongoose');


const ListingsSchema = new mongoose.Schema({
    _id: String,
    listing_url: String,
    name: String,
    price: Number,
    category: String,
    address: {
        street: String,
        suburb: String,
        government_area: String,
        market: String,
        country: String,
        country_code: String
    },
    images: {

        thumbnail_url: String,
        medium_url: String,
        picture_url: String,
        xl_picture_url: String
    },
    bedrooms: Number,
    summary: String,
    space: String,
    description: String,
    neighborhood_overview: String,
    notes: String,
    transit: String,
    access: String,
    interaction: String,
    house_rules: String,
    property_type: String,
    room_type: String,
    bed_type: String,
    minumum_nights: String,
    maximum_nights: String,
    cancellation_policy: String,
    first_review: Date,
    calendar_last_scraped: Date,
    last_scraped: Date,
    accommodates: Number,
    bedrooms: Number,
    beds: Number,
    number_of_reviews: Number,
    bathrooms: Number,
    amenities: Array,
    security_deposit: Number,
    cleaning_fee: Number,
    extra_people: Number,
    guests_included: Number,
    host: Object,
    address: Object,
    availability: Object,
    review_scores: Object,

    reviews: Array,
})




const Listings = mongoose.model('listingsAndReviews', ListingsSchema)

module.exports = Listings;
