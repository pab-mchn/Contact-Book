import React, { useState, useEffect } from "react";
import "./Contact.css";

const Contact = () => {
  const [contactList, setContactList] = useState([]);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const storedContacs = localStorage.getItem("contacts");
    if (storedContacs) {
      setContactList(JSON.parse(storedContacs));
    }
  }, []);

  //setItem
  //getItem
  const addContact = () => {
    if (name && phoneNumber) {
      const newContact = { name, phoneNumber };
      const updatedContact = [...contactList, newContact];
      setContactList(updatedContact);
      localStorage.setItem("contacts", JSON.stringify(updatedContact));
      setName("");
      setPhoneNumber("");
    }
  };

  const deleteContact = (index) => {
    const updatedContactList = contactList.filter((_, i) => i !== index);
    setContactList(updatedContactList);
    localStorage.setItem("contacts", JSON.stringify(updatedContactList));
  };

  return (
    <div className='agenda-container'>
      <h2>Contactos</h2>
      <div className='input-container'>
        <input type='text' placeholder='Nombre' value={name} onChange={(e) => setName(e.target.value)} />
        <input
          type='number'
          placeholder='Número de teléfono'
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button onClick={addContact}>Agregar contacto</button>
      </div>
      <ul className='contact-list'>
        {contactList.map((contact, index) => (
          <li key={index}>
            <strong>Nombre:</strong>
            {contact.name}, <strong>Telefono:</strong>
            {contact.phoneNumber}
            <button onClick={() => deleteContact(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contact;
