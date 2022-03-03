import React from 'react'
import Link from 'next/link'

function Goal({id, name, description, duration, completed_tasks, pending_tasks}) {
    return (
        <Link href={`/goals/${id}`}>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg p-5 hover:shadow-lg hover:border-transparent cursor-pointer">
                <h1 className="text-4xl my-2">{name}</h1>
                <p className="mb-2">{description}</p>
                <p><span>Duration</span> = {duration}</p>
                <p><span>Completed Tasks</span> = {completed_tasks}</p>
                <p><span>Pending Tasks</span> = {pending_tasks}</p>
                
            </div>
        </Link>
        
    )
}

export default Goal
