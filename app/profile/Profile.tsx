'use client';
import React, {useActionState} from 'react';
import { signOutAction } from '@/app/actions';

const Profile = ({email} : {email: string}) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [logoutState, logout, logoutPending] = useActionState(signOutAction, null);

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center">
          <h1 className="mt-4 text-2xl font-bold text-gray-700">Welcome,</h1>
          <p className="text-gray-500">{email}</p>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Username:</span>
            <span className="text-gray-800">{email.split('@')[0]}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Status:</span>
            <span className="text-green-600 font-semibold">Active</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600">
            Edit Profile
          </button>
          <form
          action={logout}
          >
          <button 
          disabled={logoutPending}
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600">
            Logout
          </button>
          </form>
        </div>
      </div>
  )
}

export default Profile;