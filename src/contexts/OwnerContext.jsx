import { createContext, useEffect, useState } from "react";

const OwnerContext = createContext()

export const OwnerProvider = ({children}) => {
    const [loading, setLoading] = useState("")
    const [owners, setOwners] = useState([])

    const fetchOwner = async () => {
        try{
            const res = await fetch('https://major-project3-backend.vercel.app/users')
            const data = await res.json()
          
            setOwners(data)

        }catch(error){
            console.log("Failed to fetch owners/users.", error)
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOwner()
    }, [])

    return(
        <OwnerContext.Provider value={{loading, owners}}>
            {children}
        </OwnerContext.Provider>
    )

}

export default OwnerContext