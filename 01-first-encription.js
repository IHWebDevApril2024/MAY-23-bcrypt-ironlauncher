const bcrypt = require("bcryptjs");
const saltRounds = 10;

const password1 = "Ironhackers7"

const salt = bcrypt.genSaltSync(saltRounds);

console.log(`Salt => ${salt}`);

const hash1 = bcrypt.hashSync(password1, salt);

const verifyPass1 = bcrypt.compareSync("Igfssronhackers7", hash1);

console.log("THIS IS THE ENCRYPTED PASSWORD",hash1);

console.log("Verification of the password: ", verifyPass1);