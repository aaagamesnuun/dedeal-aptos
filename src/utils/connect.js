import abi from "./Eye4eyes.json";

export const contractABI = abi.abi;

    export const networks = {
        137: { name: "Ethereum Goerli", contractAddress: "0xf97A015281BC52948604d959c13276a84c7B8454", explorer: "https://goerli.etherscan.io/address/0xf97a015281bc52948604d959c13276a84c7b8454", chainId: 5 },
        80001: { name: "Polygon Mumbai", contractAddress: "0x5435643439C59b76Ba15D24A498Bb6bF83259e7E", explorer: "https://mumbai.polygonscan.com/address/0x5435643439c59b76ba15d24a498bb6bf83259e7e", chainId: 80001 },
        534353: { name: "Scroll Alpha", contractAddress: "0x45d5E14e8b68FdF89dB69620a80BC6b2cfd39e93", explorer: "https://blockscout.scroll.io/address/0x45d5E14e8b68FdF89dB69620a80BC6b2cfd39e93", chainId: 534353 },
        167004: { name: "Taiko A2", contractAddress: "0xf97A015281BC52948604d959c13276a84c7B8454", explorer: "https://l2explorer.a2.taiko.xyz/address/0xf97A015281BC52948604d959c13276a84c7B8454/transactions#address-tabs", chainId: 167004 },
        44787: { name: "Celo Alfajores", contractAddress: "0x7641c294EBd551018C39981a38d14F28fF8E2711", explorer: "https://explorer.celo.org/alfajores/address/0x7641c294EBd551018C39981a38d14F28fF8E2711/transactions#address-tabs", chainId: 44787 },
    };