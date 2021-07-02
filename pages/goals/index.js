import { useSession } from 'next-auth/client'
import { useState } from 'react'
import Goal from '../../components/Goal'
import GoalModal from '../../components/GoalModal'
import AddGoalStatus from '../../components/AddGoalStatus'

// const defaultGoals = [
//     {
//         "name": "Get Job as Go Developer",
//         "description": "Want to get a job a go developer",
//         "duration": "3 Months",
//         "pending_tasks": 0,
//         "completed_tasks": 0
//     },
//     {
//         "name": "Job at FAANGM",
//         "description": "Want to crack a job at FAANGM",
//         "duration": "5 Months",
//         "pending_tasks": 0,
//         "completed_tasks": 0
//     },
//     {
//         "name": "Become Blockchain Developer",
//         "description": "From Zero to Hero in Blockchain",
//         "duration": "3 Months",
//         "pending_tasks": 0,
//         "completed_tasks": 0
//     }
// ]

function constructGoals(goals) {
    console.log('constructing goals', goals)
    return goals.map((goal, index) => {
        return <Goal key={goal.id} id={goal.id} name={goal.name} description={goal.description} 
        duration={goal.studyPlan?.duration ?? 0} completed_tasks={goal.studyPlan?.completed_tasks ?? 0} pending_tasks={goal.pending_tasks ?? 0}/>
    });
}

async function postGoal(goal) {
    const rawResponse = await fetch('/api/goals', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(goal)
      });
      const content = await rawResponse.json();
      const status = rawResponse.status
      console.log(content);
      if (status === 200) {
          return true;
      }
      return false;
}

async function getGoals() {
    const rawResponse = await fetch(`/api/goals`)
    const allGoals = await rawResponse.json();
    console.log('existing goals', allGoals)
    return allGoals;
}

function Goals({defaultGoals}) {
    const [session, loading] = useSession()
    if (session) {
        defaultGoals = getGoals()
    }
    console.log('type of default', typeof defaultGoals)
    const [goals, setState] = useState(defaultGoals)
    const [goalModalOpen, setIsOpen] = useState(false)
    
    const [goalAddedSuccess, setGoalAddedSuccess] = useState(false)
    const [goalAddedMessage, setGoalAddedMessage] = useState("")
    const [goalAddedAlertOpen, setGoalAddedAlertOpen] = useState(false)

    const addGoal = (newGoal) => {
        goals.push(newGoal)
        setState(goals)
        if (session) {
            let v = postGoal(newGoal)
            
            if (v) {
                setGoalAddedSuccess(true)
                setGoalAddedMessage("Sucessfully added goal")
            }
            else {
                setGoalAddedSuccess(false)
                setGoalAddedMessage("failed to add goal due to network issue")
            }
            
        }
        else {
            setGoalAddedSuccess(false);
            setGoalAddedMessage("SignIn to persist goals")
        }
        setGoalAddedAlertOpen(true)
    }
    return (
        <div>
            <AddGoalStatus message={goalAddedMessage} success={goalAddedSuccess} 
                            isOpen={goalAddedAlertOpen}
                            setIsOpen={setGoalAddedAlertOpen}/> 

            <GoalModal open={goalModalOpen} setOpen={setIsOpen} addGoal={addGoal}/>
           
            <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-2 my-8 mx-auto w-3/4">
                {constructGoals(goals)}
            </div>
            <div className="float-right mr-10 sticky">
                <button className="bg-white shadow-lg hover:shadow-2xl rounded-full h-16 w-16 flex items-center justify-center" onClick={() => setIsOpen(!goalModalOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-red-500 hover:text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                </button>
            </div>
            
            
        </div>
        
    )
}

export default Goals

export async function getStaticProps() {
    const rawResponse = await fetch(`${process.env.SERVER_URL}/api/goals`)
    const defaultGoals = await rawResponse.json()
    return {
      props: {
        defaultGoals,
      },
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every 10 seconds
      revalidate: 600, // In seconds
    }
  }
