import React from 'react'

function Goal({name, description, no_of_plans, completed_tasks, pending_tasks}) {
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-5 hover:shadow-lg hover:border-transparent cursor-pointer">
            <h1 className="text-4xl my-2">{name}</h1>
            <p className="mb-2">{description}</p>
            <p><span>Duration</span> = {no_of_plans}</p>
            <p><span>Completed Tasks</span> = {completed_tasks}</p>
            <p><span>Pending Tasks</span> = {pending_tasks}</p>
            
        </div>
    )
}

export default Goal
