import validator from "validator";
import fs from "fs";
import csv from "fast-csv";

const validateCreateUser = (req, res, next) => {
  const { firstName, lastName, email } = req.body;
  if (!firstName || !lastName || !email) {
    res.status(400);
    throw new Error("All fields are required");
  }

  if (
    !validator.isAlpha(firstName, "en-US") ||
    !validator.isAlpha(lastName, "en-US")
  ) {
    res.status(400);
    throw new Error("Invalid user name");
  }

  if (!validator.isEmail(email)) {
    res.status(400);
    throw new Error("Invalid user email");
  }
  req.body.firstName = firstName.trim();
  req.body.lastName = lastName.trim();
  req.body.email = email.trim();
  next();
};

const validateAndParseMultiCreateUser = (req, res, next) => {
  let userList = [];
  let count = 0;

  fs.createReadStream(req.file.path)
    .pipe(csv.parse({ headers: true }))
    .on("error", (error) => {
      res.status(400);
      throw new Error("Something went wrong");
    })
    .on("data", (row) => {
      const firstName = row.firstName.trim();
      const lastName = row.lastName.trim();
      const email = row.email.trim();
      if (
        validator.isAlpha(firstName) &&
        validator.isAlpha(lastName) &&
        validator.isEmail(email)
      ) {
        userList.push({ firstName, lastName, email });
      }
    })
    .on("end", (rowCount) => {
      req.body.count = rowCount;
      req.body.userList = userList;
      next();
    });
};

const bulkEmailValidator = (req, res, next) => {
  const { to, from } = req.body;
  const emailList = to.split(",");

  emailList.forEach((email) => {
    if (!validator.isEmail(email.trim())) {
      res.status(400);
      throw new Error(`Invalid recipient email: ${email}`);
    }
  });

  if (!validator.isEmail(from)) {
    res.status(400);
    throw new Error(`Invalid sender email: ${from}`);
  }

  next();
};

export {
  validateCreateUser,
  validateAndParseMultiCreateUser,
  bulkEmailValidator,
};
