import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import Web3 from "web3";
import { ICU, USDT } from "../../utils/web3.js";
// Withdrawalbe income wei to eth : done
// STake Time change to date: Done
// Pleae select valid top up already topedup user : ITs working
// Loader or processer during approval of transaction to send transaction
// Add card of rewardwin : Done
// Stake Users card color little bit change > Done
const Dashboard = () => {
  window.Buffer = Buffer;

  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

  const [account, setAccount] = useState();
  const [registration_Free, setRegistrationFee] = useState();
  const [lastTopUp, setLastTopUp] = useState();
  const [realWithdrawableRoi, setRealWithdrawableRoi] = useState();
  const [realWithdrawableStakingRoi, setRealWithdrawableStakingRoi] =
    useState();
  const [stakeTimes, setStakeTime] = useState();
  const [lastStake, setLastStake] = useState();
  const [totalStake, setTotalStake] = useState();
  const [currentStake, setCurrentStake] = useState();
  const [rootStakeBalance, setRootStakeBalance] = useState();
  const [takenStkngReward, setTakenStkngReward] = useState();

  const [totalIncomeTaken, setTotalIncomeTaken] = useState();
  const [totalWithdrawable, setTotalWithdrawable] = useState();
  const [userExist, setUserExist] = useState();
  const [userId, setUserId] = useState();
  const [userReferrerId, setUserReferrerId] = useState();
  const [topupAmount, setTopupAmount] = useState();
  const [referredUsers, setReferredUsers] = useState();
  const [capping, setCapping] = useState();
  const [income, setIncome] = useState();
  const [rootBalance, setRootBalance] = useState();
  const [assuredReward, setAssuredReward] = useState();
  const [levelIncomeReceived, setLevelIncomeReceived] = useState();
  const [incomeTaken, setIncomeTaken] = useState();
  const [takenROI, setTakenROI] = useState();
  const [userStakeTimes, setUserStakeTimes] = useState();
  const [incomeMissed, setIncomeMissed] = useState();
  const [withdrawableIncome, setWithdrawableIncome] = useState();
  const [rewardWin, setRewardWin] = useState();
  const [registrationTime, setRegistrationTime] = useState();
  const [stkTime, setStkTime] = useState();
  const [stkCapping, setStkCapping] = useState();
  const [stkMonths, setStkMonths] = useState();
  const [referrerId, setReferrerId] = useState();
  const [stakeAmount, setStakeAmount] = useState();
  const [stakeMonths, setStakeMonths] = useState("24");
  const [topUpAmounts, setTopUpAmounts] = useState("50");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const accounts = await web3.eth.requestAccounts();
      if (!accounts) {
        alert("please install metamask");
      }

      setAccount(accounts[0]);
      console.log("Account is ", account);
      // let BEP20_ = new web3.eth.Contract(BEP20.ABI, BEP20.address);
      let NEW_CBC_ROI = new web3.eth.Contract(ICU.ABI, ICU.address);
      let RegistrationFee = await NEW_CBC_ROI.methods
        .REGESTRATION_FESS()
        .call();
      console.log("Accounts of zero is :", accounts[0]);

      const convert_regfee = Number(
        web3.utils.fromWei(RegistrationFee, "ether")
      ).toFixed(2);
      setRegistrationFee(convert_regfee);
      // set Last TopUp:

      let lastTopsup = await NEW_CBC_ROI.methods.lastTopup(accounts[0]).call();
      lastTopsup = Number(web3.utils.fromWei(lastTopsup, "ether")).toFixed(2);
      setLastTopUp(lastTopsup);
      // Set Real Withdrawable ROI
      let realROI = await NEW_CBC_ROI.methods
        .realWithdrableROI(accounts[0])
        .call();
      realROI = Number(web3.utils.fromWei(realROI, "ether")).toFixed(2);
      setRealWithdrawableRoi(realROI);
      // Set Real Withdrawable Staking ROI
      let realStakingRoi = await NEW_CBC_ROI.methods
        .realWithdrawableStakingROI(accounts[0])
        .call();
      realStakingRoi = Number(
        web3.utils.fromWei(realStakingRoi, "ether")
      ).toFixed(2);
      setRealWithdrawableStakingRoi(realStakingRoi);

      let regTime = await NEW_CBC_ROI.methods.regTime(accounts[0]).call();
      setRegistrationTime(await epochToDate(regTime));

      let stakeTim = await NEW_CBC_ROI.methods.stkTime(accounts[0]).call();
      setStkTime(await epochToDate(stakeTim)); // await epochToDate(user.stakeTimes)
      let stkCap = await NEW_CBC_ROI.methods.stkCapping(accounts[0]).call();
      stkCap = Number(web3.utils.fromWei(stkCap, "ether")).toFixed(2);
      setStkCapping(stkCap);
      let stkMonth = await NEW_CBC_ROI.methods.stakeMonths(accounts[0]).call();
      setStkMonths(stkMonth);
      // Set Stacke
      const stakeUse = await NEW_CBC_ROI.methods.stakeUser(accounts[0]).call();

      // setStakeTime(await epochToDate(stakeUse.stakeTimes));
      async function testing() {
        setStakeTime(await epochToDate(stakeUse.stakeTimes));
      }
      testing();

      setLastStake(
        Number(web3.utils.fromWei(stakeUse.lastStaked, "ether")).toFixed(2)
      );
      setTotalStake(
        Number(web3.utils.fromWei(stakeUse.totalStaked, "ether")).toFixed(2)
      );
      setCurrentStake(
        Number(web3.utils.fromWei(stakeUse.currentStaked, "ether")).toFixed(2)
      );
      setRootStakeBalance(
        Number(web3.utils.fromWei(stakeUse.rootStakeBalance, "ether")).toFixed(
          2
        )
      );
      setTakenStkngReward(
        Number(web3.utils.fromWei(stakeUse.takenStkngReward, "ether")).toFixed(
          2
        )
      );
      // Set Total Token Taken
      const totalTokenTaken = await NEW_CBC_ROI.methods
        .totalIncomeTaken(accounts[0])
        .call();
      setTotalIncomeTaken(
        Number(web3.utils.fromWei(totalTokenTaken, "ether")).toFixed(2)
      );
      // await epochToDate(user.stakeTimes)
      // Set Total Withdrawable
      const totalWithdrawa = await NEW_CBC_ROI.methods
        .totalWithdrawable(accounts[0])
        .call();

      setTotalWithdrawable(
        Number(web3.utils.fromWei(totalWithdrawa, "ether")).toFixed(2)
      );
      // Set users data
      const user = await NEW_CBC_ROI.methods.users(accounts[0]).call();
      setUserExist(user.isExist);
      setUserId(user.id);
      setUserReferrerId(user.referrerID);
      setTopupAmount(
        Number(web3.utils.fromWei(user.topupAmount, "ether")).toFixed(2)
      );
      setReferredUsers(user.referredUsers);
      setCapping(Number(web3.utils.fromWei(user.capping, "ether")).toFixed(2));
      setIncome(Number(web3.utils.fromWei(user.income, "ether")).toFixed(2));
      setRootBalance(
        Number(web3.utils.fromWei(user.rootBalance, "ether")).toFixed(2)
      );
      setAssuredReward(
        Number(web3.utils.fromWei(user.assuredReward, "ether")).toFixed(2)
      );
      setLevelIncomeReceived(Number(user.levelIncomeReceived).toFixed());
      setIncomeTaken(
        Number(web3.utils.fromWei(user.incomeTaken, "ether")).toFixed(2)
      );
      setTakenROI(
        Number(web3.utils.fromWei(user.takenROI, "ether")).toFixed(2)
      );
      async function test1() {
        setUserStakeTimes(await epochToDate(user.stakeTimes));
      }
      test1();
      setIncomeMissed(Number(user.incomeMissed).toFixed());
      const rewardWins = await NEW_CBC_ROI.methods
        .rewardWin(accounts[0])
        .call();

      setRewardWin(Number(web3.utils.fromWei(rewardWins, "ether")).toFixed(2));
      // setUsers(user.id);
      // set withdrawable Income
      const withdrawableInc = await NEW_CBC_ROI.methods
        .withdrawableIncome(accounts[0])
        .call();
      setWithdrawableIncome(
        Number(web3.utils.fromWei(withdrawableInc, "ether")).toFixed(2)
      );
    }

    load();
  }, []);

  async function epochToDate(epochTime) {
    // Convert epoch time to milliseconds (JavaScript uses milliseconds)
    // Convert epoch to milliseconds
    if (epochTime == undefined || Number(epochTime) <= 0) {
      return 0;
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
  // handle change for registration
  const handleChange = (event) => {
    // let { name, value } = event.target;
    // setReferrerID({ ...referrerID, [name]: value });
    setReferrerId(event.target.value);
  };
  // Function to handle changes in the dropdowns
  const handleChangeDropdownStake = (event) => {
    // Update the selectedValues state based on the dropdown ID
    console.log("Event target", event.target);
    setStakeMonths(event.target.value);
  };

  // Function to handle changes in the dropdowns
  const handleChangeTopUp = (event) => {
    // Update the selectedValues state based on the dropdown ID
    setTopUpAmounts(event.target.value);
  };

  const handleChangeStakeAmount = (event) => {
    console.log("Stake Amount", event.target.value);
    setStakeAmount(event.target.value);
  };
  // Check condition of Value for Stacke CBC
  function isValidValue(value) {
    // Check if the value is a number
    if (typeof value !== "number") {
      return false;
    }
    // Check if the value is not less than 100 and not more than 2400
    if (value < 100 || value > 2400) {
      return false;
    }
    // Check if the value is a multiple of 100
    if (value % 100 !== 0) {
      return false;
    }
    // If all conditions are met, the value is valid
    return true;
  }
  // registration
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let id = referrerId;
      let amount = web3.utils.toWei(registration_Free, "ether"); // registration_Free; //web3.utils.toWei(amount, "ether")).toFixed(2) / 10000000000000000;
      console.log("Amount To Wei:", amount);
      if (id === "0") {
        id = "50000";
      }
      let ICU_ = new web3.eth.Contract(ICU.ABI, ICU.address);
      let USDT_ = new web3.eth.Contract(USDT.ABI, USDT.address);
      let isAllowance = await USDT_.methods
        .allowance(account, ICU.address)
        .call();
      let isApprove, reg_user;
      if (isAllowance < amount) {
        setLoading(true);

        isApprove = await USDT_.methods
          .approve(ICU.address, amount)
          .send({ from: account })
          .on("receipt", async function (receipt) {
            setLoading(false);

            reg_user = await ICU_.methods
              .Registration(id, amount)
              .send({ from: account, value: 0 });
            console.log("****** native coin accepting condtion", reg_user);
            if (reg_user.status) {
              alert("Registerd Success");
            } else {
              alert("Registerd Failed !!!!");
            }
          })
          .on("error", function (error, receipt) {
            // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
            setLoading(false);
          });
      } else {
        reg_user = await ICU_.methods
          .Registration(id, amount)
          .send({ from: account, value: 0 });
        console.log("****** native coin accepting condtion", reg_user);
        if (reg_user.status) {
          alert("Registerd Success");
        } else {
          alert("Registerd Failed !!!!");
        }
      }
    } catch (e) {
      alert("Error is catched");
    }
  };

  // Top Up
  const handleSubmitTopUP = async (event) => {
    event.preventDefault();
    try {
      let ICU_ = new web3.eth.Contract(ICU.ABI, ICU.address);
      let topUpamount;
      let amount = await ICU_.methods.lastTopup(account).call();
      console.log("Amount :", amount);
      amount = web3.utils.fromWei(amount.toString(), "ether");

      if (amount == 0) {
        topUpamount = 50;
      } else if (amount == 400) {
        topUpamount = 400;
      } else {
        topUpamount = amount * 2;
      }
      // topUpamount = web3.utils.toWei(topUpamount.toString(), "ether");
      console.log("Toup is :", topUpamount, topUpAmounts);
      const isNumber1EqualToNumber2 =
        Number(topUpamount) === Number(topUpAmounts);

      if (!isNumber1EqualToNumber2) {
        alert("Please Select Valid Top Up Amount");
        return;
      }
      topUpamount = web3.utils.toWei(topUpamount.toString(), "ether");
      // the approve currentTokenAccepting ERC20-Token-Accepting

      let USDT_ = new web3.eth.Contract(USDT.ABI, USDT.address);
      let isAllowance = await USDT_.methods
        .allowance(account, ICU.address)
        .call();
      let isApprove, user_topup;
      if (isAllowance < topUpamount) {
        setLoading(true);

        isApprove = await USDT_.methods
          .approve(ICU.address, topUpamount)
          .send({ from: account })
          .on("receipt", async function (receipt) {
            setLoading(false);

            user_topup = await ICU_.methods
              .topUp(topUpamount)
              .send({ from: account });
            console.log("****** native coin accepting condtion", user_topup);
            if (user_topup.status) {
              alert("Top UP Success");
            } else {
              alert("Top UP Failed !!!!");
            }
          })
          .on("error", function (error, receipt) {
            // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
            setLoading(false);
          });
      } else {
        user_topup = await ICU_.methods
          .topUp(topUpamount)
          .send({ from: account });
        console.log("****** native coin accepting condtion", user_topup);
        if (user_topup.status) {
          alert("Top UP Success");
        } else {
          alert("Top UP Failed !!!!");
        }
      }
    } catch (e) {
      console.log("Errror :", e);
      alert("Error is catched");
    }
  };

  const handleSubmitWithdraw = async (event) => {
    event.preventDefault();
    try {
      let ICU_ = new web3.eth.Contract(ICU.ABI, ICU.address);
      await ICU_.methods.withdrawAllIncome().send({ from: account });
    } catch (e) {
      alert("Error Trigered");
    }
  };
  // Withdraw Staking ROI
  const handleSubmitStakingWithdraw = async (event) => {
    event.preventDefault();
    try {
      let ICU_ = new web3.eth.Contract(ICU.ABI, ICU.address);
      await ICU_.methods.withdrawStakingROI().send({ from: account });
    } catch (e) {
      alert("Error Trigered");
    }
  };
  // Handle Submin on StackeCBC
  const handleSubmitStake = async (event) => {
    event.preventDefault();
    try {
      // console.log("Is Valid Value: ", isValidValue);
      console.log("StakeAmount: ", stakeAmount);
      let isValid = isValidValue(Number(stakeAmount));
      console.log("is Valid Value: ", isValid);
      if (!isValid) {
        alert(
          "Stake CBC Amount should be multiple of >=100 && <2400 and multiple of 100 "
        );
        return;
      }
      let ICU_ = new web3.eth.Contract(ICU.ABI, ICU.address);
      let USDT_ = new web3.eth.Contract(USDT.ABI, USDT.address);
      let amount = web3.utils.toWei(stakeAmount, "ether");

      let isAllowance = await USDT_.methods
        .allowance(account, ICU.address)
        .call();
      let isApprove, reg_user;
      if (isAllowance < amount) {
        setLoading(true);

        isApprove = await USDT_.methods
          .approve(ICU.address, amount)
          .send({ from: account })
          .on("receipt", async function (receipt) {
            setLoading(false);
            reg_user = await ICU_.methods
              .stakeCBC(amount, stakeMonths)
              .send({ from: account });
            if (reg_user.status) {
              alert("Stake CBC Success");
            } else {
              alert("Stake CBC Failed !!!!");
            }
          })
          .on("error", function (error, receipt) {
            // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
            setLoading(false);
          });
      } else {
        reg_user = await ICU_.methods
          .stakeCBC(amount, stakeMonths)
          .send({ from: account });
        console.log("****** native coin accepting condtion", reg_user);
        if (reg_user.status) {
          alert("Stake CBC Success");
        } else {
          alert("Stake CBC Failed !!!!");
        }
      }
    } catch (e) {
      alert("Error is catch");
    }
  };

  return (
    <div className="home-container">
      <div className="row">
        {/* token balance  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Registration Fee</h5>
              <h4 className="mb-0">
                {registration_Free ? registration_Free : 0} USDT
              </h4>
            </div>
          </div>
        </div>
        {/* metamask balance  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Last TopUP</h5>

              <h4 className="mb-0">{lastTopUp ? lastTopUp : 0} USDT</h4>
            </div>
          </div>
        </div>
        {/* reg fee  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Withdrawable ROI</h5>
              <h4 className="mb-0">
                {realWithdrawableRoi ? realWithdrawableRoi : 0} USDT
              </h4>
            </div>
          </div>
        </div>
        {/* token price  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Withdrawable Staking ROI</h5>
              <h4 className="mb-0">
                {realWithdrawableStakingRoi ? realWithdrawableStakingRoi : 0}{" "}
                USDT{" "}
              </h4>
            </div>
          </div>
        </div>
        {/* Stake Time of User  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body-stakes">
              <h5># Stake withdrawal/start time</h5>
              <h4 className="mb-0">{stakeTimes ? stakeTimes : 0}</h4>
            </div>
          </div>
        </div>
        {/* lastStake of User  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body-stakes">
              <h5># Last Stake</h5>
              <h4 className="mb-0">{lastStake ? lastStake : 0} USDT</h4>
            </div>
          </div>
        </div>
        {/* totalStake of User  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body-stakes">
              <h5>Staking Referral Bonus</h5>
              <h4 className="mb-0">{totalStake ? totalStake : 0} USDT</h4>
            </div>
          </div>
        </div>
        {/* currentStake of User  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body-stakes">
              <h5># Current Stake</h5>
              <h4 className="mb-0">{currentStake ? currentStake : 0} USDT</h4>
            </div>
          </div>
        </div>
        {/* rootStakeBalance of User  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body-stakes">
              <h5># Balance Stake ROI</h5>
              <h4 className="mb-0">
                {rootStakeBalance ? rootStakeBalance : 0} USDT
              </h4>
            </div>
          </div>
        </div>
        {/* takenStkngReward of User  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body-stakes">
              <h5># Staking Bonus</h5>
              <h4 className="mb-0">
                {takenStkngReward ? takenStkngReward : 0} USDT
              </h4>
            </div>
          </div>
        </div>
        {/* id  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Total Income Taken</h5>
              <h4 className="mb-0">
                {totalIncomeTaken ? totalIncomeTaken : 0} USDT
              </h4>
            </div>
          </div>
        </div>
        {/* Registration Start Time  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Registration Time </h5>
              <h4 className="mb-0">
                {registrationTime ? registrationTime : 0}
              </h4>
            </div>
          </div>
        </div>

        {/* Registration Start Time  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Stake Time </h5>
              <h4 className="mb-0">{stkTime ? stkTime : 0}</h4>
            </div>
          </div>
        </div>
        {/* Registration Start Time  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Stake Capping </h5>
              <h4 className="mb-0">{stkCapping ? stkCapping : 0}</h4>
            </div>
          </div>
        </div>
        {/* Stake  Month  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Stake Month </h5>
              <h4 className="mb-0">{stkMonths ? stkMonths : 0}</h4>
            </div>
          </div>
        </div>
        {/* reffer id  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Total Withdrawable</h5>
              <h4 className="mb-0">
                {totalWithdrawable ? totalWithdrawable : 0} USDT
              </h4>
            </div>
          </div>
        </div>
        {/* setUserExist user  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>User Exist</h5>
              <h4 className="mb-0">{userExist ? userExist : 0}</h4>
            </div>
          </div>
        </div>
        {/* userId user  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>User ID</h5>
              <h4 className="mb-0">{userId ? userId : 0}</h4>
            </div>
          </div>
        </div>
        {/* userReferrerId user  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Sponsor</h5>
              <h4 className="mb-0">{userReferrerId ? userReferrerId : 0}</h4>
            </div>
          </div>
        </div>
        {/* topupAmount user  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>User Topup Amount ID</h5>
              <h4 className="mb-0">{topupAmount ? topupAmount : 0} USDT</h4>
            </div>
          </div>
        </div>
        {/* referredUsers user  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Direct</h5>
              <h4 className="mb-0">{referredUsers ? referredUsers : 0}</h4>
            </div>
          </div>
        </div>
        {/* capping user  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>User capping</h5>
              <h4 className="mb-0">{capping ? capping : 0} USDT</h4>
            </div>
          </div>
        </div>
        {/* income user  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Working income</h5>
              <h4 className="mb-0">{income ? income : 0} USDT</h4>
            </div>
          </div>
        </div>
        {/* rootBalance user  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Balance User ROI</h5>
              <h4 className="mb-0">{rootBalance ? rootBalance : 0} USDT</h4>
            </div>
          </div>
        </div>
        {/* assuredReward user  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>User Assure 200% ROI </h5>
              <h4 className="mb-0">{assuredReward ? assuredReward : 0} USDT</h4>
            </div>
          </div>
        </div>
        {/* levelIncomeReceived user  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Team Size</h5>
              <h4 className="mb-0">
                {levelIncomeReceived ? levelIncomeReceived : 0}
              </h4>
            </div>
          </div>
        </div>
        {/* incomeTaken user  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Income Taken</h5>
              <h4 className="mb-0">{incomeTaken ? incomeTaken : 0} USDT</h4>
            </div>
          </div>
        </div>
        {/* takenROI user  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>ROI Taken</h5>
              <h4 className="mb-0">{takenROI ? takenROI : 0} USDT</h4>
            </div>
          </div>
        </div>

        {/* userStakeTimes user  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>ROI withdrawal/start time</h5>
              <h4 className="mb-0">{userStakeTimes ? userStakeTimes : 0}</h4>
            </div>
          </div>
        </div>
        {/* incomeMissed user  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Income Missed</h5>
              <h4 className="mb-0">{incomeMissed ? incomeMissed : 0}</h4>
            </div>
          </div>
        </div>

        {/* income  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Withdrawable Income</h5>
              <h4 className="mb-0">
                {withdrawableIncome ? withdrawableIncome : 0} USDT
              </h4>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Reward Win</h5>
              <h4 className="mb-0">{rewardWin ? rewardWin : 0} USDT</h4>
            </div>
          </div>
        </div>
        <div className="col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body text-center">
              Write Functionality Is Below
            </div>
          </div>
        </div>

        {/* incomeMissed user  */}

        {/* Registration function  */}
        <div className="col-sm-12 col-md-6 col-lg-6 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Registration</h5>
              <div className="row">
                <div className="col-sm-12 my-auto">
                  <form className="forms-sample" onSubmit={handleSubmit}>
                    <div className="form-group w-100">
                      <input
                        className="form-control mt-2"
                        type="number"
                        required
                        name="id"
                        onChange={handleChange}
                        value={referrerId || ""}
                        placeholder="Referral ID"
                      />
                      {/* Loader */}

                      {loading && (
                        <div className="loader-overlay">
                          {" "}
                          Transaction is Approving{" "}
                        </div>
                      )}
                      <input
                        className="btn mt-3 submitbtn_"
                        type="submit"
                        disabled={loading}
                        value="Registration"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* TopUP function  */}
        <div className="col-sm-12 col-md-6 col-lg-6 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Top Up</h5>
              <div className="row">
                <div className="col-sm-12 my-auto">
                  <form className="forms-sample" onSubmit={handleSubmitTopUP}>
                    <div className="form-group w-100">
                      <label htmlFor="topUpDropDown">
                        Select TopUp Amount from dropdown:
                      </label>

                      <select
                        id="topUp"
                        className="form-control"
                        onChange={handleChangeTopUp}
                        value={topUpAmounts}
                      >
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="400">400</option>
                      </select>
                      {loading && (
                        <div className="loader-overlay">
                          {" "}
                          Transaction is Approving{" "}
                        </div>
                      )}
                      <input
                        className="btn mt-3 submitbtn_"
                        type="submit"
                        value="Top Up"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Stake CBC function  */}
        <div className="col-sm-12 col-md-6 col-lg-6 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Stake CBC</h5>
              <div className="row">
                <div className="col-sm-12 my-auto">
                  <form className="forms-sample" onSubmit={handleSubmitStake}>
                    <div className="form-group w-100">
                      <input
                        className="form-control mt-2"
                        type="number"
                        required
                        name="stakeAmount"
                        onChange={handleChangeStakeAmount}
                        value={stakeAmount || ""}
                        placeholder="Amount Range 100-2400"
                      />

                      <label htmlFor="myDropdown">
                        Select Month from dropdown:
                      </label>

                      <select
                        id="stakeMonths"
                        className="form-control"
                        onChange={handleChangeDropdownStake}
                        value={stakeMonths}
                      >
                        <option value="24">24</option>
                        <option value="36">36</option>
                        <option value="48">48</option>
                        
                      </select>
                      {loading && (
                        <div className="loader-overlay">
                          {" "}
                          Transaction is Approving{" "}
                        </div>
                      )}
                      <input
                        className="btn mt-3 submitbtn_"
                        type="submit"
                        value="Stacked"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* WithDraw All Income  */}
        <div className="col-sm-12 col-md-6 col-lg-6 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>WithDraw All Income</h5>
              <div className="row">
                <div className="col-sm-12 my-auto">
                  <form
                    className="forms-sample"
                    onSubmit={handleSubmitStakingWithdraw}
                  >
                    <div className="form-group w-100">
                      <input
                        className="btn mt-3 submitbtn_"
                        type="submit"
                        value="Withdraw Income"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5>WithDraw Staking ROI</h5>
              <div className="row">
                <div className="col-sm-12 my-auto">
                  <form
                    className="forms-sample"
                    onSubmit={handleSubmitWithdraw}
                  >
                    <div className="form-group w-100">
                      <input
                        className="btn mt-3 submitbtn_"
                        type="submit"
                        value="Withdraw Staking ROI"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
