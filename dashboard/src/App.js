
import './App.css';
import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useFormik } from 'formik';
import axios from 'axios'

const Formik = () => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      password: "",
      email: ""
    },
    onSubmit: async values => {
      alert(JSON.stringify(values, null, 2));
      
      await axios.post('http://localhost:8080/auth/login',{
            email: values.email,
            password: values.password,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost/8080/auth/login'
            }
        }).then(res=>{
          const token = res.data.data.token
          sessionStorage.setItem('auth-token', token)
        })
    },
  });
  return (
      <div>
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Email Address</label>
            <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
            />
             <label htmlFor="password">password</label>
            <input
                id="password"
                name="password"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.password}
            />

            <button type="submit">Submit</button>
        </form>

      </div>
  );
};

function App() {
  return (
    <div className="App">
      <Router basename='/'>
        <Routes>
          <Route exact path='/' element={<Formik/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
