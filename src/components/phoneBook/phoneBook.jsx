import { useState } from 'react';
import { nanoid } from 'nanoid';

import { Form, Label, Button, Input } from './phoneBook.module';

export const PhoneBook = ({ onSubmit }) => {
  const [number, setNumber] = useState();
  const [name, setName] = useState();

  const reset = () => {
    setName('');
    setNumber('');
  };

  const SubmitForm = event => {
    event.preventDefault();

    onSubmit(name, number);
    setName('');
    setNumber('');
    reset();
  };

  const ChangeForm = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };
  const nameId = nanoid();
  const numberId = nanoid();

  return (
    <Form onSubmit={SubmitForm}>
      <Label htmlFor={nameId}>
        Name
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={name}
          onChange={ChangeForm}
          required
        />
      </Label>

      <Label htmlFor={numberId}>
        Number
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={number}
          onChange={ChangeForm}
          required
        />
      </Label>

      <Button type="submit">Add contact </Button>
    </Form>
  );
};
