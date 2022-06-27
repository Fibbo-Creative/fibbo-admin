import axios from "axios";

const herokuURL = "https://fibbo-market-api.herokuapp.com/";
const localURL = "http://localhost:9000/";

const marketplaceApi = axios.create({ baseURL: herokuURL });
const isMainnet = false;

export const useApi = () => {
  //#region Community
  const getPendingSuggestions = async () => {
    const pending = await marketplaceApi.get("suggestions/pendingSuggestions");
    return pending.data;
  };

  const acceptSuggestion = async (title, proposer, value) => {
    await marketplaceApi.post("suggestions/accept", {
      title: title,
      proposer: proposer,
      value: value,
    });
  };

  const declineSuggestion = async (title, proposer) => {
    await marketplaceApi.post("suggestions/decline", {
      title: title,
      proposer: proposer,
    });
  };
  //

  //#region Artists

  const getVerificationRequests = async () => {
    const pending = await marketplaceApi.get("verify/allRequests");
    console.log(pending.data);
    return pending.data;
  };

  const getVerificatedArtists = async () => {
    const verified = await marketplaceApi.get("users/verified");
    return verified.data;
  };

  const acceptVerificationRequest = async (proposer) => {
    const verify = await marketplaceApi.post("verify/verifyArtist", {
      artist: proposer,
    });
    return verify.data;
  };

  const declineVerificationRequest = async (proposer) => {
    const decline = await marketplaceApi.post("verify/declineArtist", {
      proposer: proposer,
    });
    return decline.data;
  };
  //

  //#region Profiles
  const getProfileInfo = async (address) => {
    const res = await marketplaceApi.get(`users/profile?wallet=${address}`);
    return res.data;
  };

  //

  return {
    getProfileInfo,
    getPendingSuggestions,
    acceptSuggestion,
    declineSuggestion,
    getVerificationRequests,
    getVerificatedArtists,
    declineVerificationRequest,
    acceptVerificationRequest,
  };
};
