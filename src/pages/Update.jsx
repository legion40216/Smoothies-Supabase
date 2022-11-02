import { useParams, useNavigate } from "react-router-dom";
import { useEffect , useState } from "react";
import supabase from "../config/supabaseClient";

const Update = ({h1tag}) => {
    const { id } = useParams()
    const navigate = useNavigate()

    const[title,setTitle] = useState('')
    const[rating,setRating] = useState('')
    const[method,setMethod] = useState('')

    const [formError, setformError] = useState(null)
    const[isPending,setisPending] = useState(false)
    
    useEffect(()=>{
     const fetchSmoothie = async () =>{
        const  { data, error } = await supabase 
        .from('smoothies')
        .select()
        .eq('id', id)
        .single()

        if(error)
        {
            navigate('/' , {replace: true})
        }
        if(data)
        {
           setTitle(data.title)
           setRating(data.rating)
           setMethod(data.method)
        }
     }

     fetchSmoothie()
    }, [id, navigate])

    const handleSubmit = async(e) =>{
     e.preventDefault()

     if(!title || !rating || !method)
     {
      setformError("Please fill in all the fields correctly")
      return
     }
     setisPending(true)
     const {data,error} = await supabase
     .from('smoothies')
     .update({title,method,rating})
     .eq ('id',id)
     .select()

     if(error)
     {
      setformError("error, cant not updata")
     }
     if(data)
     {
      navigate('/')
      setformError(null)
      setisPending(false)
     }

    }

    return ( 
        <div className="container">
            <h1 className="margin-b-2 font-size-700">{h1tag+`-`+id}</h1>
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
                 {!isPending && <button className="form-button">Update Smoothies Recipies</button>}
                 {isPending && <button className="form-button">Updating Smoothies Recipies...</button>}
                 
                 {formError && <p>{formError}</p>}

             </form>
             </div>
        </div>
     );
}
 
export default Update;