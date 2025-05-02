import React, { useEffect } from 'react'
import { FaRegSave, FaEdit } from "react-icons/fa";
import { FaCopy } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";
import { useRef } from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Bounce } from 'react-toastify';

const Manage = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const ref = useRef()
  const passwordRef = useRef()

  const [passwordArray, setPasswordArray] = useState([])

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()

    setPasswordArray(passwords)
  }

  useEffect(() => {
    getPasswords()
  }, [])


  const showPassword = () => {
    if (ref.current.src.includes("eyecross.png")) {
      ref.current.src = "icons/eye.png"
      passwordRef.current.type = "text"
    } else {
      ref.current.src = "icons/eyecross.png"
      passwordRef.current.type = "password"
    }
  }

  const savePassword = async () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

      const currentId = form.id || uuidv4()
      if (form.id) {
        console.log("id present ", form.id)
        //to avoid duplicate passwords
        await fetch("http://localhost:3000/", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ id: form.id })
        })

      }


      setPasswordArray([...passwordArray, { ...form, id: currentId }])

      //saving to db
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...form, id: currentId })
      })
      console.log([...passwordArray, { ...form, id: currentId }])
      toast(`Password saved`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        // transition: "Bounce",
      });
    } else {
      toast(`Password NOT saved!!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        // transition: "Bounce",
      });
    }

    setform({ site: "", username: "", password: "" }) // reset form


  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const copyText = (e) => {
    toast('copied! to clipboard', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    navigator.clipboard.writeText(e)
  }

  const deletePassword = async (id) => {
    let c = confirm("really delete this password?")
    console.log(id)
    if (c) {

      setPasswordArray(passwordArray.filter((item) => (item.id !== id)))
      //deleting from db
      let req = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: id })
      })
      let res = await req.json()
      console.log(res)
      if (res.deleteCount === 1) {
        toast(`password deleted`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          // transition: "Bounce",
        });
      }
      else {
        toast(`password deleted ${res.deleteCount}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          // transition: "Bounce",
        });
      }
    }
  }
  const editPassword = (id) => {
    console.log({ ...passwordArray.filter(i => i.id === id)[0] })
    setform({ ...passwordArray.filter(i => i.id === id)[0] })
    setPasswordArray(passwordArray.filter(i => i.id !== id))
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      //transition={Bounce}
      />

      <div className="p-3 md:mycontainer min-h-[84vh]">
        <h1 className='text-5xl font-bold text-center'>
          <span className='text-green-400'>port</span>

          <span className='text-green-700'>PASS</span>
        </h1>
        <p className='text-cyan-900 flex flex-col gap-5 text-lg'>Manage and Remember Your Passwords</p>

        {/* password entry field */}
        <div className="text-black flex flex-col gap-3 items-center">

          <input onChange={handleChange} value={form.site} type="text" className='rounded-full p-4 py-1 border border-indigo-700 w-full' name='site' id='site' placeholder='Website URL please' />

          <div className="flex gap-2 w-full md:flex-row flex-col md:gap-3">

            <input onChange={handleChange} value={form.username} type="text" className='rounded-full p-3 py-1 border border-indigo-700 w-full' name='username' id='username' placeholder='Username' />
            <div className="relative">

              <input ref={passwordRef} type="password" onChange={handleChange} value={form.password} className='rounded-full p-4 py-1 border border-indigo-700 w-full' name='password' id='password' placeholder='Password ' />
              <span onClick={showPassword} className="absolute cursor-pointer right-2.5 top-1.5"><img ref={ref} width={20} src="icons/eyecross.png" alt="show" /></span>
            </div>
          </div>

          <button onClick={savePassword} className='border border-teal-800 rounded-full bg-teal-600 hover:bg-teal-500 flex hover:border-teal-500 gap-3  w-fit p-2'>
            <FaRegSave className='text-2xl' />
            ADD PASSOWRD
          </button>
        </div>

        {/* passwords showing feild */}
        <div className="passwords">
          <h1 className="font-bold">YOUR PASSWORDS</h1>
          {passwordArray.length === 0 ? <p className='text-center'>No passwords saved yet</p> : ""}
          {passwordArray.length != 0 &&
            <table className="table-auto p-3 overflow-hidden w-full mb-10 rounded-2xl ">
              <thead className='bg-teal-600 text-white'>
                <tr>
                  <th className='py-1'>Site</th>
                  <th className='py-1'>Username</th>
                  <th className='py-1'>Password</th>
                  <th className='py-1'>Actions</th>
                </tr>
              </thead>

              <tbody className='bg-[#b1dedb] text-black'>
                {passwordArray.map((item, index) => {
                  return (<>
                    <tr key={index}>
                      <td className='p-1 border border-white text-center'>
                        <div className='flex justify-center items-center'>
                          <a href={item.site}>
                            {item.site}
                          </a>
                        </div>
                      </td>
                      <td className='p-1 border border-white text-center'>
                        <div className='flex gap-2 justify-center items-center'>
                          {item.username}
                          <div onClick={() => copyText(item.username)} className="copy cursor-pointer"><FaCopy />
                          </div>
                        </div>
                      </td>
                      <td className='p-1 border border-white text-center'>
                        <div className='flex gap-2 justify-center items-center'>
                          {"*".repeat(item.password.length)}
                          <div onClick={() => copyText(item.password)} className="copy cursor-pointer"><FaCopy />
                          </div>
                        </div>
                      </td>
                      <td className='p-1 border border-white text-center'>
                        <div className='flex flex-row justify-center text-xl gap-2 items-center'>
                          <span className='cursor-pointer mx1' onClick={() => deletePassword(item.id)}><MdDelete />
                          </span>
                          <span className='cursor-pointer mx1' onClick={() => editPassword(item.id)}><FaEdit />
                          </span>
                        </div>
                      </td>

                    </tr>
                  </>)
                })}

              </tbody>
            </table>
          }

        </div>
      </div>
    </>
  )
}

export default Manage
