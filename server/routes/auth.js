const router = require("express").Router();
const { User } = require("../models/user");
const Joi = require("joi");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  console.log("1");
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: "Invalid Password or Email" });

    console.log("2");
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    console.log("3");
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Password or Email" });

    const token = user.generateAuthToken();
    console.log("4");
    res.status(200).send({ data: token, message: "Successfully Logged In" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
