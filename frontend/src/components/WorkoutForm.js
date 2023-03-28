import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');

  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const workout = {name,desc,type,duration,date}

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setName('')
      setDesc('')
      setType('')
      setDuration('')
      setDate('')

      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_WORKOUT', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Name:</label>
      <input 
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        //className={emptyFields.includes('name') ? 'error' : ''}
      />

      <label>Description:</label>
      <input 
        type="text"
        onChange={(e) => setDesc(e.target.value)}
        value={desc}
        //className={emptyFields.includes('desc') ? 'error' : ''}
      />

      <label>Activity Type:</label>
      <input 
        type="text"
        onChange={(e) => setType(e.target.value)}
        value={type}
        //className={emptyFields.includes('type') ? 'error' : ''}
      />

      <label>Duration:</label>
      <input 
        type="text"
        onChange={(e) => setDuration(e.target.value)}
        value={duration}
        //className={emptyFields.includes('duration') ? 'error' : ''}
      />

      <label>Date:</label>
      <input 
        type="date"
        onChange={(e) => setDate(e.target.value)}
        value={date}
        //className={emptyFields.includes('date') ? 'error' : ''}
      />

      <button style={{backgroundColor:"skyblue",color:"black",border:"1px solid black",fontWeight:"bold",margin:"5px"}}>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm