import React from "react";
import "./Contact.css";

const Contact = () => (
  <section className="contact">
    <h3>Contact Us</h3>
    <div className="contact-info">
      <div className="contact-details">
        {contactInfo("Address", ["1234 Main Street Block-C", "Delhi-110092", "India"])}
        {contactInfo("Email", ["info@annabank.com"])}
        {contactInfo("Phone", ["+91 23456 78901", "+91 88459 25744"])}
      </div>
      {additionalInfo()}
    </div>
  </section>
);

const contactInfo = (title, details) => (
  <div>
    <h4>{title}</h4>
    {details.map((detail, index) => (
      <p key={index}>{detail}</p>
    ))}
  </div>
);

const additionalInfo = () => (
  <div className="additional-info">
    <h4>Additional Information</h4>
    <p>
      For customer support, inquiries, or feedback, please don't hesitate to reach out through any of the above contact details.
    </p>
    <p>
      Our customer service team is available during business hours to assist you with any queries or concerns.
    </p>
  </div>
);

export default Contact;
