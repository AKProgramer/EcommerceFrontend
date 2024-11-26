const currencyFormatter = new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 2, // Usually PKR has two decimal places
    maximumFractionDigits: 2
  });
  export default currencyFormatter;