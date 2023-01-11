import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doc, setDoc, serverTimestamp, Firestore } from "firebase/firestore/lite";
import { collection, addDoc } from "firebase/firestore/lite";
import {firestore} from "../../config/firebase"
const initialstate = {
  title: "",
  location: "",
  description: "",
}


export default function Home() {
  
  const [state, setState] = useState(initialstate)
  
  const getRandomId =()=>{return Math.random().toString(36).slice(2)};
  console.log(getRandomId());
  
  
  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const handleSubmit = e => {
    e.preventDefault();
    let { title, location, description } = state;
    title = title.trim();
    location = location.trim();
    description = description.trim();
    if(title.length < 3){
      return toast.error("Title length should be at least 3 characters");
    }
    if(location.length < 3){
      return toast.error("Location length should be at least 3 characters");
    }
    if(description.length < 10){
      return toast.error("Description length should be at least 10 characters");
    }
    let formData = {title,location,description};
    formData.dateCreated=serverTimestamp();
    formData.id=getRandomId();
    createDocument(formData);

    console.log(state);
  }

  const createDocument = async(formData) =>{
    console.log(formData);
    try{
      // const docRef = await addDoc(collection(firestore, "todos"), formData);
      await setDoc(doc(firestore, "todos",formData.id), formData);
      toast.error("Todo is addedd successfully")
    }catch(err){
      console.error(err);
      toast.error("Something went wrong Todo is not added")
    }
  }

  return (
    <div className="py-5">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card p-3 p-md-4 p-lg-5">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col">
                    <h4 className='text-center mb-4'>Add Todo</h4>
                  </div>
                </div>
                <div className="row">
                  <div className="col col-md-6 mb-3">
                    <input type="text" className='form-control' name='title' placeholder='Title' onChange={handleChange} />
                  </div>
                  <div className="col col-md-6 mb-3">
                    <input type="text" className='form-control' name='location' placeholder='Location' onChange={handleChange} />
                  </div>
                </div>
                <div className="row">
                  <div className="col mb-3">
                    <textarea className='form-control' name="description" cols="30" rows="5" placeholder='Enter description here...' onChange={handleChange}></textarea>
                  </div>
                </div>
                <div className="row">
                  <div className="col text-center">
                    <button className='btn btn-info w-50 btn-sm'>Add Todo</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
