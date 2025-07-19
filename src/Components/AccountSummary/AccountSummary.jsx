import React, { useState } from "react";
import './AccountSummary.css';
import AccountInfo from "./AccountInfo";
import QuickTransfer from "../QuickTransfer/QuickTransfer";

const AccountSummary = () => {
    const [balance, setBalance] = useState(null);

    const newBalance = (newBalance) => {
        setBalance(newBalance);
    };

    return (
        <section className="summary">
            <AccountInfo balance={balance} newBalance={newBalance} />
            <br /> <br />
            <QuickTransfer balance={balance} newBalance={newBalance} />
        </section>
    );
}

export default AccountSummary;
