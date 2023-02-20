import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { ContactForm } from './ContactForm/ContactForm';
import css from './App.module.css';
import Notiflix from 'notiflix';
import { useState, useEffect } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  /* componentDidUpdate(_, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  } */

  const addNewContact = newContact => {
    if (contacts.some(contact => contact.name === newContact.name)) {
      Notiflix.Notify.failure(`${newContact.name} is already in the contacts`);
      return;
    }
    setContacts(prevState => [...prevState, newContact]);
  };

  const handleClick = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const handleFilter = event => {
    const value = event.target.value.toLowerCase();
    if (!contacts.some(({ name }) => name.toLowerCase().includes(value))) {
      Notiflix.Notify.failure(`${event.target.value} is not in the contacts`);
    }
    setFilter(value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().trim().includes(filter.toLowerCase())
  );

  return (
    <div>
      <div action="" className={css.phonebook}>
        <h1 className={css.phonebookTitle}>Phonebook</h1>
        <ContactForm addContact={addNewContact} />
        <h1 className={css.contactTitle}>Contacts</h1>
        <Filter filterContacts={handleFilter} value={filter} />
        <ContactList contacts={filteredContacts} deleteContact={handleClick} />
      </div>
    </div>
  );
};
