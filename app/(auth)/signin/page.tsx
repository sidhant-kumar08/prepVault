"use client";

import React, { useState } from 'react';
import { BsGithub } from "react-icons/bs";
import { signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';

function Page() {




    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleCredentialsLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const result = await signIn('credentials', { email, password });

            if (result?.ok) {
                redirect('/');
            }
        } catch (error) {
            console.error('Login failed', error);
        }
    }

    async function handleGithubLogin() {
        await signIn('github');
    }

    return (
        <>
            <form className='flex justify-center items-center mt-14 h-96' onSubmit={handleCredentialsLogin}>
                <div className='border-neutral-500 border rounded-2xl justify-center flex items-center px-10 md:px-16 py-8 flex-col gap-4 max-w-96'>
                    <div className='mb-4 text-2xl md:text-2xl font-poppins font-semibold text-nowrap'>
                        <h1>Login to PrepVault</h1>
                    </div>

                    <div className='flex-col flex gap-2'>
                        <input
                            className='border rounded-lg dark:bg-black dark:text-white py-1 px-4'
                            name='email'
                            type="email"
                            placeholder='johndoe@example.com'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <input
                            className='border rounded-lg dark:bg-black dark:text-white py-1 px-4'
                            name='password'
                            type="password"
                            placeholder='*****'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>

                    <div className='flex flex-col w-full justify-center items-center'>
                        <div>
                            <button type="submit" className='bg-blue-500 text-white px-20 py-2 rounded-lg'>
                                Login
                            </button>
                        </div>

                        <div className='flex gap-2 justify-center items-center w-full my-4'>
                            <div className='flex-grow h-px bg-neutral-300 dark:bg-white'></div>
                            <span className='px-2'>or</span>
                            <div className='flex-grow h-px bg-neutral-300 dark:bg-white'></div>
                        </div>

                        <div>
                            <button
                                type="button"
                                onClick={handleGithubLogin}
                                className='bg-black dark:bg-white dark:text-black flex gap-2 items-center text-white rounded-lg px-6 py-2'
                            >
                                Login with Github <BsGithub />
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

export default Page;
