import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

function goalForm(titleRef, desRef, hidden, setState, isPublic, setPublic) {

  return (
    <>
      <div className="rounded-md shadow-sm -space-y-px">
        <div className="grid grid-rows-2">
          <label htmlFor="email-address" className="text-gray-700 pb-2">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            ref={titleRef}
            autoComplete="Goal Title"
            onChange={(event) => {
              if (event.target.value && event.target.value.trim() === "") {
                setState(false);
              } else {
                setState(true)
              }
            }}
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Goal Title"
          />
          <span className={`text-red-700 ${hidden ? "hidden" : ""}`}>Title is empty!!</span>
        </div>
        <div className="grid">
          <label htmlFor="description" className="text-gray-700 my-2.5">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            ref={desRef}
            rows={3}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 px-3 py-2 block w-full sm:text-sm border border-gray-300 rounded-md px-2"
            placeholder="this goal is about..."
            defaultValue={''}
          />
        </div>
      </div>
      <div className="mt-2 cursor-pointer" onClick={() => setPublic(!isPublic)}>
        {console.log("ispublic", isPublic)}
        {
          (isPublic === true) && (
            <>
              <span className="text-sm inline-block mr-1 align-middle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </span>

              <span className="text-sm">Public</span>
            </>
          )
        }
        {
          (isPublic === false) && (
            <>
              <span className="text-l inline-block mr-1 align-middle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </span>

              <span className="text-sm">Private</span>
            </>
          )
        }

      </div>

    </>
  )
}

function GoalModal({ open, setOpen, addGoal }) {
  console.log(open)
  const cancelButtonRef = useRef(null)
  const titleRef = useRef(null)
  const desRef = useRef(null)
  const [goalFormTitleError, goalFormTitleErrorSetState] = useState(true)
  const [isPublicGoal, setPublicGoal] = useState(true)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={open}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Create A New Goal
                    </Dialog.Title>
                    <div className="mt-2">
                      {/* <p className="text-sm text-gray-500">
                        Are you sure you want to deactivate your account? All of your data will be permanently removed.
                        This action cannot be undone.
                      </p> */}
                      {
                        goalForm(titleRef, desRef, goalFormTitleError, goalFormTitleErrorSetState, isPublicGoal,
                          setPublicGoal)
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={
                    () => {
                      if (titleRef.current.value.trim() === "") {
                        goalFormTitleErrorSetState(false)
                        return;
                      }
                      setOpen(false)
                      addGoal({
                        "name": titleRef.current.value,
                        "description": desRef.current.value,
                        "access": `${isPublicGoal ? "public" : "private"}`
                      })
                      console.log("goal added")
                      goalFormTitleErrorSetState(true)
                    }
                  }
                >
                  Add
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default GoalModal

