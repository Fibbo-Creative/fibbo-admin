import { ethers } from "ethers";
import { MANAGER_WALLET } from "./constants";
import { suggestionsAbi } from "./contracts/abis";
import { suggestionsAddress } from "./contracts/address";

const web3provider = new ethers.providers.JsonRpcProvider(
  "https://rpc.testnet.fantom.network/"
);

export const SUGGESTIONS_CONTRACT = new ethers.Contract(
  suggestionsAddress,
  suggestionsAbi,
  web3provider
);

export const truncateWallet = (wallet, slicer) => {
  if (slicer) {
    return `${wallet.slice(0, slicer)}...${wallet.slice(
      wallet.length - slicer,
      wallet.length
    )}`;
  } else {
    return `${wallet.slice(0, 8)}...${wallet.slice(
      wallet.length - 8,
      wallet.length
    )}`;
  }
};

export const getWalletBalance = async () => {
  const balance = await web3provider.getBalance(MANAGER_WALLET);
  return ethers.utils.formatEther(balance);
};

export const calculateProgress = (A, B) => {
  var percDiff = 100 * Math.abs((A - B) / ((A + B) / 2));
  let formatted = percDiff.toFixed(4);
  if (A > B) {
    return formatted * -1;
  } else {
    return formatted;
  }
};

const formatSuggestion = (suggestions) => {
  return suggestions.map((sugg) => {
    return {
      suggestionId: sugg.suggestionId.toNumber(),
      title: sugg.title,
      description: sugg.description,
      totalAmount: ethers.utils.formatEther(sugg.totalAmount),
      progress: ethers.utils.formatEther(sugg.progress),
    };
  });
};

export const getSuggestionsActive = async () => {
  const suggInProg = await SUGGESTIONS_CONTRACT.getInProgressSuggestions();
  return formatSuggestion(suggInProg);
};

export const getNumberOfSuggestionsActive = async () => {
  const suggInProg = await getSuggestionsActive();
  return suggInProg.length;
};

export const getSuggestionsContractBalance = async () => {
  const balance = await web3provider.getBalance(suggestionsAddress);
  return ethers.utils.formatEther(balance);
};
