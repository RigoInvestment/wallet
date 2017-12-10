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

var Api = new Api();
Api.setProvider(new web3.providers.HttpProvider('https://mainnet.infura.io/'));
/*
var provider = new Api.Provider.Http('https://kovan.infura.io/oTRuD7vcUjsqn1pFIyMS');
console.log(provider);
var Api = new Api(provider);
*/

export default Api;
