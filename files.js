// const userName = "Max";

// console.log(`Hi ${userName}!`);
// console.log("Hello World!");

const fs = require("fs");
fs.writeFile("user-data.txt", "username=Max", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Wrote To File!");
  }
});

fs.readFile("user-data.txt", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data.toString());
});
