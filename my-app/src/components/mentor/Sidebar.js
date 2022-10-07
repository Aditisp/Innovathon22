import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IMcons from 'react-icons/im';
import * as BsIcons from 'react-icons/bs'
import * as HiIcons from 'react-icons/hi'
import {IoNotifications , IoPower} from "react-icons/io5";
export const Sidebar = [
  {
    title: 'Profile',
    path: '/mprofile',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Ideas',
    path: '/card2',
    icon: <IMcons.ImBooks />,
    cName: 'nav-text'
  },
  {
    title: 'Submit Idea',
    path: '/mupload',
    icon: <HiIcons.HiLightBulb />,
    cName: 'nav-text'
  },
  // {
  //   title: 'Collaboration Requests',
  //   path: '/collab',
  //   icon: <BsIcons.BsFillCalendarCheckFill/>,
  //   cName: 'nav-text'
  // },
  
  // {
  //   title: 'Notifications',
  //   path: '/',
  //   icon: <IoNotifications/>,
  //   cName: 'nav-text'
  // },
  {
    title: 'Logout',
    path: '/collab',
    icon: <IoPower/>,
    cName: 'nav-text'
  }
];