import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'; // Import the CSS file

function AddInvoiceForm() {
    const [InvoiceNumber, setInvoiceNumber] = useState('');
    const [InvoiceDate, setInvoiceDate] = useState('');
    const [DeliveryNote, setDeliveryNote] = useState('');
    const [VendorName, setVendorName] = useState('');
    const [PONumber, setPONumber] = useState('');
    const [VAT_GST_ID, setVAT_GST_ID] = useState('');
    const [TotalAmount, setTotalAmount] = useState('');
    const [CompanyName, setCompanyName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addData(InvoiceNumber, InvoiceDate, DeliveryNote, VendorName, PONumber, VAT_GST_ID, TotalAmount, CompanyName);
            // Clear form fields after successful submission
            setInvoiceNumber('');
            setInvoiceDate('');
            setDeliveryNote('');
            setVendorName('');
            setPONumber('');
            setVAT_GST_ID('');
            setTotalAmount('');
            setCompanyName('');
            // Fetch updated data after successful submission
            fetchData();
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    const addData = async (InvoiceNumber, InvoiceDate, DeliveryNote, VendorName, PONumber, VAT_GST_ID, TotalAmount, CompanyName) => {
        try {
            const newData = {
                InvoiceNumber: InvoiceNumber,
                InvoiceDate: InvoiceDate,
                DeliveryNote: DeliveryNote,
                VendorName: VendorName,
                PONumber: PONumber,
                VAT_GST_ID: VAT_GST_ID,
                TotalAmount: TotalAmount,
                CompanyName: CompanyName
            };

            await axios.post('http://localhost:5000/api/data', newData);
        } catch (error) {
            console.error('Error adding data:', error);
        }
    };

    const fetchData = async () => {
        // Implement fetching data from the server here
        console.log('Fetching data...');
    };

    return (
        <div className="form-container">
            <h2>Invoice Form</h2>
            <form className="form-table" onSubmit={handleSubmit}>
                <label>
                    Invoice Number:
                    <input type="text" value={InvoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
                </label>
                <label>
                    Invoice Date:
                    <input type="date" value={InvoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
                </label>
                <label>
                    Delivery Note:
                    <input type="text" value={DeliveryNote} onChange={(e) => setDeliveryNote(e.target.value)} />
                </label>
                <label>
                    Vendor Name:
                    <input type="text" value={VendorName} onChange={(e) => setVendorName(e.target.value)} />
                </label>
                <label>
                    PO Number:
                    <input type="text" value={PONumber} onChange={(e) => setPONumber(e.target.value)} />
                </label>
                <label>
                    VAT/GST ID:
                    <input type="text" value={VAT_GST_ID} onChange={(e) => setVAT_GST_ID(e.target.value)} />
                </label>
                <label>
                    Total Amount:
                    <input type="text" value={TotalAmount} onChange={(e) => setTotalAmount(e.target.value)} />
                </label>
                <label>
                    Company Name:
                    <input type="text" value={CompanyName} onChange={(e) => setCompanyName(e.target.value)} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddInvoiceForm;
