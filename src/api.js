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

const providers = {
  PARITY: "Personal Parity",
  METAMASK: "MetaMask",
  INJECTED: "Unknown Injected",
  LOCAL: "Other local node",
  HOSTED: "Hosted by us",
  NONE: "No provider found",
};

const checkHttpProvider = url => {
  const provider = new Api.Provider.Http(url);
  return provider.isConnected() ? provider : null;
};

const api = (api = global.api) => {
  let provider;

  if (api) {
    if (api.parity) {
      provider = providers.PARITY;
    } else if (api.ethereumProvider.isMetaMask) {
      provider = providers.METAMASK;
    } else {
      provider = providers.INJECTED;
    }
    return { web3: new Web3(api.ethereumProvider), provider };
  }

  let httpProvider = checkHttpProvider("http://localhost:8545");

  if (httpProvider) {
    provider = providers.LOCAL;
  } else {
    httpProvider = checkHttpProvider("https://kovan.infura.io");

    if (httpProvider) {
      provider = providers.HOSTED;
    } else {
      provider = providers.NONE;
    }
  }

  return { api: new Api(httpProvider), provider };
};

export default api;
