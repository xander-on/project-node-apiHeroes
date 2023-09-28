const { response } = require("express");
const { Publisher } = require("../models");



const getPublishers = async(req, res=response) => {
    const query = { state:true }
    const publishers = await Publisher.find(query);

    res.json(
        // total:publishers.length,
        publishers
    );
}


module.exports = {
    getPublishers
}
