import React from 'react';
import { useNavigate } from 'react-router-dom';

const InvestmentFOMOBanner = ({ userId }) => {
  const navigate = useNavigate();

  const handleBannerClick = () => {
    if (userId) {
      navigate(`/invest/${userId}`);
    }
  };

  return (
    <div style={styles.container} onClick={handleBannerClick}>
      <h2 style={styles.title}>Consider $1000 a year from now</h2>
      <div style={styles.accountsContainer}>
        <div style={styles.accountBox}>
          <p>Savings account</p>
          <p style={styles.amount}>$1002</p>
        </div>
        <div style={styles.accountBox}>
          <p>Fixed Deposit account</p>
          <p style={styles.amount}>$1005</p>
        </div>
        <div style={styles.accountBox}>
          <p>DigiPortfolio</p>
          <p style={styles.amount}>$1008</p>
        </div>
      </div>
      <p style={styles.footer}>Don't lose out on the gains! Invest now!</p>
    </div>
  );
};

const styles = {
  container: {
    background: 'linear-gradient(to bottom, #FFDDC1, #FFC0CB)',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    maxWidth: '600px',
    margin: '20px auto',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  accountsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '20px',
  },
  accountBox: {
    backgroundColor: '#E0E0E0',
    padding: '15px',
    borderRadius: '8px',
    width: '30%',
  },
  amount: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  footer: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
};

export default InvestmentFOMOBanner;
