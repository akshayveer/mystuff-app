import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export default function AddGoalStatus({ message, success, isOpen, setIsOpen }) {

    function closeModal() {
        setIsOpen(false)
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    static
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className={`text-white px-2 py-2 border-0 rounded relative mb-4 md:w-1/4 mx-auto ${success ? "bg-green-400" : "bg-red-400"}`}>
                                {/* <span className="text-xl inline-block mr-5 align-middle">
                                    <i className="fas fa-bell" />
                                </span> */}
                                <span className="text-xl inline-block mr-2 align-middle">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                    </svg>
                                </span>

                                <span className="inline-block align-middle mr-8">
                                    <b className="capitalize">{message}</b>
                                </span>
                                <button className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-2 mr-4 outline-none focus:outline-none"
                                    onClick={closeModal}>
                                    <span>×</span>
                                </button>
                            </div>

                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
