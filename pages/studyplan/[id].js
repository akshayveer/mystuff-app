import moment from 'moment'

import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Error from 'next/error'

async function postStudyPlan(goal, tasks) {
  const rawResponse = await fetch('/api/goals', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        goal, tasks
      }
    )
  });
  const content = await rawResponse.json();
  const status = rawResponse.status
  console.log(content);
  if (status === 200) {
    return content;
  }
  return false;
}

function StudyPlan({ studyPlan }) {
  const router = useRouter()
  const { id } = router.query

  const [session, loading] = useSession()
  if (loading) {
    return <div>Loading...</div>
  }

  if (!session && studyPlan?.goal?.accessType === "private") {
    return <Error statusCode={404} title="Not Found" />
  }

  if (!studyPlan) {
    return <Error statusCode={404} title="Not Found" />
  }

  const { isFallback } = useRouter();

  if (isFallback) {
    return (<div>Loading...</div>)
  }

  const createStudyPlan = async (goal) => {
    if (session) {
      const rawResponse = await fetch('/api/studyplan', {
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
  }
  
  return (
    <div>
      <div className="text-center mt-10">
        <h1 className="text-3xl">{studyPlan?.goal?.name}</h1>
      </div>

    </div>
  )
}

export default StudyPlan