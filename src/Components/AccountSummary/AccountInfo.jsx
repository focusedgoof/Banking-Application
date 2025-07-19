// accountinfo.jsx
import React, { useEffect, useState } from "react";
import { getLocalStorage } from '../../Utils/Utils.jsx';
import './AccountInfo.css';

const AccountInfo = ({ balance }) => {
    const [loggedUserName, setLoggedUserName] = useState('');
    const [userData, setUserData] = useState(null);
    const cardDetails = [
        { key: 'showAccountNo', label: 'Account Number', value: userData?.AccountNumber },
        { key: 'showIFSC', label: 'IFSC Code', value: userData?.IFSCCode },
        { key: 'showBranch', label: 'Branch Details', value: userData?.Branch },
        { key: 'showBalance', label: 'Available Balance', value: `Rs. ${balance || userData?.Balance}` },
        { key: 'showPAN', label: 'PAN Details', value: userData?.PAN },
    ];
    const [cardStates, setCardStates] = useState({
        showAccountNo: false,
        showIFSC: false,
        showBranch: false,
        showBalance: false,
        showPAN: false,
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDataFromSession = await getLocalStorage('userData');
                if (userDataFromSession) {
                    setUserData(userDataFromSession);
                    setLoggedUserName(userDataFromSession.Username);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchData();
    }, []);

    const toggleCard = (cardKey) => {
        setCardStates(prevState => ({
            ...prevState,
            [cardKey]: !prevState[cardKey]
        }));
    };

    

    return (
        <div className="accountInfo">
            <h3>Welcome, {loggedUserName || 'User'}. Here are your account details</h3>
            <div className="info-cards">
                {cardDetails.map(card => (
                    <div className="card" key={card.key}>
                        <p>{card.label}</p>
                        {!cardStates[card.key] ? (
                            <button onClick={() => toggleCard(card.key)}>Click to view</button>
                        ) : (
                            <p className="view-detail">{card.value}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AccountInfo;
