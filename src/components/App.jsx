import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { PhoneBook } from './phoneBook/phoneBook';
import { Contacts } from './contacts/contacts';
import { Filter } from './filter/filter';

export const App = () => {
  // state = {
  //   contacts: [
  //     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //   ],
  //   filter: ''
  // };
  const savedcontacts = JSON.parse(localStorage.getItem('contacts'));
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => savedcontacts ?? []);

  const addContactPhone = (name, number) => {
    checkDublicate(name);

    const generatedId = nanoid();

    const contact = {
      numberId: generatedId,
      name,
      number,
    };
    setContacts(prevState => [...prevState, contact]);
  };
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));

    console.log('contacts', contacts);
  }, [contacts]);

  const checkDublicate = (contact, name) => {
    if (
      contacts.some(
        ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      alert(`${contact.name} is already in contacts`);
      return;
    }
  };

  const filterChange = e => {
    setFilter(e.target.value);
  };

  const getVisibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const removeContact = contactId => {
    setContacts(contacts.filter(({ id }) => id !== contactId));
  };
  return (
    <div>
      <h1>Phonebook</h1>

      <PhoneBook onSubmit={addContactPhone} />

      <h2>Contacts</h2>
      {!!contacts.length ? (
        <Filter value={filter} ChangeFilter={filterChange} />
      ) : (
        <div>Your phonebook is empty. Add first contact!</div>
      )}
      {!!contacts.length && (
        <Contacts contacts={getVisibleContacts()} onRemove={removeContact} />
      )}
    </div>
  );
};
