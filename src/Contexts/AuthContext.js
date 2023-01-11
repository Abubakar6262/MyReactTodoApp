import React,{createContext, useState} from 'react'

const initialvalue = "Abu bakar"
export const AuthContext = createContext()
export default function AuthContextProvider(props) {
    const [myname , setMyname] = useState(initialvalue)
  return (
    <AuthContext.Provider value={{myname , setMyname}}>
        {props.children}
    </AuthContext.Provider>
  )
}
