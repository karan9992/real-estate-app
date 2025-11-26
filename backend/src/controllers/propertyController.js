const Property = require('../models/property')
const User = require('../models/user')


const propertyController = {
    addProperty: async (req, res) => {
        try {
            const { name, details, location, price, size, bedrooms, listedBy, interestedClients } = req.body

            const result = await Property.create({ name, details, location, price, size, bedrooms, listedBy })
            console.log(result);
            res.status(201).json({
                result, message: "New property added Successfully",
                details: ` ${name}, ${details}, ${location}, ${price}, ${bedrooms}, ${listedBy} interestedClients`
            })

        } catch (err) {

            console.log("add property error :", err);
            res.status(500).json({ error: err, message: "failed to add property " })
        }

    },
    // find all the properties listed by agent from agent-id
    viewProperties: async (req, res) => {
        try {
            const properties = await Property.find({ "listedBy": req.user._id })
            res.status(200).send({ properties })

        } catch (err) {

            console.log("view property error :", err);
            res.status(500).json({ error: err, message: "failed to view properties " })
        }

    },


    // find all the clients who are interested in property listed by agent from agent-id
    viewInterested: async (req, res) => {
        try {
            const agentId = req.params.id;

            const properties = await Property.find({ listedBy: req.user._id})
                .select("_id name location price interestedClients")
                .populate("interestedClients", "name email");

            const formatted = {
                properties: properties.map(p => ({
                    _id: p._id,
                    name: p.name,
                    location: p.location,
                    price: p.price,
                    clients: p.interestedClients.map(c => ({
                        _id: c._id,
                        name: c.name,
                        email: c.email
                    }))
                }))
            };

            res.status(200).json(formatted);
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    },


    // view all properties to client using filters 
    filterProperties: async (req, res) => {
        try {
            const { location, minPrice, maxPrice, bedrooms } = req.body

            // const properties = await Property.find({ "listedBy": req.params.id })
            // res.send({ "query": req.query, location, minPrice , maxPrice, bedrooms })

            const filter = {};

            if (location) {
                filter.location = location; // case-insensitive
            }

            if (minPrice || maxPrice) {
                filter.price = {};
                if (minPrice) filter.price.$gte = Number(minPrice);
                if (maxPrice) filter.price.$lte = Number(maxPrice);
            }

            // if (bedrooms) {
            //     filter.bedrooms = Number(bedrooms);
            // }
            if (bedrooms && bedrooms.length > 0) {
                filter.bedrooms = { $in: bedrooms };
            }

            const properties = await Property.find(filter)
            res.status(200).send(properties)

        } catch (err) {

            console.log("view property error :", err);
            res.status(500).json({ error: err, message: "failed to view properties " })
        }
    },


    deleteProperty: async (req, res) => {
        try {
            // delete the property listed by agent from property-id

            const result = await Property.deleteOne({ "_id": req.params.id })
            res.status(200).send({ result })

        } catch (err) {

            console.log("delete property error :", err);
            res.status(500).json({ error: err, message: "failed to delete property " })
        }

    },
    editProperty: async (req, res) => {
        try {
            // edit the property listed by agent from property-id
            const { name, details, location, price, size, bedrooms } = req.body

            const result = await Property.findByIdAndUpdate(req.params.id,
                { name, details, location, price, size, bedrooms }, { new: true })
            res.send({ result })

        } catch (err) {

            console.log("edit property error :", err);
            res.status(500).json({ error: err, message: "failed to edit property " })
        }

    },
    addInterest: async (req, res) => {
        try {
            // add property with property-id to interested by client with client-id 
            // also add to clients propertiesInterested
            const { propertyId, clientId } = req.body

            const resultProp = await Property.findByIdAndUpdate(propertyId,
                { $addToSet: { interestedClients: clientId } },        
                { new: true })

            const resultUser = await User.findByIdAndUpdate(clientId,
                 { $addToSet: { propertiesInterested: propertyId } },        
                { new: true })

            res.send({ resultProp, resultUser })

        } catch (err) {

            console.log("interested property error :", err);
            res.status(500).json({ error: err, message: "failed to add interested property " })
        }

    }
}
module.exports = propertyController