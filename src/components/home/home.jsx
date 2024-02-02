import React, { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { Button, Modal } from "antd";
import BigNumber from "bignumber.js";

import abiDecoder from "abi-decoder";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

import { useLocation } from "react-router-dom";
import Web3 from "web3";
import { ICU, BEP20, USDT, EXAM, ClaimLXC } from "../../utils/web3.js";

// import { baseUrl, ClientBaseURL } from "../../utils/confix";

const Dashboard = () => {
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [account, setAccount] = useState();
  const [balance, setBalance] = useState();
  const [frznBalance, setFrznBalance] = useState();
  const [registration_Free, setRegistrationFee] = useState();
  const [tokenBalance, setTokenBalance] = useState();
  const [current_id, setCurrentId] = useState();
  const [current_tokenAccepting, setREGESTRATION_FESS] = useState();
  const [tokenRewarded, setTokenRewarded] = useState();
  const [payAutoPool, setPayAutoPool] = useState();
  const [levelPrice, setLevelPrice] = useState();
  const [networkStatus, setnetworkStatus] = useState(false);
  const [gasSatus, setgasSatus] = useState(false);
  const [balanceStatus, setbalanceStatus] = useState(false);

  const [claimAvailable, setClaimAvailable] = useState();
  const [claimTaken, setClaimTaken] = useState();
  const [eligibleClaimPercentage, setEligibleClaimPercentage] = useState();
  const [partnerID, setPartnerID] = useState();
  const [total_rbcd, setTotal_rbcd] = useState();

  // const [referrerID, setReferrerID] = useState({ id: "", coref: "" });
  const [referrerID, setReferrerID] = useState({ id: "" });
  const [identify, setidentify] = useState("");
  const [tokenReword, setTokenReword] = useState({ amount: "" });
  const [regFess, setRegFess] = useState({ amount: "" });

  // set it latter
  const [tokenPrice, setTokenPrice] = useState();
  const [nextReward, setNetxtReward] = useState();

  const [userAc, setUserAc] = useState(0);
  const [loading, setLoading] = useState(false);

  const [coreID, setCoreID] = useState();
  const [coreReferrerID, setCoreReferrerID] = useState();
  const [coreReferredUsers, setCoreReferredUsers] = useState();
  const [coreIncome, setCoreIncome] = useState();
  const [coreTokenPrice, setCoreTokenPrice] = useState();
  const [coreReceivedToken, setCoreReceivedToken] = useState();
  const [coreRegTime, setCoreRegTime] = useState();
  const [eligibleCorePercentage, setEligibleCorePercentage] = useState();

  const [total_rbcdClaim, setTotal_rbcdClaim] = useState();
  const [claimAvailableClaim, setClaimAvailableClaim] = useState();
  const [claimTakenClaim, setClaimTakenClaim] = useState();
  const [coreUserExist, setCoreUserExist] = useState();

  const [testData, setTestData] = useState(false);

  //////////////////////////////////
  const location = useLocation().search;

  const abcref = new URLSearchParams(location).get("abcref");
  const refid = new URLSearchParams(location).get("refid");

  useEffect(() => {
    if (abcref === "123xyz") {
      if (refid !== 0) {
        setReferrerID({ ...referrerID, id: refid });
      }
    }
  }, []);
  //////////////////////////////////
  const [udCoreferrerID, setUdCoreferrerID] = useState();
  const [udId, setUdId] = useState();
  const [udIncome, setUdIncome] = useState();
  const [udIsExist, setUdIsExist] = useState();
  const [udReferrerID, setUdReferrerID] = useState();
  const [udStageIncomeReceived, setUdStageIncomeReceived] = useState();
  const [exSubAdmin, setExSubAdmin] = useState();

  // user Details
  useEffect(() => {
    async function user_detail() {
      const account = await web3.eth.requestAccounts();

      let EXAM_CONTREC = new web3.eth.Contract(EXAM.ABI, EXAM.address);
      let subAdmin = await EXAM_CONTREC.methods.isQualified(account[0]).call();
      setExSubAdmin(subAdmin);

      let ICU_ = new web3.eth.Contract(ICU.ABI, ICU.address);
      let userDetail = await ICU_.methods.users(account[0]).call();
      let {
        autoPoolPayReceived,
        autopoolPayReciever,
        coreferredUsers,
        coreferrerID,
        id,
        income,
        isExist,
        levelIncomeReceived,
        missedPoolPayment,
        referredUsers,
        referrerID,
        stageIncomeReceived,
      } = userDetail;
      setUdCoreferrerID(coreferrerID);
      setUdId(id);
      setUdIncome(income);
      setUdIsExist(isExist);
      setUdReferrerID(referrerID);
      setUdStageIncomeReceived(stageIncomeReceived);
      let claimAvailable = await ICU_.methods.claimAvailable(account[0]).call();
      claimAvailable = web3.utils.fromWei(claimAvailable, "ether");
      setClaimAvailable(roundToFour(claimAvailable));
      let claimTaken = await ICU_.methods.claimTaken(account[0]).call();
      claimTaken = web3.utils.fromWei(claimTaken, "ether");
      setClaimTaken(roundToFour(claimTaken));
      let elibleClaim = await ICU_.methods
        .eligibleClaimPercentage(account[0])
        .call();
      setEligibleClaimPercentage(Number(elibleClaim / 100).toFixed(2));
      let partnerId = await ICU_.methods.partnerID(account[0]).call();
      setPartnerID(partnerId);

      let total_rbcd = await ICU_.methods.total_rbcd().call();

      total_rbcd = web3.utils.fromWei(total_rbcd, "ether");
      setTotal_rbcd(roundToFour(total_rbcd));

      let coreusers = await ICU_.methods.coreusers(account[0]).call();
      setCoreUserExist(coreusers.isExist);

      setCoreID(coreusers.coreID);
      setCoreReferrerID(coreusers.referrerID);
      setCoreReferredUsers(coreusers.referredUsers);
      setCoreIncome(
        Number(await web3.utils.fromWei(coreusers.income, "ether")).toFixed(4)
      );
      setCoreTokenPrice(
        Number(await web3.utils.fromWei(coreusers.tokenPrice, "ether")).toFixed(
          6
        )
      );
      setCoreReceivedToken(
        Number(
          await web3.utils.fromWei(coreusers.receivedToken, "ether")
        ).toFixed(4)
      );
      setCoreRegTime(await epochToDate(coreusers.regTime));
      let eligibleCorePercentages = await ICU_.methods
        .eligibleCorePercentage(account[0])
        .call();
      setEligibleCorePercentage(
        Number(eligibleCorePercentages / 100).toFixed(2)
      );

      let ClaimCon = new web3.eth.Contract(ClaimLXC.ABI, ClaimLXC.address);
      let totalRbcdClaim = await ClaimCon.methods.total_rbcd().call();
      setTotal_rbcdClaim(
        Number(await web3.utils.fromWei(totalRbcdClaim, "ether")).toFixed(4)
      );

      let claimTakenC = await ClaimCon.methods.claimTaken(account[0]).call();

      setClaimTakenClaim(
        Number(await web3.utils.fromWei(claimTakenC, "ether")).toFixed(4)
      );
      let sumofall =
        (Number(totalRbcdClaim) +
          Number(elibleClaim) +
          Number(eligibleCorePercentages)) /
        10000;
      sumofall = sumofall.toString();

      setClaimAvailableClaim(
        Number(await web3.utils.fromWei(sumofall, "ether")).toFixed(4)
      );
    }
    user_detail();
  }, []);
  async function epochToDate(epochTime) {
    // Convert epoch time to milliseconds (JavaScript uses milliseconds)
    // Convert epoch to milliseconds
    if (epochTime == undefined || Number(epochTime) <= 0) {
      // return 0;
      return "00/00/0000";
    }
    const milliseconds = epochTime * 1000;
    console.log("millisecond:", milliseconds);
    // Create a new Date object
    const date = new Date(milliseconds);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based, so add 1
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  }

  //////////////////////////////////

  function roundToFour(num) {
    return +(Math.round(num + "e+4") + "e-4");
  }

  useEffect(() => {
    async function load() {
      const accounts = await web3.eth.requestAccounts();
      if (!accounts) {
        alert("please install metamask");
      }
      let balance = await web3.eth.getBalance(accounts[0]);
      const etherValue = web3.utils.fromWei(balance, "ether");
      const networkId = await web3.eth.net.getId();
      let Usdt = new web3.eth.Contract(USDT.ABI, USDT.address);
      const bal = await Usdt.methods.balanceOf(accounts[0]).call();
      const usdtbal = bal / 10 ** 18;
      // console.log(bal)
      if (150 <= usdtbal) {
        setbalanceStatus(true);
      }

      if (networkId === 97) {
        setnetworkStatus(true);
      }
      if (0.002 <= parseFloat(etherValue)) {
        setgasSatus(true);
      }

      setBalance(roundToFour(etherValue));
      setAccount(accounts[0]);
      console.log("accounts: ", account[0], account);
      let BEP20_ = new web3.eth.Contract(BEP20.ABI, BEP20.address);
      let ICU_ = new web3.eth.Contract(ICU.ABI, ICU.address);

      let frozenBalance = await BEP20_.methods
        ._frozenBalance(accounts[0])
        .call();
      let RegistrationFee = await ICU_.methods.REGESTRATION_FESS().call();
      let currentId = await ICU_.methods.currUserID().call();
      let REGESTRATION_FESS = await ICU_.methods.REGESTRATION_FESS().call();
      let token_rewared = await ICU_.methods.tokenReward().call();
      let pay_auto_pool = await ICU_.methods.Autopool_Level_Income().call();
      let level_income = await ICU_.methods.level_income().call();
      let tokenPriceIs = await ICU_.methods.tokenPrice().call();
      let getNextReward = await ICU_.methods.getNextReward().call();
      // console.log("level income", level_income, getNextReward, tokenPriceIs);

      const convert_pay_auto_pool = web3.utils.fromWei(pay_auto_pool, "ether");

      const frozenBalance_convert = web3.utils.fromWei(frozenBalance, "ether");
      setFrznBalance(roundToFour(frozenBalance_convert));

      const convert_regfee = web3.utils.fromWei(RegistrationFee, "ether");
      setRegistrationFee(convert_regfee);

      setCurrentId(currentId);
      setREGESTRATION_FESS(REGESTRATION_FESS);

      const token_rewared_convert = web3.utils.fromWei(token_rewared, "ether");
      setTokenRewarded(roundToFour(token_rewared_convert));
      setPayAutoPool(roundToFour(convert_pay_auto_pool));

      const convert_levelincome = web3.utils.fromWei(level_income, "ether");
      setLevelPrice(roundToFour(convert_levelincome));

      // token balance
      let token_balance = await BEP20_.methods.balanceOf(accounts[0]).call();

      const convert_tokenBal = web3.utils.fromWei(token_balance, "ether");
      setTokenBalance(roundToFour(convert_tokenBal));

      // Set Token PRice and Next Level Reward
      const tokenPriceIs_convert = web3.utils.fromWei(tokenPriceIs, "ether");
      const getNextReward_convert = web3.utils.fromWei(getNextReward, "ether");

      setTokenPrice(tokenPriceIs_convert);
      setNetxtReward(roundToFour(getNextReward_convert));
    }

    function roundToFour(num) {
      return +(Math.round(num + "e+4") + "e-4");
    }
    load();
  }, []);

  const importTokenToMetaMask = async () => {
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      console.log("MetaMask is not installed");
      return;
    }

    try {
      const result = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: "0x487C09FfecD0525e3D86E55deF2417542cFBDcC6",
            symbol: "LXC",
            decimals: 18,
            image:
              "https://main.dzpg12buw8l5c.amplifyapp.com/static/media/logo.43931fe53d4b9d4bf938.png",
          },
        },
      });

      if (result) {
        // console.log(`Successfully imported ${tokenSymbol} to MetaMask`);
      } else {
        console.log("Token import was canceled by the user");
      }
    } catch (error) {
      console.log("Error importing token to MetaMask:", error);
    }
  };

  const switchToCustomChain = async () => {
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      console.log("MetaMask is not installed");
      return;
    }

    const chainParams = {
      chainId: "0x61",
      chainName: "Binance Smart Chain Testnet",
      nativeCurrency: {
        name: "tBNB",
        symbol: "tBNB",
        decimals: 18,
      },
      rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
      blockExplorerUrls: ["https://testnet.bscscan.com/"],
    };

    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [chainParams],
      });
    } catch (error) {
      console.log("Error switching to custom chain:", error);
    }
  };

  const handleSubmit = async (event) => {
    if (!networkStatus) {
      return alert("please connect to binance testnet network");
    }
    if (!gasSatus) {
      return alert("insufficient gas fee");
    }
    if (!balanceStatus) {
      return alert("insufficient usdt fund");
    }

    event.preventDefault();
    let { id } = referrerID;
    // console.log("before sircle");
    let coRefId;

    // console.log("after sircle");

    // return;
    setIsModalOpen(true);
    let ICU_ = new web3.eth.Contract(ICU.ABI, ICU.address);
    let value_ = await ICU_.methods.REGESTRATION_FESS().call();
    let EXAM_CONTREC = new web3.eth.Contract(EXAM.ABI, EXAM.address);

    // console.log("resonse value", value_);

    let REGESTRATION_FESS = await ICU_.methods.REGESTRATION_FESS().call();
    //.on("error", console.error);
    // console.log("the user id", id);
    let ref_user_acc = await ICU_.methods.userList(id).call();
    let ref_user_detail = await ICU_.methods.users(ref_user_acc).call();
    // console.log("ref_user_detail", ref_user_detail);
    const { referredUsers, coreferrerID } = ref_user_detail;

    let subAdmin = await EXAM_CONTREC.methods.isQualified(ref_user_acc).call();
    // console.log("sub admin", subAdmin);
    if (subAdmin && parseInt(referredUsers) > 2) {
      coRefId = id;
    } else {
      coRefId = coreferrerID;
    }
    // console.log("the approve REGESTRATION_FESS", REGESTRATION_FESS);
    // the approve REGESTRATION_FESS ERC20-Token-Accepting

    if (REGESTRATION_FESS === "150000000000000000000") {
      let USDT_ = new web3.eth.Contract(USDT.ABI, USDT.address);
      let isAllowance = await USDT_.methods
        .allowance(account, ICU.address)
        .call();
      let isApprove, reg_user;
      console.log("iss alloweance");
      // if (isAllowance < value_) {
      isApprove = await USDT_.methods
        .approve(ICU.address, value_)
        .send({ from: account })
        .on("receipt", function (receipt) {
          console.log("recept: ", receipt);
        })
        .on("error", console.error);
      console.log("is approved after asss allownce");

      console.log("isApprove", isApprove);
      reg_user = await ICU_.methods
        .regCoreMember(value_)
        .send({ from: account, value: 0 })
        .on("error", (err) => {
          console.log("the error in reg", err);
          setIsModalOpen(false);
        });
      console.log("reg_user", reg_user);

      console.log("****** native coin accepting condtion", reg_user);
      if (reg_user.status) {
        setIsModalOpen(false);
        alert("Registerd Success");
      } else {
        alert("Registerd Failed !!!!");
        setIsModalOpen(false);
      }
    } else {
      let BEP20_ = new web3.eth.Contract(BEP20.ABI, BEP20.address);
      let approve = await BEP20_.methods
        .approve(ICU.address, value_)
        .send({ from: account });
      console.log("the approve response", approve);
      console.log("the value out of status", value_);
      if (approve.status === true) {
        let reg_user = await ICU_.methods
          .regUser(id, coRefId, value_)
          .send({ from: account, value: 0 })
          .on("error", (err) => {
            console.log("the error in reg", err);
            setIsModalOpen(false);
          });
        if (reg_user.status) {
          alert("Registerd Success");
          setIsModalOpen(false);
        } else {
          alert("Registerd Failed !!!!");
          setIsModalOpen(false);
        }
      }
    }
  };

  const tokenAcceptanceOption = [
    { value: "true", label: "True" },
    { value: "false", label: "False" },
  ];

  // your function to copy here
  const copyToClipBoard = async () => {
    try {
      let ICU_ = new web3.eth.Contract(ICU.ABI, ICU.address);
      let { id } = await ICU_.methods.users(userAc).call();
      if (parseInt(id) === 0) {
        alert("Referral Id not found");
        return;
      }
      let ClientBaseURL = "";

      let refLink = `${ClientBaseURL}?refid=${id}&abcref=123xyz`;
      await navigator.clipboard.writeText(refLink);
    } catch (err) {}
  };
  async function userAccount() {
    const accounts = await web3.eth.requestAccounts();
    if (!accounts) {
      alert("please install metamask");
    }
    setUserAc(accounts[0]);
  }
  useEffect(() => {
    userAccount();
  }, []);
  const claimTokens = async () => {
    // event.preventDefault();
    try {
      let ICU_ = new web3.eth.Contract(ICU.ABI, ICU.address);
      console.log("accoutn", account);
      await ICU_.methods.takeClaim().send({ from: account });
    } catch (e) {}
  };

  // async function scientificToInteger(scientificNotation) {
  //   // Parse the scientific notation using a regular expression
  //   const match = scientificNotation.match(/^(\d+(\.\d+)?)(e(\+|-)?(\d+))?$/);
  //   if (!match) {
  //     throw new Error("Invalid scientific notation");
  //   }

  //   // Extract the coefficient and the exponent parts
  //   const coefficient = parseFloat(match[1]); // Parse the coefficient as a floating point number
  //   const exponent = match[5] ? parseInt(match[5]) : 0; // Parse the exponent as an integer, default to 0 if not provided

  //   // Calculate the equivalent integer
  //   const equivalentInteger = coefficient * Math.pow(10, exponent);
  //   return equivalentInteger;
  // }
  async function scientificToInteger(scientificNotation) {
    const [coefficient, exponent] = scientificNotation.split("e");
    const decimalValue = parseFloat(coefficient);
    const integerPart = Math.floor(decimalValue);
    const fractionalPart = decimalValue - integerPart;
    let stringValue = integerPart.toString();
    const splitArray = scientificNotation.split("e+");
    const decimalPlaces = splitArray[1];
    stringValue += fractionalPart.toFixed(decimalPlaces).slice(2);
    console.log("String Value: ", stringValue);
    return stringValue;
  }

  const regCoreMember = async () => {
    // event.preventDefault();
    try {
      setLoading(true);
      console.log("Loading set true: ", loading);
      const accounts = await web3.eth.requestAccounts();

      let ICU_ = new web3.eth.Contract(ICU.ABI, ICU.address);
      console.log("accoutn", account);
      let value_ = await ICU_.methods.REGESTRATION_FESS().call();
      value_ = (Number(value_) * 10).toString();
      value_ = await scientificToInteger(value_);
      let USDT_ = new web3.eth.Contract(USDT.ABI, USDT.address);
      await USDT_.methods
        .approve(ICU.address, value_)
        .send({ from: accounts[0] })
        .on("receipt", function (receipt) {
          setLoading(false);
        })
        .on("error", function (error) {
          setLoading(false);
          console.log(error);
        });

      await ICU_.methods
        .regCoreMember(value_)
        .send({ from: accounts[0] })
        .on("receipt", function (receipt) {
          setLoading(false);
          console.log("Receipt,receipt");
          alert("You have successfully Register Core Member");
        });
    } catch (e) {
      console.log("In catch block of reg core member: ", e);
      alert("Register Core Member Failed");
      setLoading(false);
    }
  };

  const takeClaimCon = async () => {
    try {
      let TakeCl = new web3.eth.Contract(ClaimLXC.ABI, ClaimLXC.address);
      await TakeCl.methods.takeClaim().send({ from: account });
    } catch (e) {}
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="home-container container">
      <div className="row public-section-bg">
        {/* ////// */}
        {/* public value  */}
        {/* ////// */}
        <div className="col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body text-center">Public Value</div>
          </div>
        </div>
        {/* Is Exist  */}
        <div className="col-lg-3 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h6>Is Exist</h6>
              <h4 className="mb-0">{udIsExist ? "YES" : "NO"}</h4>
            </div>
          </div>
        </div>
        {/* sub admin  */}
        <div className="col-lg-3 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h6>Sub Admin </h6>
              <h4 className="mb-0">{exSubAdmin ? "YES" : "NO"}</h4>
            </div>
          </div>
        </div>
        {/* stage income */}
        <div
          className="col-lg-3 col-md-6 col-sm-12 grid-margin"
          onClick={() => {
            importTokenToMetaMask();
          }}
        >
          <div className="card">
            <div className="click-btn">
              <h6>Click To</h6>
              <h2 className="mb-0">Add Token</h2>
            </div>
          </div>
        </div>
        <div
          className="col-lg-3 col-md-6 col-sm-12 grid-margin"
          onClick={() => {
            switchToCustomChain();
          }}
        >
          <div className="card">
            <div className=" click-btn">
              <h6>Click To Change</h6>
              <h2 className="mb-0"> Network</h2>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h6>Frozen Balance </h6>
              <h4 className="mb-0">{frznBalance ? frznBalance : 0} LXC</h4>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h6>Token Balance</h6>
              <h4 className="mb-0">{tokenBalance ? tokenBalance : 0} LXC</h4>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h6>Claim AVailable</h6>
              <h4 className="mb-0">
                {claimAvailable ? claimAvailable : 0} LXC
              </h4>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h6>Claim Token</h6>
              <h4 className="mb-0">{claimTaken ? claimTaken : 0} LXC</h4>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h6>Eligible Claim Percentage</h6>
              <h4 className="mb-0">
                {eligibleClaimPercentage ? eligibleClaimPercentage : 0} %
              </h4>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h6>Partner ID</h6>
              <h4 className="mb-0">{partnerID ? partnerID : 0} </h4>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h6>User ID</h6>
              <h4 className="mb-0">{udId ? udId : 0}</h4>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h6>Total RBCD</h6>
              <h4 className="mb-0">{total_rbcd ? total_rbcd : 0} LXC</h4>
            </div>
          </div>
        </div>
        {coreUserExist && (
          <>
            <div className="col-lg-3 col-md-6 col-sm-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h6>Core ID</h6>
                  <h4 className="mb-0">{coreID ? coreID : 0} </h4>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h6>Core Referrer ID</h6>
                  <h4 className="mb-0">
                    {coreReferrerID ? coreReferrerID : 0}{" "}
                  </h4>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h6>Core Referred Users</h6>
                  <h4 className="mb-0">
                    {coreReferredUsers ? coreReferredUsers : 0}{" "}
                  </h4>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h6>Core Income</h6>
                  <h4 className="mb-0">{coreIncome ? coreIncome : 0} LXC</h4>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h6>Core Token Price</h6>
                  <h4 className="mb-0">
                    {coreTokenPrice ? coreTokenPrice : 0} LXC
                  </h4>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h6>Core Received Token</h6>
                  <h4 className="mb-0">
                    {coreReceivedToken ? coreReceivedToken : 0} LXC
                  </h4>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h6>Core Reg Time</h6>
                  <h4 className="mb-0">{coreRegTime ? coreRegTime : 0} </h4>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h6>Eligible Core Percentage</h6>
                  <h4 className="mb-0">
                    {eligibleCorePercentage ? eligibleCorePercentage : 0} %{" "}
                  </h4>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="row public-section-claim">
        {/* ////// */}
        {/* public value  */}
        {/* ////// */}
        <div className="col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body text-center">Claim Contract</div>
          </div>
        </div>
        {/* Is Exist  */}
        <div className="col-lg-3 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h6>Total RBCD </h6>
              <h4 className="mb-0">{total_rbcdClaim ? total_rbcdClaim : 0}</h4>
            </div>
          </div>
        </div>
        {/* sub admin  */}

        <div className="col-lg-3 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h6>Claim Available </h6>
              <h4 className="mb-0">
                {claimAvailableClaim ? claimAvailableClaim : 0} LXC
              </h4>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h6>TakeClaim </h6>
              <h4 className="mb-0">
                {claimTakenClaim ? claimTakenClaim : 0} LXC
              </h4>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h6>Claim Taken </h6>
              <button onClick={takeClaimCon}>Take Calim</button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-12 grid-margin">
        <div className="card">
          <div className="card-body text-center">Write Function</div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-6 grid-margin">
          <div className="card">
            <div className="card-body">
              <h6>Take Claim</h6>
              <button onClick={claimTokens}>Claim</button>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6 grid-margin">
          <div className="card">
            <div className="card-body">
              <h6>Reg Core Member</h6>

              {loading && (
                <div className="loader-overlay"> Transaction is Approving </div>
              )}
              <button onClick={regCoreMember}>Reg Core Member</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
