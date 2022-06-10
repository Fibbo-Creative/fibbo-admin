import { useCallback } from "react";
import { ethers } from "ethers";

// eslint-disable-next-line no-undef
const isMainnet = false;

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const getContract = useCallback(
    async (address, abi) => {
      const provider = new ethers.providers.JsonRpcProvider(
        isMainnet
          ? "https://rpc.ftm.tools/"
          : "https://rpc.testnet.fantom.network/",
        isMainnet ? 250 : 4002
      );

      return new ethers.Contract(address, abi, provider);
    },
    [window.ethereum.isConnected()]
  );

  return { getContract };
};
