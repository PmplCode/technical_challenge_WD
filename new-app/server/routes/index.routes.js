const router = require("express").Router();
const data = require("../data/phones.json")

router.get("/", (req, res, next) => {
  res.json(data);
});

router.get("/:idPhone", (req, res, next) => {
  // data.filter(phoneId => phoneId.id === req.params.idPhone)
  console.log("data.filter: ", data.filter(phone => phone.id == req.params.idPhone))
  let phoneArr = data.filter(phoneId => phoneId.id == req.params.idPhone)
    res.json(phoneArr);
});

module.exports = router;
