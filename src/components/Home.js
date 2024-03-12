import React from 'react';
import invoiceImage from '../Images/invoice.png'; // Import the image


function Home() {
  return (
    <div className="home-container bg-light">
      <h2>Welcome to Vendor Invoice Management</h2>
      
      
      

      <div>
      <img src={invoiceImage} alt="Invoice" style={{ width: '70%', height: '80' }} /> {/* Use the imported image with style */}
        <p>
        Vendor Invoice Management is a system designed to streamline the process of managing invoices from vendors. 
        It allows businesses to efficiently track, process, and organize invoices, thereby improving accuracy, reducing errors, 
        and saving time. With Vendor Invoice Management, businesses can easily handle tasks such as invoice creation, 
        approval workflows, payment processing, and reporting.
      </p>
      </div>
    </div>
  );
}

export default Home;
