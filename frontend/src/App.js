import { useState } from 'react'
import axios from 'axios';
import validator from 'validator'
import './App.css';

function App() {
  const [posts, setPosts] = useState(null)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailValid, setEmailValid] = useState(true);

  const hangleClick = (e) => {
    e.preventDefault();
    const isEmailValid = validator.isEmail(email);
    setEmailValid(isEmailValid);
    if (firstName && lastName && email && phoneNumber && isEmailValid) {
      axios
        .post('/post', {
          first_name: firstName,
          last_name: lastName,
          email_address: email,
          phone_number: phoneNumber,
          id_address: "1.1.1.1",
          crm_id: "crm_ll_2",
          offer_id: "173"
        })
        .then(response => {
          setPosts(response.data);
          console.log(response.data)
        })
        .catch(err => console.log(err))
      setFirstName('');
      setLastName('');
      setPhoneNumber('');
      setEmail('')
    }
  }

  const color = (val) => {
    if(parseInt(val) % 2 === 0) {
      return {
        color: 'orange'
      }
    } else {
      return {
        color: 'purple'
      }
    }
  }

  return (
    <div className="app">
      <div className='app-img'></div>
      <form>
        <fieldset>
          <legend>Wave BI</legend>
          {posts ? 
          <div className='show-id'>
            <div>Hi <b>{posts.first_name}</b>, your ID is <span style={color(posts.id)}><b>{posts.id}</b></span></div>
          </div> :
            <>
              <div className='account'>Create your account</div>
              <div className='form-main-content'>
                <label> First Name:</label>
                <input type='text' value={firstName} onChange={e => setFirstName(e.target.value.trim())} placeholder='Please put in your first name.' />

                <label> Last Name: </label>
                <input type='text' value={lastName} onChange={e => setLastName(e.target.value.trim())} placeholder='Please put in your last name.' />
                <label> Email:</label>
                <div className='email'>
                  <input type='email'
                    value={email} onChange={e => {
                      setEmail(e.target.value.trim())
                      if (!emailValid) setEmailValid(true);
                    }} placeholder='Please put in your email address.' />
                  <div className='email-indicate'>{emailValid ? '' : 'Email is invalid'}</div>
                </div>
                <label> Phone Number: </label>
                <input type='tel' value={phoneNumber} onChange={e => setPhoneNumber(e.target.value.trim())} placeholder='Please put in your phone number.' />
                <input type='submit' value='Sumbit' onClick={hangleClick} />
              </div>
            </>
          }
        </fieldset>
      </form>
    </div>
  );
}

export default App;
