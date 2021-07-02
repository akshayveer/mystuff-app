import { useSession } from 'next-auth/client'
import { useState } from 'react'
import { useRouter } from 'next/router'
import DefaultErrorPage from 'next/error'
import { listPublicGoals, getPublicGoal } from "../../lib/goalService";
import Error from 'next/error'


async function getGoal(goalId) {
    const response = await fetch(`/api/goals/${goalId}`);
    const goal = await response.json()
    if (response.status != 200) {
        return false
    }
    return goal
}

function GoalPlan({ goal }) {
    const router = useRouter()
    const { id } = router.query

    const [session, loading] = useSession()
    if (loading) {
        return <div>Loading...</div>
    }
    if (!session && goal?.accessType === "private") {
        return <Error statusCode={404} title="Not Found"/>
    }
    // const [ goal, setGoal ] = useState()

    const { isFallback } = useRouter();

    if (isFallback) {
        return (<div>Loading...</div>)
    }


    return (
        <div>
            <h1>{goal.name}</h1>
        </div>
    )
}

export default GoalPlan

// This function gets called at build time
export async function getStaticPaths() {
    const defaultGoals = await listPublicGoals()

    console.log('goals for static paths ', defaultGoals)
  
    // Get the paths we want to pre-render based on posts
    const paths = defaultGoals.map((goal) => ({
      params: { id: goal.id.toString() },
    }))

    console.log('paths for static paths ', paths)
  
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: 'blocking' }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
    console.log('goal plan static props params', params)
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const goal = await getPublicGoal(`${params.id}`)

    console.log('static props goal', goal)
  
    // Pass post data to the page via props
    return { props: { goal } }
}

