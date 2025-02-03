'use client';

import { useEffect, useRef, useState } from 'react';
import Tiptap from "@/components/Tiptap";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';

export default function Home() {

  const data = useSession()


  if (!data?.data?.user) {
    redirect('/signin')
  } else {
    console.log(data?.data?.user)
  }


  const editorRef = useRef<any>(null);
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState('');

  const showSuccessToast = () => {
    toast.success("Created Successfully");
  };



  const handleSave = async () => {
    const htmlData = editorRef.current?.getHTML() || '';
    console.log("Editor data:", htmlData);
    console.log("Title:", title);
    console.log("Company:", company);
    console.log("Status:", status);

    const formData = {
      title,
      company,
      status,
      experience: htmlData,
      user: data?.data?.user?.name,
    };


    try {
      const response = await axios.post('/api/experience', formData)
      if (response.data.success === true) {
        showSuccessToast()
        setTitle('')
        setCompany('')
        setStatus('')
      } else {
        console.log('Failed to save')
      }
    } catch (error) {
      console.log(error)
    }

  };

  return (
    <>
      <div className='flex justify-center items-center'>

        <div className='px-2 py-10 md:py-10 md:px-10 md:border md:rounded-xl md:mt-10 dark:border-white'>

          <h1 className='text-center text-2xl font-poppins font-semibold'>Share Your Experience</h1>

          <div className="flex mt-4 justify-center flex-col gap-4 max-w-3xl mx-auto mb-4 items-center">

            <input
              className=" rounded-lg w-full px-2 py-1 dark:bg-neutral-700 shadow-md  bg-white border border-neutral-400"
              placeholder="Experience Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex justify-center gap-4 max-w-3xl mx-auto mb-4 items-center">
            <input
              className=" rounded-lg w-full px-2 py-1 dark:bg-neutral-700 shadow-md  bg-white border border-neutral-400"
              placeholder="Company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <select
              name="status"
              id="status"
              className=" rounded-lg px-2 py-1 dark:bg-neutral-700 shadow-md  bg-white border border-neutral-400"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option disabled value="">Status</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <Tiptap ref={editorRef} />

          <div className='flex justify-center gap-4 max-w-3xl mx-auto mt-4 items-center'>
            <button className='px-4 hover:bg-zinc-900 transition ease-linear duration-100 py-1 w-24 bg-neutral-900 dark:bg-white dark:text-black text-white rounded-xl' onClick={handleSave}>Save</button>
          </div>


        </div>

      </div>

    </>
  );
}
