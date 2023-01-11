import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore/lite";
import { firestore } from "../../../config/firebase"
//react responsive table
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
// import { async } from '@firebase/util';
const initialstate = {
  title: "",
  location: "",
  description: "",
}


export default function Home() {

  const [document, setDocument] = useState([])
  const [todo, setTodo] = useState({})
  const handleChange = e => {
    setTodo({ ...todo, [e.target.name]: e.target.value })
  }

  // getting data from fireStore 
  const fetchDocument = async () => {
    let array = [];
    const querySnapshot = await getDocs(collection(firestore, "todos"));
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      console.log(data);
      array.push(data);
    });

    setDocument(array);
  }


  useEffect(() => {
    fetchDocument();
  }, [])

  // Handling Deleting todo
  const handleDelete = async (todo) => {
    console.log(todo);
    try {
      await deleteDoc(doc(firestore, "todos", todo.id));
      toast.error("Todo is deleted successfully")
      let newDocument = document.filter((doc) => {
        return doc.id !== todo.id;
      })
      setDocument(newDocument);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong")
    }
  }
  // handling edit todo
  const handleUpdate = async () => {
    console.log(todo);
    let formData = { ...todo }
    formData.dateCreated = formData.dateCreated
    formData.dateModified = serverTimestamp();
    try {
      await setDoc(doc(firestore, "todos", formData.id), formData, { merge: true });
      toast.error("Todo is Updated successfully")

      let newDocument = document.map((doc) => {
        if (doc.id === todo.id)
          return todo
        return doc
      })
      setDocument(newDocument)
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong todo is not updated")
    }
  }

  return (
    <>
      <div className="py-5">
        <div className="container">
          <div className="row col mb-2">
            <h3 className='text-center'>My Todos</h3>
          </div>
          <div className="row">
            <div className="col">
              <div className="card p-3 p-md-4 p-lg-5">
                <Table>
                  <Thead>
                    <Tr>
                      <Th>sr#</Th>
                      <Th>Title</Th>
                      <Th>Location</Th>
                      <Th>Description</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {
                      document.map((todo, i) => {
                        return <Tr key={i}>
                          <Td>{i + 1}</Td>
                          <Td>{todo.title}</Td>
                          <Td>{todo.location}</Td>
                          <Td>{todo.description}</Td>
                          <Td><button className='btn btn-warning btn-sm me-1 ' data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => { setTodo(todo) }}>Edit</button> <button className='btn btn-danger btn-sm' onClick={() => { handleDelete(todo) }}>Delete</button></Td>
                        </Tr>
                      })
                    }
                  </Tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>

      <div className="modal fade" id="editModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fs-5">Update Todo</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col col-md-6 mb-3">
                  <input type="text" className='form-control' name='title' value={todo.title} placeholder='Title' onChange={handleChange} />
                </div>
                <div className="col col-md-6 mb-3">
                  <input type="text" className='form-control' name='location' value={todo.location} placeholder='Location' onChange={handleChange} />
                </div>
              </div>
              <div className="row">
                <div className="col mb-3">
                  <textarea className='form-control' name="description" value={todo.description} cols="30" rows="5" placeholder='Enter description here...' onChange={handleChange}></textarea>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleUpdate}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
