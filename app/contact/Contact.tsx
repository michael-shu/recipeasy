'use client';
import React, { useActionState } from 'react';
import { submitContactForm } from '@/app/actions';
import { FormMessage} from "@/components/form-message";

const Contact = () => {

    const [state, submit, pending] = useActionState(submitContactForm, {
        success: ""
    });

    return (
        <form
            action={submit}
            className="mt-8 space-y-4">
            <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                    Your Name
                </label>
                <input
                    required
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-purple-300"
                />
            </div>
            <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                    Your Email
                </label>
                <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-purple-300"
                />
            </div>
            <div>
                <label
                    htmlFor="message"
                    className="block text-gray-700 font-medium mb-1"
                >
                    Your Message
                </label>
                <textarea
                    required
                    id="message"
                    name="message"
                    placeholder="Write your message here..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-purple-300"
                ></textarea>
            </div>

            <FormMessage message={state}/>

            <div className="text-center">
                <button
                    type="submit"
                    disabled={pending}
                    className="w-fit p-3 bg-black text-white rounded-lg py-2 hover:text-black hover:bg-white transition duration-300 shadow-md"
                >

                    {pending ? <div className="inline-flex">
                        <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                    </div>
                        : "Send Message"
                    }

                </button>
                
            </div>
        </form>
    )
}

export default Contact