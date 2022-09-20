import axios from "axios";

const localURL = "http://localhost:9000/";
const herokuDevURL = "https://market-api-dev.herokuapp.com/";

const marketplaceApi = axios.create({ baseURL: herokuDevURL });
const isMainnet = false;

export const useApi = () => {
  //#region Community
  const getPendingSuggestions = async () => {
    const pending = await marketplaceApi.get("suggestions/pendingSuggestions");
    return pending.data;
  };

  const getActiveSuggestions = async () => {
    const pending = await marketplaceApi.get("suggestions/activeSuggestions");
    return pending.data;
  };

  const getSavedSuggestions = async () => {
    const pending = await marketplaceApi.get("suggestions/savedSuggestions");
    return pending.data;
  };

  const acceptSuggestion = async (title, proposer) => {
    await marketplaceApi.post("suggestions/accept", {
      title: title,
      proposer: proposer,
    });
  };

  const saveSuggestion = async (title, proposer) => {
    await marketplaceApi.post("suggestions/save", {
      title: title,
      proposer: proposer,
    });
  };

  const declineSuggestion = async (title, proposer) => {
    await marketplaceApi.post("suggestions/decline", {
      title: title,
      proposer: proposer,
    });
  };

  const deleteSavedSuggestion = async (title, proposer) => {
    await marketplaceApi.post("suggestions/delete", {
      title: title,
      proposer: proposer,
    });
  };
  //#endregion

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
  //#endregion

  //#region Profiles
  const getProfileInfo = async (address) => {
    const res = await marketplaceApi.get(`users/profile?wallet=${address}`);
    return res.data;
  };

  const getAllProfiles = async () => {
    const res = await marketplaceApi.get(`users/all`);
    return res.data;
  };

  //#endregion

  //#region Nfts
  const getNftsForSale = async () => {
    const res = await marketplaceApi.get("nfts/nftsForSale");
    return res.data;
  };

  const getAllTransfers = async () => {
    const res = await marketplaceApi.get("nfts/allTransfers");
    return res.data;
  };

  //#endregion

  //#region Admin
  const getOldManagerBalance = async () => {
    const res = await marketplaceApi.get("admin/lastBalance");
    return res.data;
  };

  const getOldGasStationBalance = async () => {
    const res = await marketplaceApi.get("admin/lastGasStation");
    return res.data;
  };

  const loginUser = async (email, passwd) => {
    const res = await marketplaceApi.get(
      `admin/login?email=${email}&password=${passwd}`
    );
    return res.data;
  };

  const loginUserByToken = async (token) => {
    const res = await marketplaceApi.get(`admin/loginToken?token=${token}`);
    return res.data;
  };

  const getAllCategories = async () => {
    const res = await marketplaceApi.get("nfts/categories");
    return res.data;
  };

  const addNewCategory = async (engName, espName, identifier, icon) => {
    const res = await marketplaceApi.post("admin/newCategory", {
      engName,
      espName,
      identifier,
      icon,
    });
    return res.data;
  };

  const depositToGasStation = async (token, value) => {
    const res = await marketplaceApi.post("admin/deposit", {
      token,
      value,
    });
    return res.data;
  };

  //#endregion

  return {
    getNftsForSale,
    getAllProfiles,
    getProfileInfo,
    getAllTransfers,
    getPendingSuggestions,
    getActiveSuggestions,
    saveSuggestion,
    acceptSuggestion,
    declineSuggestion,
    getVerificationRequests,
    deleteSavedSuggestion,
    getVerificatedArtists,
    declineVerificationRequest,
    acceptVerificationRequest,
    getOldManagerBalance,
    getOldGasStationBalance,
    loginUser,
    loginUserByToken,
    getAllCategories,
    getSavedSuggestions,
    depositToGasStation,
    addNewCategory,
  };
};
