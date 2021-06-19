import Link from 'next/link'
import { useSession } from 'next-auth/client'
import { signIn, signOut } from 'next-auth/client'
import Profile from './Profile'


const navigation = [
    { name: 'Goals', href: '#', current: false },
    { name: 'Spaces', href: '#', current: false },
    { name: 'Channels', href: '#', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Nav() {
    const [ session, loading ] = useSession()
    console.log(session)
    return (
        <div className="sticky top-0 z-50 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 bg-gray-800">
            <div className="relative flex items-center justify-between h-16">
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex-shrink-0 flex items-center">
                        <img
                            className="block lg:hidden h-8 w-auto"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                            alt="Workflow"
                        />
                        <Link href="/">
                            <a>
                                <img
                                    className="hidden lg:block h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                                    alt="Workflow"
                                />
                            </a>

                        </Link>

                    </div>
                    <div className="hidden sm:block sm:ml-6">
                        <div className="flex space-x-4">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'px-3 py-2 rounded-md text-sm font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                {
                    !session && 
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button onClick={() => signIn()} >
                            <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Sign In</a>
                        </button>

                    </div>
                }
                {
                    session && 
                    <Profile avatar={session.user.image}/>
                }

                
            </div>
        </div>
    )
}
