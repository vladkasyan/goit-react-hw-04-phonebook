import {Component} from 'react';
import { nanoid } from 'nanoid';
import { Form, Label, Button, Input } from './phoneBook.module';

export class PhoneBook extends Component {
  state = {
    name: '',
    number: ''
  }

  nameId = nanoid();
  numberId = nanoid();

  reset = () => {
    this.setState({ number: '', name: '' });
  };

  SubmitForm = event => {
    event.preventDefault();
    
    this.props.onSubmit(this.state);
    // name: this.state.name, number: this.state.number 
    this.reset();
  };

  ChangeForm = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
    <Form onSubmit={this.SubmitForm}>
        <Label htmlFor={this.nameId}>
          Name
          <Input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            value={this.state.name}
            onChange={this.ChangeForm}
            required
          />
        </Label>

        <Label htmlFor={this.numberId}>
          Number
          <Input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            value={this.state.number}
            onChange={this.ChangeForm}
            required
          />
        </Label>

        <Button type="submit">Add contact </Button>
      </Form>
    )
  }
  
}