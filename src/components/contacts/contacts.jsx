import React from 'react';
import PropTypes from 'prop-types';
import { List, Listitem, Listbutton } from './contacts.module';

export const Contacts = ({ contacts, onRemove }) => (
    <List>
      {contacts.map(contact => (
        <Listitem key={contact.id} >
          {contact.name + ' : ' + contact.number}
          {<Listbutton type="button" name="delete" onClick={() => onRemove(contact.id)}>
              delete
            </Listbutton>}
        </Listitem>
      ))}
    </List>
  );
  
  Contacts.propTypes = {
    contacts: PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired,
  };
  