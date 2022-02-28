import { Chain, CHAINS } from './chain';
import { metadata } from './erc20-metadata';
import { web3 } from './web3';
declare let base58Check: any;

export class Token {
  id: number;
  ticker: string;
  chain: Chain;
  title: string;
  erc20: string;
  destination: 'Strax' | 'Cirrus';
  addressPrefix: number;
  private contract: any;

  constructor(data: TokenData, id: number) {
    this.id = id;
    this.ticker = data.ticker;
    this.chain = data.chain;
    this.title = data.title;
    this.destination = data.destination;
    this.erc20 = data.erc20;
    this.addressPrefix = data.addressPrefix;
    this.contract = new web3.eth.Contract(metadata, data.erc20);
  }

  async balance(address: string): Promise<string> {
    return await this.contract.methods.balanceOf(address).call();
  }
  burnCall(amount: number, address: string): string {
    return this.contract.methods.burn(amount, address).encodeABI();
  }

  transferCall(to: string, amount: number): string {
    return this.contract.methods.transfer(to, amount).encodeABI();
  }

  /**Validates destination address for cirrus or strax networks */
  validateAddress(address: string) {
    try {
      var result = base58Check.decode(address);
      return result.prefix[0] == this.addressPrefix;
    } catch (e) {
      return false;
    }
  }
}

interface TokenData {
  ticker: string,
  chain: Chain,
  title: string,
  destination: 'Strax' | 'Cirrus',
  erc20: string,
  addressPrefix: number;
}

var mainnet = CHAINS[0];
var ropsten = CHAINS[1];

//export class DestinationChain {
//  constructor(addressPrefix)
//}
export var tokenValues: TokenData[] = [
  {
    ticker: 'WSTRAX',
    chain: mainnet,
    title: 'WStrax => Strax',
    destination: 'Strax',
    erc20: '0xa3c22370de5f9544f0c4de126b1e46ceadf0a51b',
    addressPrefix: 75
  },
  {
    ticker: 'WSTRAX',
    chain: ropsten,
    title: 'WStrax => Strax',
    destination: 'Strax',
    erc20: '0xde09a7cb4c7631f243e5a5454cbb02404aea65e7',
    addressPrefix: 120

  },
  {
    ticker: 'TST-2',
    chain: ropsten,
    title: 'Token 2',
    destination: 'Cirrus',
    erc20: '0xf197f5f8c406d269e2cc44aaf495fbc4eb519634',
    addressPrefix: 127

  },
  {
    ticker: 'TST-3',
    chain: ropsten,
    title: 'Token 3',
    destination: 'Cirrus',
    erc20: '0xa3c22370de5f9544f0c4de126b1e46ceadf0a51b',
    addressPrefix: 127

  },
  {
    ticker: 'TST-4',
    chain: ropsten,
    title: 'Token 4',
    destination: 'Cirrus',
    erc20: '0x5da5cfe7d4ce1cc0712ebc0bb58eff93817a6801',
    addressPrefix: 127

  },
  {
    ticker: 'TST-5',
    chain: ropsten,
    title: 'Token 5',
    destination: 'Cirrus',
    erc20: '0x14f768657135d3daafb45d242157055f1c9143f3',
    addressPrefix: 127
  }
];

export const TOKENS = tokenValues.map((data, i) => new Token(data, ++i));
