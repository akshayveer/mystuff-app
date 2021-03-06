import Head from 'next/head'
import { LockClosedIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import  Nav from '../components/Nav'

export default function Home() {
  return (
    <>
      <Head>
        <title>My Stuff</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <meta property="og:title" content="My Stuff" key="title" />
        <meta property="og:locale" content="en_US" />
        <meta name="description" content="Platform to manage content" />
        <meta property="og:description" content="Better way to manage content" key="description" />
      </Head>
      <div className="py-12 bg-gradient-to-r from-blue-100 to-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid-rows-2 w-1/2 mx-auto">
            <div className="lg:text-center">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">My Stuff</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                A better way to organize content
            </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                A platfrom to bring content creators and consumers together. Also, consumers can organize the
                content in a meaningful way.
            </p>
            </div>
            <div className="mt-5 content-center">
              <Link href="/api/auth/signin">
                <button
                  className="place-self-center ml-5 w-1/2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Get Started
            </button>
              </Link>

            </div>
          </div>


          <div className="mt-10 w-1/2 lg:mx-auto">
            <dl className="space-y-0 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-0">
              <div className="grid grid-rows-1 grid-flow-col gap-2">
                <div className="row-span-2 pt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="col-span-2">
                  <p className="text-lg font-medium text-gray-900">Create Goals</p>
                  <dd className="text-base text-gray-500">
                    Single place to create and manage goals. Add resources to each goal that you want to read.
                    Save notes after learning a resource.

               </dd>
                </div>
              </div>

              <div className="grid grid-rows-1 grid-flow-col gap-2">
                <div className="row-span-2 pt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="col-span-2">
                  <p className="text-lg font-medium text-gray-900">Add Tasks To Goals</p>
                  <dd className="text-base text-gray-500">
                    You can add tasks to each goal. Mark them complete. Set remainders. Take notes
               </dd>
                </div>
              </div>

              <div className="grid grid-rows-1 grid-flow-col gap-2">
                <div className="row-span-2 pt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="col-span-2">
                  <p className="text-lg font-medium text-gray-900">Create Spaces</p>
                  <dd className="text-base text-gray-500">
                    A space is a meaningful categorization of content. You can connect various channels to a space
                    and feed with be based on activity posted on those channels
               </dd>
                </div>
              </div>
              <div className="grid grid-rows-1 grid-flow-col gap-2">
                <div className="row-span-2 pt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="col-span-2">
                  <p className="text-lg font-medium text-gray-900">Create Channels</p>
                  <dd className="text-base text-gray-500">
                    Content creators can create a channel notify all subscribers to the channel of the content
                    that they make. Each channel can have a specific purpose and this will helps users to discover
                    content they love.
               </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </>
  )
    
}
