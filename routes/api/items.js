const express = require("express");

const router = express.Router();

const Item = require("../../models/Items");

router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

router.get("/:id", (req, res) => {
  Item.findById({ _id: req.params.id }, req.body)
    .sort({ date: -1 })
    .then(item => (item ? res.json(item) : res.sendStatus(404)));
});

router.post("/", (req, res) => {
  const newItem = new Item({
    first_name: req.body.first_name,
    second_name: req.body.second_name,
    email: req.body.email,
    mobile_phone: req.body.mobile_phone,
    work_phone: req.body.work_phone,
    shipping_street: req.body.shipping_street,
    shipping_number: req.body.shipping_number,
    shipping_zipcode: req.body.shipping_zipcode,
    shipping_city: req.body.shipping_city,
    shipping_country: req.body.shipping_country,
    billing_street: req.body.billing_street,
    billing_number: req.body.billing_number,
    billing_zipcode: req.body.billing_zipcode,
    billing_city: req.body.billing_city,
    billing_country: req.body.billing_country
  });

  newItem.save().then(item => res.json(item));
});

//update item in db
router.put("/:id", (req, res) => {
  Item.updateOne({ _id: req.params.id }, req.body)
    .then(function() {
      Item.findOne({ _id: req.params.id }).then(function(item) {
        res.send(item);
      });
    })
    .catch(err => res.err);
});

router.delete("/:id", (req, res) => {
  Item.findById({ _id: req.params.id })
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(error => res.status(404).json({ success: false }));
});

module.exports = router;
