import { WFTM_ABI } from "./abi";
import useContract from "../hooks/useContract";
import { Contracts } from "../constants/network";
import { formatEther } from "ethers/lib/utils";

const wftmAddress = Contracts.TESTNET.wftm;

export const useWFTMContract = () => {
  const { getContract } = useContract();

  const getWFTMContract = async () => await getContract(wftmAddress, WFTM_ABI);

  const getWFTMBalance = async (address) => {
    const contract = await getWFTMContract();
    let balance = await contract.balanceOf(address);
    return formatEther(balance);
  };

  return {
    getWFTMBalance,
  };
};
