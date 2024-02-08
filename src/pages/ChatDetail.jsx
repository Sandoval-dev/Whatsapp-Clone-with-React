import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaReact } from "react-icons/fa";
import InputEmoji from "react-input-emoji";
import { useParams } from "react-router-dom"
import * as api from "../api/index"
import moment from "moment"
import Pusher from "pusher-js"




const ChatDetail = () => {
  const [text, setText] = useState("");
  const [personName, setPersonName] = useState(null)
  const [messages, setMessages] = useState([])
  const { user } = useSelector(state => state.user)

  console.log(user, "user")
  const handleOnEnter = async (text) => {
    const messageContent = {
      name: user?.displayName,
      message: text,
      timestamp: new Date(),
      uid: user?.uid,
      roomId: "65c355b4780e1e64b991660f"
    }
    const { data } = await api.createMessageApi(messageContent)
  }
  const { id } = useParams()

  useEffect(() => {
    var pusher = new Pusher('2e13d84605248d1419a9', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function (data) {
      setMessages(prev => [...prev, data])
    });
  },[])

  useEffect(() => {

    if (id) {
      const detailFunc = async () => {

        const { data } = await api.detailRoomApi(id)
        setPersonName(data)
      }

      const detailMessageFunc = async () => {

        const { data } = await api.detailMessageApi(id)
        setMessages(data)
      }
      detailMessageFunc()
      detailFunc()
    }
  }, [id])

  console.log(personName)




  return (
    <div className='w-3/4 chatDetail'>
      <div className='h-16 bg-gray-200 px-4 py-2 flex items-center justify-between'>
        <div className='flex items-center justify-between gap-3'>
          <img className='w-10 rounded-full' src={personName?.image} alt='' />
          <div>
            <div className='font-bold text-l'> {personName?.name} </div>
            <div className='text-xs'> {moment(personName?.updatedAt).format("MMM Do YY")} </div>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <FaReact size={25} className='cursor-pointer text-gray-700' />
          <FaReact size={25} className='cursor-pointer text-gray-700' />

        </div>

      </div>
      <div className='h-4/5 overflow-y-auto'>
        {
          messages?.map((message, i) => (
            message?.name === user.displayName ?
              <div className='w-[400px] bg-green-400 p-2 m-2 rounded-bl-xl ml-auto'>
                <div className='text-md text-white'>{message?.message}</div>
                <div className='text-xs text-white flex justify-end items-center'> {moment(message?.createdAt).format("h:mm:ss - MMMM Do")}  </div>
              </div> :
              <div className='w-[400px] bg-sky-900 p-2 m-2 rounded-br-xl'>
                <div className='text-md text-white'>{message?.message}</div>
                <div className='text-xs text-white flex justify-end items-center'> {moment(message?.createdAt).format("h:mm:ss - MMMM Do")} </div>
              </div>



          ))
        }

        <div className='fixed bottom-0 w-3/4'>
          <InputEmoji
            value={text}
            onChange={setText}
            cleanOnEnter
            onEnter={handleOnEnter}
            placeholder="Message"
          />
        </div>
      </div>
    </div>

  )
}

export default ChatDetail