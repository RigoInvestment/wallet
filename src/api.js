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

import Api from '@parity/api';

const OverHttps = true;
const timeout = 10000; (seconds)

if (typeof window.parity !== 'undefined') {
  HttpsUrl = 'http://localhost:8545';
} else {
  // For RPC over Https
  HttpsUrl = 'https://kovan.infura.io';
}

if (!ethereumProvider) {
  var ethereumProvider = new Api.Provider.Http('https://kovan.infura.io');
  console.log(ethereumProvider);
}

const checkTransport = () => {
  if (OverHttps) {
    try {
      // for @parity/api
      const transport = new Api.Provider.Http(HttpsUrl, timeout)

      console.log(transport.isConnected)
      // @parity/parity.js
      // const transport = new Api.Transport.Http(HttpsUrl, timeout);
      console.log("Connecting to ", HttpsUrl)
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
