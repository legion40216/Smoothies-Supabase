import SmoothiesCard from "../components/SmoothiesCard";
import { useEffect, useState } from 'react';
import supabase from "../config/supabaseClient";


const Home = ({h1tag}) => {

    const [fetchError, setFetchError] = useState( null)
    const [fetchData, setfetchData] = useState (null) 
    const [orderBy, setOrderBy] = useState('created_at')


    const handleDelete = (id) =>{
       setfetchData(prevfetchData =>{
        return prevfetchData.filter(sm => sm.id !==id)
       })
    }

    useEffect(()=>{
        const getSmoothes = async () =>
          {
              const {data, error} = await supabase 
              .from('smoothies')
              .select('*')
              .order(orderBy, {ascending:false})
      
              if (error) {
                  setFetchError('Could not Connect to database')
                  setfetchData(null)
                  console.log(error)
              }
              if(data)
              {  
             
                setfetchData(data)
                setFetchError(null)
              }
          }
          getSmoothes()
          
      },[orderBy])

      const [checked, setChecked] = useState("Time Created")
      const { useCallback } = require("react")

      const getSortProps = useCallback((value) => {
        return {
          className: checked === value ? "order-by_checked":"",
          onClick: () => 
          {setChecked(value)}
        };
      }, [checked]);

    useEffect(()=>{
      if(checked === "Time Created")
      {
       setOrderBy('created_at')
      }
      if(checked === "title")
      {
          setOrderBy('title')
      }
      if(checked === "rating")
      {
          setOrderBy('rating')
      }
    },[checked])

    
    return ( 
        <div className="container">
            <h1 className="margin-b-2 font-size-700">{h1tag}</h1>
            <div className="order-by">
                <p>Order by:</p>
                <div className="order-by__button-container"></div>
                <button  {...getSortProps("Time Created")}>Time Created</button>
                <button  {...getSortProps("title")}>Title</button>
                <button  {...getSortProps("rating")}>Rating</button>
            </div>
            <div className="smoothies-gird">
                {fetchError && (<p>{fetchError}</p>)}
                {fetchData && (
                    fetchData.map(smoothies=>(
                  <SmoothiesCard key={smoothies.id} smoothies={smoothies} onDelete={handleDelete} />
                    ))
                )}
                
            </div>
        </div>
     );
}
 
export default Home;