const express = require("express");

const MerkleTree = require("../utils/MerkleTree");
const niceList = require("../utils/niceList");

const verifyProof = require("../utils/verifyProof");

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
//
const merkleTree = new MerkleTree(niceList);
const MERKLE_ROOT = merkleTree.getRoot();

app.post("/gift", (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;

  // TODO: prove that a name is in the list
  const isInTheList = niceList.findIndex((n) => n === body.name);
  console.log(body.name, 'tried to get a gift!');
  if (isInTheList !== -1) {
    res.send("You got a toy robot!");
    console.log('He/She got it.')
  } else {
    res.send("You are not on the list :(");
    console.log('Your gifts are intact.')
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
