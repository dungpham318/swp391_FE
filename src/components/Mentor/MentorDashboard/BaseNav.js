import React, { useEffect, useState } from 'react';
import logo from '../../image/logo.png'
import { useHistory } from 'react-router-dom'
import { Link } from "react-router-dom"
import Header from '../../Header'
const BaseNav = (props) => {
  const { show, setShow, activeTab, setActiveTab } = props
  // const [width, height] = useWindowSize();
  const history = useHistory()
  const [username, setUsername] = useState('')

  return (
    <div className='flex flex-row flex-auto w-screen justify-start '>
      <Header />
      <div
        className='w-1/6 h-screen bg-tab float-left fixed z-10 mt-28'
        style={{
          minWidth: 220
        }}
      >
        <div className='flex flex-row text-justify'>

          {/* <img
            src={img_avatar}
            style={{
              width: '5em',
              padding: '1em',
            }}
          /> */}

        </div>

        <div className='flex flex-col flex-auto w-auto'>

          <div
            className="my-2 mx-3 rounded-lg bg-primary"
            style={{
              position: 'absolute',
              width: '90%',
              height: 50,
              zIndex: -1
            }}
            animate={{
              y: 70 * activeTab,
              stop: () => {
              }
            }}
            transition={{ ease: 'circOut', duration: 0.2 }}
          />

          {
            itemList.map((item, index) => {
              if (history.location.pathname.includes(item.route)) {
                item.isSelected = true
              } else {
                item.isSelected = false
              }
              return <TabBarItem
                data={item}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            })
          }
        </div>
      </div>
      {/* <div
      className='w-1/6 h-screen bg-tab float-left fixed'
      style={{
        minWidth: 220
      }}>


    </div> */}



      <div className='flex flex-col h-screen w-5/6 ml-80 bg-layoutforadmin'>
        {props.children}
      </div>


    </div>

  )
}

const TabBarItem = (props) => {

  const { data, setActiveTab, activeTab } = props

  let bgColor = 'hover:bg-gray-100'
  let textStyle = 'text-gray'

  if (data.id - 1 === activeTab) {
    bgColor = 'bg-primary'
    textStyle = 'text-white font-semibold'
  }

  return (

    <Link to={data.route} onClick={() => {
      // setActiveTab(data.id - 1)
    }}>

      <div
        style={{
          width: 300,
          height: 50,
          marginBlock: 10,
        }}
        className={'flex flex-auto flex-row items-center justify-center mx-3 rounded-lg bg-bluementor' + bgColor}>
        <img
          src={data.id - 1 === activeTab ? data.iconWhite : data.icon}
          className='px-4'
        />

        <p className={'flex flex-auto text-base font-text ' + textStyle}>{data.label}</p>

        {/* <div className='flex flex-row flex-1 '>
        </div> */}

      </div>

    </Link>

  )

}


const itemList = [
  {
    id: 1,
    route: '/MentorDashboard',
    label: 'Push notification',
    // icon: ic_send,
    // iconWhite: ic_send_white,
    isSelected: false
  },
  {
    id: 2,
    route: '/history',
    label: 'History',
    // icon: ic_send,
    // iconWhite: ic_send_white,
    isSelected: false
  },
]

export default BaseNav