import abi from "./Eye4eyes.json";

export const contractABI = abi.abi;

    export const networks = {
        137: { name: "Polygon", contractAddress: "", explorer: "", chainId: 137 },
        80001: { name: "Mumbai", contractAddress: "", explorer: "", chainId: 80001 },
        534353: { name: "Scroll Alpha", contractAddress: "", explorer: "", chainId: 534353 },
        167004: { name: "Taiko A2", contractAddress: "0xf97A015281BC52948604d959c13276a84c7B8454", explorer: "https://l2explorer.a2.taiko.xyz/address/0xf97A015281BC52948604d959c13276a84c7B8454/transactions#address-tabs", chainId: 167004 },
        44787: { name: "Celo Alfajores", contractAddress: "", explorer: "", chainId: 44787 },
    };