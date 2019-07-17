const Web3 = require("web3");
const EEAClient = require("../../src");
const EventEmitterAbi = require("../solidity/EventEmitter/EventEmitter.json")
  .output.abi;

const { orion, pantheon } = require("../keys.js");

const web3 = new EEAClient(new Web3(pantheon.node2.url), 2018);
web3.eth.Contract(EventEmitterAbi);

const createPrivacyGroupForNode23 = () => {
  const contractOptions = {
    addresses: [orion.node2.publicKey, orion.node3.publicKey],
    privateFrom: orion.node2.publicKey,
    name: "web3js-eea",
    description: "test"
  };
  return web3.eea.createPrivacyGroup(contractOptions).then(result => {
    console.log(`The privacy group created is:`, result);
    return result;
  });
};

module.exports = {
  createPrivacyGroupForNode23
};

if (require.main === module) {
  createPrivacyGroupForNode23();
}
