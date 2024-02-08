import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BiCommentDetail } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
import * as api from '../api/index.js'
import { useNavigate } from "react-router-dom"
import moment from "moment"
import Pusher from 'pusher-js'




const Sidebar = () => {
    const { user } = useSelector(state => state.user)

    const [rooms, setRooms] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        var pusher = new Pusher('2e13d84605248d1419a9', {
            cluster: 'ap2'
        });

        const channel = pusher.subscribe('rooms');
        channel.bind('inserted', function (data) {
            setRooms(prev => [...prev,data])
        });
    },[])


    const persons = [
        {
            name: "Batuhan",
            avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            lastMsg: "Seni Seviyorum.",
            date: "05.02.2024"
        },
        {
            name: "Fasıl",
            avatar: "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg",
            lastMsg: "Ara.",
            date: "04.02.2024"
        },
        {
            name: "Ali",
            avatar: "https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png",
            lastMsg: "Ara yoksa ben arıcam.",
            date: "01.01.2011"
        },
    ]

    const addingPerson = async () => {
        const newPrompt = prompt('Input a new name:')
        const newimagePrompt = prompt("Input a image url")
        console.log(newPrompt, newimagePrompt)
        if (newPrompt && !newimagePrompt) {
            const newimagePrompt = "https://i.ytimg.com/vi/s9EZyn7ZOQA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDI-633QVbgh5UjRgeHqbix7conGA"
            const { data } = await api.createRoomApi({ groupName: newPrompt, groupImage: newimagePrompt })
            //setRooms(prev => [...prev, data])

        }

        if (newPrompt && newimagePrompt) {
            const { data } = await api.createRoomApi({ groupName: newPrompt, groupImage: newimagePrompt })
            console.log(data)
            console.log(newPrompt + " ----" + newimagePrompt)
        }
    }

    useEffect(() => {

        const allRooms = async () => {
            const { data } = await api.allRoomApi()
            setRooms(data)
        }
        allRooms()
    }, [])

    console.log(rooms, "rooms")


    return (
        <div className='w-1/4 border-r'>
            <div className='bg-gray-200 h-16 flex items-center justify-between p-3'>
                <img className='w-10 rounded-full' src={user?.photoURL} alt='' />
                <div className='flex items-center gap-3'>
                    <BiCommentDetail size={23} className='cursor-pointer text-gray-600' />
                    <BsThreeDotsVertical size={21} className='cursor-pointer text-gray-600' />
                </div>
            </div>
            <div className='bg-gray-100 flex items-center p-1'>
                <div className='bg-white flex items-center gap-2 border p-2 rounded-lg flex-1'>
                    <IoMdSearch size={25} className='text-gray-600' />
                    <input className='outline-none border-none bg-transparent flex-1' type='text' placeholder='Search' />
                </div>
            </div>
            <div onClick={addingPerson} className='bg-green-600 border rounded-md text-white font-bold text-xl flex items-center justify-center cursor-pointer p-2 m-2 border-green-600 hover:opacity-90 transition-opacity'>
                Add New Person
            </div>
            <div>
                {rooms?.map((room, i) => (

                    <div onClick={() => navigate(`chat/${room?._id}`)} key={i} className='flex items-center justify-between p-2 border cursor-pointer hover:bg-gray-100'>
                        <div className='flex items-start gap-2'>
                            <img className='w-10 rounded-full' src={room?.image} alt='' />
                            <div>
                                <div className='font-bold'>{room?.name}</div>
                                <div className='text-sm text-gray-700'>Arayın.</div>
                            </div>
                        </div>
                        <div className='text-xs text-gray-600'>
                            {moment(room?.createdAt).format("MMM Do YY")}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Sidebar