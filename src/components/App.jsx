import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import {PhoneBook} from './phoneBook/phoneBook';
import {Contacts} from './contacts/contacts';
import {Filter} from './filter/filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: ''
  };

componentDidMount() {
  const savedcontacts = JSON.parse(localStorage.getItem('contacts'));

  if (savedcontacts) {
    this.setState({contacts : savedcontacts})
  }
}

componentDidUpdate(prevProps, prevState) {
  const currentContacts = this.state.contacts

  if (currentContacts !== prevState.contacts) {
    localStorage.setItem('contacts', JSON.stringify(currentContacts));
  }
}




 checkDublicate = (contact) => {
    if (this.state.contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    )) {
      alert(`${contact.name} is already in contacts`);
      return;
    } 
  }
  
 
  addContact = contact => {
    
    this.checkDublicate(contact)

    this.setState(prevState => ({
      contacts: [{ id: nanoid(), ...contact }, ...prevState.contacts],
    }));
  };

  filterChange = e => {
    this.setState({ filter: e.target.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  removeContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  render() {
    const visibleContacts = this.getVisibleContacts();
    const { filter } = this.state;

    return (
      <div>
        <h1>Phonebook</h1>

        <PhoneBook onSubmit={this.addContact} />

        <h2>Contacts</h2>
        {this.state.contacts.length > 0 ? (<Filter value={filter} ChangeFilter={this.filterChange} />) : (
          <div>Your phonebook is empty. Add first contact!</div>
        )}
        {this.state.contacts.length > 0 && (
          <Contacts
            contacts={visibleContacts}
            onRemove={this.removeContact}
          />
        )}
      </div>
    )
  }
}