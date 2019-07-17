import React, {useState} from 'react';
import './App.css';

import FormikLoginForm from './Form'

function App() {

  const [signUpSuccess, toggleSignUpSuccess] = useState(false);
  return (
    <div className="App">
       <h1>Howdy</h1>
       <FormikLoginForm   signUpSuccess={signUpSuccess} toggleSignUpSuccess={toggleSignUpSuccess}/>
       {signUpSuccess && <h2> You've successfully signed up!</h2>}
    </div>
  );
}

export default App;
