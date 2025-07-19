import React, { useState, useEffect, useRef } from 'react';
import { setLocalStorage,getLocalStorage } from '../../Utils/Utils';
import SnackBar from '../Common/SnackBar/SnackBar';
import Form from '../Common/Form/Form';  
import CommonTable from '../Common/Table/CommonTable';
import './Beneficiary.css';

const Beneficiary = () => {
  const [userBeneficiary, setUserBeneficiary] = useState([]);  
  const [filteredBeneficiary, setFilteredBeneficiary] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);
  const formRef = useRef(null);  
  const columns = [
    { key: 'Beneficiary', label: "Beneficiary Name" },
    { key: 'AccountBeneficiary', label: 'Account Number' },
    { key: 'BranchBeneficiary', label: 'Branch Name' },
  ];
  const [snackbarInfo, setSnackbarInfo] = useState({
    open: false,
    message: '',
    severity: 'error',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataString = await getLocalStorage('userData');
        if (userDataString) {
          try {
            let storedBeneficiaryData = await getLocalStorage('BeneficiaryData');
  
            if (!storedBeneficiaryData) {
              storedBeneficiaryData = [];
            }
  
            const userSpecificBeneficiary = storedBeneficiaryData.filter(
              (data) => data.User === userDataString.Username
            );
  
            setUserBeneficiary(userSpecificBeneficiary);
          } catch (parseError) {
            console.error('Error parsing user data:', parseError);
          }
        }
      } catch (error) {
        console.error('Error fetching user data from local storage:', error);
      }
    };
  
    fetchData();
  }, []);
  

  useEffect(() => {
    setFilteredBeneficiary(userBeneficiary);
  }, [userBeneficiary]);

  const isValidAccountNumber = (accNumber) => /^\d+$/.test(accNumber);
  const containsDigit = (text) => /\d/.test(text);

  const handleAddBeneficiary = async (formData) => {
    const { AccountBeneficiary, Beneficiary, BranchBeneficiary } = formData;
  
    if (containsDigit(Beneficiary) || 
        containsDigit(BranchBeneficiary) ||
        !isValidAccountNumber(AccountBeneficiary)) {
      setSnackbarInfo({
        open: true,
        message: 'Please fill in all the required fields',
      });
      return;
    }
  
    try {
      const userDataString = await getLocalStorage('userData');
      if (userDataString) {
        try {
          let storedBeneficiaryData = await getLocalStorage('BeneficiaryData');
  
          if (!storedBeneficiaryData) {
            storedBeneficiaryData = [];
          }
  
          const newBeneficiaryWithUserDetails = {
            User: userDataString.Username,
            AccountUser: userDataString.AccountNumber,
            Beneficiary,
            AccountBeneficiary,
            BranchBeneficiary,
          };
  
          storedBeneficiaryData.push(newBeneficiaryWithUserDetails);
  
          await setLocalStorage('BeneficiaryData', storedBeneficiaryData);
  
          setUserBeneficiary((prevBeneficiaries) => {
            return [...prevBeneficiaries, newBeneficiaryWithUserDetails];
          });
  
          setSnackbarInfo({
            open: true,
            message: 'Beneficiary added successfully!',
            severity: 'success',
          });
        } catch (parseError) {
          console.error('Error parsing user data:', parseError);
        }
      }
    } catch (error) {
      console.error('Error storing beneficiary data:', error);
    }
  
    if (formRef.current) {
      formRef.current.reset();
    }
  };
  

  const handleSnackbarClose = () => {
    setSnackbarInfo({ ...snackbarInfo, open: false });
  };

  const handleSearch = (value) => {
    setSearchText(value);

    const filtered = userBeneficiary.filter((beneficiary) => {
      const values = Object.values(beneficiary).join(" ").toLowerCase();
      return values.includes(value.toLowerCase());
    });
    setFilteredBeneficiary(filtered);
    setPage(0);
  };

  return (
    <section className="beneficiary">
      <h3>Beneficiary Details</h3>
      {userBeneficiary.length > 0 ? (
        <div className="common-table">
          <CommonTable
            columns={columns}
            data={filteredBeneficiary}
            searchText={searchText}
            page={page}
            handleSearch={handleSearch}
          />
        </div>
      ) : (
        <p className="empty-table">No existing beneficiary. Add a beneficiary from the form below.</p>
      )}
      <div className="add-beneficiary">
        <h3>Add new beneficiary</h3>
        <div className="form-container">
          <Form
            formFields={[
              { name: 'Beneficiary', placeholder: "Beneficiary Name" },
              { name: 'AccountBeneficiary', placeholder: 'Account Number' },
              { name: 'BranchBeneficiary', placeholder: 'Branch Name' },
            ]}
            onSubmit={handleAddBeneficiary}
            buttonLabel="Add Beneficiary"
            ref={formRef}
          />
        </div>
      </div>

      <SnackBar {...snackbarInfo} handleClose={handleSnackbarClose} />
    </section>
  );
};

export default Beneficiary;
