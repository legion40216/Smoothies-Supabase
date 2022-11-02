import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom"

import { useState } from "react";

const Create = ({h1tag}) => {
   const navigate = useNavigate()

   const[title,setTitle] = useState('')
   const[rating,setRating] = useState('')
   const[method,setMethod] = useState('')
   const [formError, setformError] = useState(null)

   const[isPending,setisPending] = useState(false)

   const handleSubmit = async(e)=>{
     e.preventDefault()
     
     if(!title || !rating || !method)
     {
        setformError("Please fill all the form")
        return
     }
     setformError(null)
     setisPending(true)
     const {data, error} = await supabase
     .from('smoothies')
     .insert([{title, method, rating}])
     .select()

     if(error)
     {
        console.log(error)
        setformError("Could not submit please try again")
     }

     if(data){
        console.log(data)
        setisPending(false)
        setformError(null)
        navigate('/')
     }
   }

    return ( 
        <div className="container">
            <h1 className="margin-b-2 font-size-700">{h1tag}</h1>
             <div className="create-smoothies-form">
             <form className="flow" onSubmit={handleSubmit} >
                <div>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title"  
                value={title}
                onChange={(e)=>{setTitle(e.target.value)}}/>
                </div>

                <div>
                <label htmlFor="method">Method:</label>
                <textarea type="" id="method" 
                  value={method}
                  onChange={(e)=>{setMethod(e.target.value)}}
                  />
                
                </div>
               
                <div>
                <label htmlFor="rating">Rating:</label>
                <input type="number" id="rating"
                min="0"
                  value={rating}
                  onChange={(e)=>{setRating(e.target.value)}}
                />
                </div>
                 {!isPending && <button className="form-button">Create Smoothies Recipies</button>}
                 {isPending && <button className="form-button">Adding Smoothies Recipies...</button>}
                 
                 {formError && <p>{formError}</p>}

             </form>
             </div>
           

        </div>
     );
}
 
export default Create;
