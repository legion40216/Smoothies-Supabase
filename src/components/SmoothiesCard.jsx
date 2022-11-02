import {Link} from 'react-router-dom'
import supabase from '../config/supabaseClient'



const SmoothiesCard = ({smoothies,onDelete}) => {

    const handleDelete = async () =>{
        const {data, error} = await supabase
        .from('smoothies')
        .delete()
        .eq('id', smoothies.id)
        .select()
        if(error)
        {
            console.log("error")
        }
        if(data)
        {
 
          onDelete(smoothies.id)
        }
     }


    return ( 
        <div className="smoothies-card">
        <div className="rating">{smoothies.rating}</div>
        <h1 className="margin-b-1 font-size-500">{smoothies.title}</h1>
        <p>{smoothies.method}</p>
        <div className='button_container'>
        <Link to={'/' + smoothies.id}>
        <button><i className='material-icons' >edit</i></button>
        </Link>
        <button><i className='material-icons' onClick={handleDelete}>delete</i></button>
        </div>
    </div>
     );
}
 
export default SmoothiesCard;