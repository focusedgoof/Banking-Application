import React, { useEffect, useState, useContext, useRef  } from "react";
import { TransactionContext } from "../Transactions/TransactionProvider";
import {getLocalStorage, setLocalStorage} from "../../Utils/Utils";
import SnackBar from "../Common/SnackBar/SnackBar";
import './QuickTransfer.css';

const QuickTransfer =  ({ balance}) => {
  const [userName, setUserName] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [selectedUser, setSelectedUser] = useState('');
  const [userBeneficiaries, setUserBeneficiaries] = useState([]);
  const [amountTransferred, setAmountTransferred] = useState(''); 
  const [selectedBeneficiaryDetails, setSelectedBeneficiaryDetails] = useState(null);
  const { addTransaction } = useContext(TransactionContext);
  const inputRefs = useRef([]);
  const [snackbarInfo, setSnackbarInfo] = useState({
    open: false,
    message: '',
    severity: 'error'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataFromSession = await getLocalStorage("userData");
        if (userDataFromSession) {
          setUserDetails(userDataFromSession);
          setUserName(userDataFromSession.Username);
        }
      } 
      catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    const fetchBeneficiaryData = async () => {
      try {
        const loggedInUser = await getLocalStorage("BeneficiaryData");
        if (loggedInUser) {
          const beneficiaryArray = Array.isArray(loggedInUser) ? loggedInUser : [];
          const loggedInUserBeneficiaries = beneficiaryArray
            .filter((data) => data.User === userName)
            .map((data) => data.Beneficiary);
          setUserBeneficiaries(loggedInUserBeneficiaries);
        }
      } catch (error) {
        console.error("Error fetching beneficiary data:", error);
      }
    };

    const fetchDataAndBeneficiaries = async () => {
      await fetchData();
      await fetchBeneficiaryData();
    };

    fetchDataAndBeneficiaries();
  }, [userName]);

  const handleUserChange = async (e) => {
    try {
      const selectedValue = e.target.value;
      setSelectedUser(selectedValue);

      const storedBeneficiaryData = await getLocalStorage("BeneficiaryData");
      const beneficiaryArray = Array.isArray(storedBeneficiaryData) ? storedBeneficiaryData : [];

      const beneficiaryDetail = beneficiaryArray.find(
        (beneficiary) => beneficiary.Beneficiary === selectedValue
      );

      if (beneficiaryDetail) {
        setSelectedBeneficiaryDetails(beneficiaryDetail);
        const accountNumberInput = amountTransferred;

        if (accountNumberInput) {
          if (e.target.name === "Amount") {
            setAmountTransferred(beneficiaryDetail.AccountBeneficiary);
          }
        } 
        else {
          console.error("Account Number input not found.");
        }
      } 
      else {
        setSelectedBeneficiaryDetails(null);
      }
    } 
    catch (error) {
      console.error("Error handling user change:", error);
    }
  };

  const updateBalance = async (cleanedAmount) => {
    try {
      const existingTransactions = (await getLocalStorage("transactions")) || [];
      let currentUserBalance;
      let beneficiaryBalance;
  
      let storedBeneficiaryData = await getLocalStorage("BeneficiaryData");
      storedBeneficiaryData = Array.isArray(storedBeneficiaryData) ? storedBeneficiaryData : [];
      currentUserBalance = userDetails.Balance - cleanedAmount;
      userDetails.Balance = currentUserBalance;
      await setLocalStorage("userData", userDetails);
  
      if (balance !== null) {
        const newBalance = currentUserBalance;
        newBalance(newBalance);
      }
  
      // Update beneficiary balance if the beneficiary is found
      if (selectedBeneficiaryDetails) {
        beneficiaryBalance = selectedBeneficiaryDetails.Balance + amountTransferred;
        selectedBeneficiaryDetails.Balance = beneficiaryBalance;
  
        const updatedBeneficiaryData = storedBeneficiaryData.map((beneficiary) => {
          if (
            beneficiary.User === userName &&
            beneficiary.Beneficiary === selectedBeneficiaryDetails.Beneficiary
          ) {
            return selectedBeneficiaryDetails;
          }
          return beneficiary;
        });
  
        await setLocalStorage("BeneficiaryData", updatedBeneficiaryData);
      }
  
      // Calculate user balance based on existing transactions
      const userTransactions = existingTransactions.filter(
        (transaction) => transaction.userAccountNumber === userDetails.AccountNumber
      );
  
      if (userTransactions.length > 0) {
        currentUserBalance = userTransactions.reduce(
          (balance, transaction) => balance - transaction.debit,
          userDetails.Balance
        );
      }
  
      const currentDate = new Date().toLocaleDateString();
      const userTransaction = {
        userAccountNumber: userDetails.AccountNumber,
        beneficiaryAccountNumber: selectedBeneficiaryDetails?.AccountBeneficiary,
        date: currentDate,
        narration: "debited",
        debit: parseInt(amountTransferred),
        credit: 0,
        balance: currentUserBalance,
      };
  
      const beneficiaryTransaction = {
        userAccountNumber: selectedBeneficiaryDetails?.AccountBeneficiary,
        beneficiaryAccountNumber: userDetails.AccountNumber,
        date: currentDate,
        narration: "credited",
        debit: 0,
        credit: parseInt(amountTransferred),
        balance: beneficiaryBalance,
      };
  
      const updatedTransactions = [...existingTransactions, userTransaction, beneficiaryTransaction];
      await setLocalStorage("transactions", updatedTransactions);
  
      addTransaction(userTransaction);
      addTransaction(beneficiaryTransaction);
  
      setSnackbarInfo({
        open: true,
        message: `Transaction of Rs ${cleanedAmount} successfully added!`,
        severity: "success",
      });
    } catch (error) {
      console.error("Error updating balance:", error);
    }
  };
  

  const handleAddTransaction = async (cleanedAmount) => {
    if (cleanedAmount <= 0 || !cleanedAmount || !selectedUser) {
      setSnackbarInfo({
        open: true,
        message: "Please fill in all the required fields",
      });
      return;
    }

    if (cleanedAmount > userDetails?.Balance) {
      setSnackbarInfo({
        open: true,
        message: "Insufficient balance for this transaction",
      });
      return;
    }

    await updateBalance(cleanedAmount);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const cleanedAmount = parseInt(amountTransferred, 10);
    if (isNaN(cleanedAmount)) {
      setSnackbarInfo({
        open: true,
        message: "Please enter a valid amount",
      });
      return;
    }
    setAmountTransferred(cleanedAmount);
    await handleAddTransaction(cleanedAmount);
    setSelectedUser("");
    setSelectedBeneficiaryDetails(null);

    inputRefs.current.forEach((ref) => {
      ref.querySelector("input").value = "";
    });

    setAmountTransferred('');
  };

  const handleSnackbarClose = () => {
    setSnackbarInfo({ ...snackbarInfo, open: false });
  };

  return (
    <div className="transfer">
      {userBeneficiaries.length > 0 ? (
        <div className="quick-transfer">
          <h3>Quick Transfer</h3>
          <form onSubmit={handleFormSubmit}>
            <div className="form-fields">
              <div className="form-inputs" ref={(el) => (inputRefs.current[0] = el)}>
                <label>
                  <input
                    type="text"
                    name="Amount"
                    placeholder="Amount"
                    value={amountTransferred}
                    onChange={(e) => setAmountTransferred(e.target.value)}
                  />
                </label>
              </div>
              <p>To</p>
              <select
                className="dropdown"
                onChange={handleUserChange}
                value={selectedUser}
                name="Beneficiaries"
                placeholder="Beneficiaries"
              >
                <option value="" disabled>
                  Select Beneficiary
                </option>
                {userBeneficiaries.map((beneficiary, index) => (
                  <option key={index} value={beneficiary}>
                    {beneficiary}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit">Transfer</button>
          </form>

          <SnackBar {...snackbarInfo} handleClose={handleSnackbarClose} />
          <br />
        </div>
      ) : (
        <p> </p>
      )}
    </div>
  );
};

export default QuickTransfer;





