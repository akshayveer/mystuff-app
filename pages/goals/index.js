import { useSession } from 'next-auth/client'
import { useEffect } from 'react'
import { useState } from 'react'
import Goal from '../../components/Goal'
import GoalModal from '../../components/GoalModal'
import AddGoalStatus from '../../components/AddGoalStatus'
import { listPublicGoals } from '../../lib/goalService'

function constructGoals(goals) {
    console.log('constructing goals', goals)
    return goals.map((goal, index) => {
        return <Goal key={index} id={goal.id} name={goal.name} description={goal.description} 
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
          return content;
      }
      return false;
}

async function getGoals() {
    const rawResponse = await fetch(`/api/goals`)
    const allGoals = await rawResponse.json();
    console.log('existing goals', allGoals)
    return allGoals
}

function Goals({defaultGoals}) {
    const [session, loading] = useSession()
    const [goals, setState] = useState(defaultGoals)
    const [goalModalOpen, setIsOpen] = useState(false)
    
    const [goalAddedSuccess, setGoalAddedSuccess] = useState(false)
    const [goalAddedMessage, setGoalAddedMessage] = useState("")
    const [goalAddedAlertOpen, setGoalAddedAlertOpen] = useState(false)

    useEffect(() => {
        getGoals().then(setState)
    }, [session])

    // if (loading) {
    //     return (<h1>Loading..</h1>)
    // }

    const addGoal = (newGoal) => {
        if (session) {
            let v = postGoal(newGoal)

            if (v) {
                goals.push(v)
                setState(goals)
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
    const defaultGoals = await listPublicGoals()
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
