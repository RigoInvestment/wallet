// Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

import Api from '@parity/api'
import Web3 from 'web3'

var HttpsUrl = true;
var WsSecureUrl = true;
const OverHttps = true;
const timeout = 10000; // to set the delay between each ping to the Http server. Default = 1000 (1 sec)

if (typeof window.parity !== 'undefined') {
  // Change to 'http://localhost:8545' and 'ws://localhost:8546' before building
  // For RPC over Https
  // HttpsUrl = 'https://srv03.endpoint.network:8545';
  HttpsUrl = 'http://localhost:8545';
  // For RPC over Websocket
  // WsSecureUrl = 'wss://srv03.endpoint.network:8546';
  WsSecureUrl = 'ws://localhost:8546';
} else {
  // For RPC over Https
  HttpsUrl = 'https://kovan.infura.io';
  // For RPC over Websocket
  WsSecureUrl = 'wss://kovan.infura.io:8546';
}

console.log(window)
// Checking if Web3 has been injected by the browser (Mist/MetaMask)

if (typeof window.web3 !== 'undefined') {
  // Use Mist/MetaMask's provider
  console.log('Found MetaMask!')
  window.web3 = new Web3(window.web3.currentProvider)
  console.log(window.web3.currentProvider)
} else {
  console.log('No web3? You should consider trying MetaMask!')
  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  // window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
}

// Now you can start your app & access web3 freely:

const checkTransport = () => {
  if (OverHttps) {
    try {
      // for @parity/api
      const transport = new Api.Provider.Http(HttpsUrl, timeout)

      console.log(transport.isConnected)
      console.log("Connecting to ", HttpsUrl)
      return new Api(transport);
    } catch (err) {
      console.warn('Connection error: ', err);
    }
  } else {
    try {
      console.log("Connecting to ", WsSecureUrl);
      // for @parity/api
      const transport = new Api.Provider.WsSecure(WsSecureUrl);
      return new Api(transport);
    } catch (err) {
      console.warn('Connection error: ', err);
    }
  }
}

var api = checkTransport()
console.log(api)

api.isConnected ? console.log('Connected to Node:', api.isConnected) : console.log('Could not connect to node.')

export {
  api
};
