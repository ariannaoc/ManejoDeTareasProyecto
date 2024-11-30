import React from 'react';
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlinePendingActions,
  MdTaskAlt,
} from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import { FaNewspaper, FaTasks, FaUsers } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import moment from "moment";
import { summary } from "../assets/data";
import clsx from "clsx";
//import { Chart } from "../components/Chart";
//import { BGS, PRIOTITYSTYELS, TASK_TYPE, getInitials } from "../utils";
//import UserInfo from "../components/UserInfo";
const Dashboard = () => {

 //los const totals so sustitucion para ver como deben de ser los objetos a usar para poder visualizar la informacion que necesitamos
 const totals = <summary className='tasks'></summary> // y para ver la cantidad de tareas diferentes representadas, la informacion de prueba solamente esta en assets/data.js
  const stats = [
    {
      _id: "1",
      label: "Proyectos Totales",
      total: summary?.totalTasks || 0,
      icon: <FaTasks />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "Proyectos Completados",
      total: totals["completed"] || 0,
      icon: <MdTaskAlt />,
      bg: "bg-[#00c040]",
    },
    {
      _id: "3",
      label: "Proyectos en progreso",
      total: totals["in progress"] || 0,
      icon: <LuClipboardEdit />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "Por Hacer",
      total: totals["todo"],
      icon: <MdOutlinePendingActions />,
      bg: "bg-[#ff0000]" || 0,
    },
  ];
/* en el span text donde sale la X hay que cambiar la logica para que represente solamente los numeros */
  const Card = ({ label, count, bg, icon }) => {
    return (
      <div className='w-full h-32 bg-white p-3 shadow-md rounded-2xl flex items-center justify-between'>
        <div className='h-full flex flex-1 flex-col justify-between'>
          <p className='text-base text-gray-600'>{label}</p>
          <span className='text-2xl font-semibold'>{count}</span>
          <span className='text-sm text-gray-400'>{"X en el Último Mes"}</span> 
        </div>
 
        <div
          className={clsx(
            "w-10 h-10 rounded-full flex items-center justify-center text-white",
            bg
          )}
        >
          {icon}
        </div>
      </div>
    );
  };
  //hasta aqui (arriba) lo del const data. abajo si seguimos 


  return <div className='h-full py-4'>
<div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
{
  stats.map(({icon, bg, label, total}, index) => (
    <Card 

      key = {index}
      icon = {icon}
      bg = {bg}
      label = {label}
      count  = {total}
    />
  ))
}
</div>

  </div>
};

export default Dashboard;
