import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from "../../config/firebase";
const initialstate = {
  email: "",
  password: "",

}
export default function SignUp() {

  const [state, setState] = useState(initialstate)
  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    const {email,password} = state;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        console.log(user);
        alert("You are Register successfully")
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        console.error(error);
        // ..
      });

  }


  return (
    <div className="mt-4">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 offset-md-3">
            <div className="card p-3">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col">
                    <input type="text" placeholder="First Name" className="form-control mb-2" onChange={handleChange} />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <input type="text" placeholder="Last Name" className="form-control mb-2" onChange={handleChange} />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <input type="email" placeholder="Email" name="email" className="form-control mb-2" onChange={handleChange} />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <input type="password" placeholder="password" name="password" className="form-control mb-2" onChange={handleChange} />
                  </div>
                </div>
                <div className="row">
                  <div className="col text-center">
                    <button className="btn btn-info my-2 w-50">Register</button>
                  </div>
                </div>
              </form>
              <div className="row">
                <div className="col">
                  <Link to='/signin' className="text-primary">If already our member</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
