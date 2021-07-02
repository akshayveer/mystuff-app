import { useSession } from 'next-auth/client'
import { useState } from 'react'

function GoalPlan({ goal }) {
    const [session, loading] = useSession()

    return (
        <div>
            <h1>{goal.name}</h1>
        </div>
    )
}

export default GoalPlan

// This function gets called at build time
export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const rawResponse = await fetch(`${process.env.SERVER_URL}/api/goals`)
    const defaultGoals = await rawResponse.json()

    console.log('goals for static paths ', defaultGoals)
  
    // Get the paths we want to pre-render based on posts
    const paths = defaultGoals.map((goal) => ({
      params: { id: goal.id.toString() },
    }))

    console.log('paths for static paths ', paths)
  
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: true }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
    console.log('goal plan static props params', params)
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const res = await fetch(`${process.env.SERVER_URL}/api/goals/${params.id}`)
    const goal = await res.json()

    console.log('static props goal', goal)
  
    // Pass post data to the page via props
    return { props: { goal } }
}

