import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { PhoneBook } from './phoneBook/phoneBook';
import { Contacts } from './contacts/contacts';
import { Filter } from './filter/filter';

export const App = () => {
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

  const checkDublicate = name => {
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`);
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
    setContacts(prevState => prevState.filter(({ id }) => id !== contactId));
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
