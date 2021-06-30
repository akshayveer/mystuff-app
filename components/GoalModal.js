import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

function goalForm(titleRef, desRef, hidden, setState) {

    return (
        // <form className="mt-8 space-y-6 max-w-full" action="#" method="POST">
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
              <span className={`text-red-700 ${hidden ? "hidden": ""}`}>Title is empty!!</span>
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
        // </form>
    )
}

function GoalModal({open, setOpen, addGoal}) {
    console.log(open)
    const cancelButtonRef = useRef(null)
    const titleRef = useRef(null)
    const desRef = useRef(null)
    const [ goalFormTitleError, goalFormTitleErrorSetState ] = useState(true)
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
                            goalForm(titleRef, desRef, goalFormTitleError, goalFormTitleErrorSetState)
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
                              "duration": "0 Months"
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

