import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  return (
    <div className="workout-details">
      <Card>
      <Card.Header as='h4'>{workout.name}</Card.Header>
      <Card.Body>
        <Card.Text>
        <p><strong>Description: </strong>{workout.desc}</p>
        </Card.Text>

        <Card.Text>
        <p><strong>Activity: </strong>{workout.type}</p>
        </Card.Text>

        <Card.Text>
        <p><strong>Duration: </strong>{workout.duration}</p>
        </Card.Text>

        <Card.Text>
        <p><strong>Date: </strong>{workout.date}</p>
        </Card.Text>

        <Card.Text>
        <span className="material-symbols-outlined" onClick={handleClick} style={{color:"red"}}>delete</span>
        </Card.Text>
         
      </Card.Body>
    </Card>
    </div>
  )
}

export default WorkoutDetails
