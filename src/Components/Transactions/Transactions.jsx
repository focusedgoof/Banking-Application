import React, { useState, useEffect } from "react";
import { getLocalStorage } from "../../Utils/Utils";
import CommonTable from "../Common/Table/CommonTable";
import "./Transactions.css";

const Transactions = () => {
  const [userTransactions, setUserTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [userAccountNumber, setUserAccountNumber] = useState("");
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loggedInUserData = await getLocalStorage("userData");
        if (loggedInUserData && loggedInUserData["AccountNumber"]) {
          const accountNumber = loggedInUserData["AccountNumber"];
          setUserAccountNumber(accountNumber);

          const storedTransactions =
            (await getLocalStorage("transactions")) || [];

          const userSpecificTransactions = storedTransactions
            .filter((transaction) => transaction.userAccountNumber === accountNumber)
            .map((transaction) => {
              return {
                "Account Number": transaction.beneficiaryAccountNumber.toString(),
                Date: transaction.date.toString(),
                Narration: transaction.narration.toString(),
                Debit: (transaction.debit !== 0 ? `Rs. ${transaction.debit.toString()}` : transaction.debit).toString(),
                Credit: (transaction.credit !== 0 ? `Rs. ${transaction.credit.toString()}` : transaction.credit).toString(),
                Balance: `Rs. ${transaction.balance.toString()}`,
              };
            });

          setUserTransactions(userSpecificTransactions);
          setFilteredTransactions(userSpecificTransactions);
        }
      } 
      catch (error) {
        console.error("Error fetching user data from local storage:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
    setPage(0);

    const filtered = userTransactions.filter((transaction) => {
      const values = Object.values(transaction).join(" ").toLowerCase();
      return values.includes(value.toLowerCase());
    });

    setFilteredTransactions(filtered);
  };

  const columnHeaders = [
    { key: "Account Number", label: "Account number" },
    { key: "Date", label: "Date" },
    { key: "Narration", label: "Narration" },
    { key: "Debit", label: "Debit" },
    { key: "Credit", label: "Credit" },
    { key: "Balance", label: "Balance" },
  ];

  return (
    <section className="transactions">
      <h3>Transactions for Account Number: {userAccountNumber}</h3>      
      {userTransactions.length > 0 ? (
        <div className="common-table">
          <CommonTable
            columns={columnHeaders}
            data={filteredTransactions}
            searchText={searchText}
            handleSearch={handleSearch}
            page={page}
          />
        </div>
      ) : (
        <p className="empty-table">No existing Transaction.</p>
      )}
    </section>
  );
};

export default Transactions;
