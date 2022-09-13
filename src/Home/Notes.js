import React,{useState} from 'react'
import Navbar from '../Components/navbar/Navbar'
import CreateNote from '../Components/notes/CreateNote'
import DisplayNotes from '../Components/notes/DisplayNotes'

const Notes = () => {
  const [submit,setSumbit] = useState(false)


  return (
 
    <React.Fragment>
       <Navbar/>
       <CreateNote submit={submit} setSumbit={setSumbit}/>
       <DisplayNotes submit={submit} setSumbit={setSumbit}/>
    </React.Fragment>
  )
}

export default Notes