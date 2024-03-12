import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './InvoiceList.css';
import FilterButton from './FilterButton'; // Import the FilterButton component

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [filterCompany, setFilterCompany] = useState(""); // State to store the selected company for filtering

  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then(response => response.json())
      .then(data => setInvoices(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleUpdate = (InvoiceNumber) => {
    setSelectedInvoice(prevState => {
      if (prevState && prevState.InvoiceNumber === InvoiceNumber) {
        return null;
      } else {
        const invoiceToUpdate = invoices.find(invoice => invoice.InvoiceNumber === InvoiceNumber);
        if (invoiceToUpdate) {
          return { ...invoiceToUpdate };
        }
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedInvoice(prevState => ({
      ...prevState,
      [name]: name === 'InvoiceDate' ? new Date(value).toISOString().split('T')[0] : value
    }));
  };
  
  const handleDelete = (InvoiceNumber) => {
    fetch(`http://localhost:5000/api/data/${InvoiceNumber}`, {
      method: 'DELETE'
    })
    .then(response => response.text())
    .then(message => {
      console.log(message);
      fetch('http://localhost:5000/api/data')
        .then(response => response.json())
        .then(data => setInvoices(data))
        .catch(error => console.error('Error fetching data:', error));
    })
    .catch(error => console.error('Error deleting invoice:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/data/${selectedInvoice.InvoiceNumber}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selectedInvoice)
    })
    .then(response => response.text())
    .then(message => {
      console.log(message);
      fetch('http://localhost:5000/api/data')
        .then(response => response.json())
        .then(data => setInvoices(data))
        .catch(error => console.error('Error fetching data:', error));
      setSelectedInvoice(null);
    })
    .catch(error => console.error('Error updating invoice:', error));
  };

  // Function to handle filtering
  const handleFilter = (companyName) => {
    setFilterCompany(companyName); // Update the filterCompany state
    fetch(`http://localhost:5000/api/data/filter?companyName=${companyName}`)
      .then(response => response.json())
      .then(data => setInvoices(data))
      .catch(error => console.error('Error filtering data:', error));
  };

  // Apply filtering when filterCompany changes
  useEffect(() => {
    if (filterCompany) {
      handleFilter(filterCompany);
    }
  }, [filterCompany]);

  return (
    <div className="container">
      <h2 className="mt-4 mb-4">Invoice List</h2>
      {/* Filter button */}
      <div className="mb-3">
        <FilterButton onFilter={handleFilter} />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Invoice Date</th>
            <th>Delivery Note</th>
            <th>Vendor Name</th>
            <th>PO Number</th>
            <th>VAT/GST ID</th>
            <th>Total Amount</th>
            <th>Company Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(invoice => (
            <tr key={invoice.InvoiceNumber}>
              <td>{invoice.InvoiceNumber}</td>
              <td className="invoice-data">{selectedInvoice && selectedInvoice.InvoiceNumber === invoice.InvoiceNumber ? <input type="date" name="InvoiceDate" value={selectedInvoice.InvoiceDate} onChange={handleInputChange} className="form-control" /> : formatDate(invoice.InvoiceDate)}</td>
              <td className="invoice-data">{selectedInvoice && selectedInvoice.InvoiceNumber === invoice.InvoiceNumber ? <input type="text" name="DeliveryNote" value={selectedInvoice.DeliveryNote} onChange={handleInputChange} className="form-control" /> : invoice.DeliveryNote}</td>
              <td className="invoice-data">{selectedInvoice && selectedInvoice.InvoiceNumber === invoice.InvoiceNumber ? <input type="text" name="VendorName" value={selectedInvoice.VendorName} onChange={handleInputChange} className="form-control" /> : invoice.VendorName}</td>
              <td className="invoice-data">{selectedInvoice && selectedInvoice.InvoiceNumber === invoice.InvoiceNumber ? <input type="text" name="PONumber" value={selectedInvoice.PONumber} onChange={handleInputChange} className="form-control" /> : invoice.PONumber}</td>
              <td className="invoice-data">{selectedInvoice && selectedInvoice.InvoiceNumber === invoice.InvoiceNumber ? <input type="text" name="VAT_GST_ID" value={selectedInvoice.VAT_GST_ID} onChange={handleInputChange} className="form-control" /> : invoice.VAT_GST_ID}</td>
              <td className="invoice-data">{selectedInvoice && selectedInvoice.InvoiceNumber === invoice.InvoiceNumber ? <input type="text" name="TotalAmount" value={selectedInvoice.TotalAmount} onChange={handleInputChange} className="form-control" /> : invoice.TotalAmount}</td>
              <td className="invoice-data">{selectedInvoice && selectedInvoice.InvoiceNumber === invoice.InvoiceNumber ? <input type="text" name="CompanyName" value={selectedInvoice.CompanyName} onChange={handleInputChange} className="form-control" /> : invoice.CompanyName}</td>
              <td className="invoice-actions">
                {selectedInvoice && selectedInvoice.InvoiceNumber === invoice.InvoiceNumber ? (
                  <div className="action-buttons">
                    <button className="btn btn-primary" onClick={handleSubmit}>Update</button>
                    <button className="btn btn-secondary" onClick={() => handleUpdate(invoice.InvoiceNumber)}>Cancel</button>
                  </div>
                ) : (
                  <div className="action-buttons">
                    <button className="btn btn-primary" onClick={() => handleUpdate(invoice.InvoiceNumber)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(invoice.InvoiceNumber)}>Delete</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceList;
