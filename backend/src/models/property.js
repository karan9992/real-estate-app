const mongoose = require('mongoose')

//   name,
//   details,
//   location, 
//   price,
//   size,
//   bedrooms,
//   bathrooms,
//   image: [urls],
//   listedBy: agentId,
//   interestedClients: [clientIds]


const propertySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    details: {
        type: String,

    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    size: {
        type: String,

    },
    bedrooms: {
        type: Number,
        required: true
    },
    listedBy: {
        type: mongoose.Schema.Types.ObjectId,  //store agents id
        ref: 'User',
        required: true
    }, 
    interestedClients: [
        {
            type: mongoose.Schema.Types.ObjectId,   //store clients id
            ref: 'User'
        } 
    ],
    images:{
        type:[String]
    }

}, { timestamps: true })

module.exports = mongoose.model('Property', propertySchema)