import clsx from "clsx";
import React, { useState } from "react";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { useSelector } from "react-redux";
import DialogTareas from "./tareas/DialogTareas";
import { BGS, PRIORITY_STYLES, TASK_TYPE, formatDate } from "../utilidades";
import { BiMessageAltDetail, BiSolidMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import UserInfo from "./UserInfo";
import { FcHighPriority } from "react-icons/fc";
import { IoMdAdd } from "react-icons/io";
import { FcLowPriority } from "react-icons/fc";
import { FcMediumPriority } from "react-icons/fc";
import AgregarTarea from "./tareas/AgregarTareas";

const ICONS = {
    alta: <FcHighPriority />,
    media: <FcMediumPriority />,
    baja: <FcLowPriority />,
  };


  const FichaTablero = ({task}) => {
    
    //const {user} = useSelector ((state) => state.auth);
    const [open, setOpen] = useState (false);

    return <>

    <div className="w-full h-fit bg-gray-100 shadow-md p-4 rounded-xl">
    <div className="w-full flex justify-between">
        <div className= {clsx("flex flex-1 gap-1 items-center text-sm font-medium", 
        PRIORITY_STYLES[task?.priority]
        )}
        >
            <span className="text-lg">{ICONS[task?.priority]}</span>
            <span className="uppercase">{task?.priority} Prioridad</span>
          
        </div>
        <div>
                    <DialogTareas task={task} />
        </div>
    </div>
        <>
        <div className="flex items-center gap-2">
            <div className= {clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}/>

            <h4 className="line-clamp-1 text-black">{task?.title}</h4>
        </div>
        <span className="text-sm text-gray-600">
            {formatDate(new Date(task?.date))}
        </span>
        </>

        <div className="w-full border-t border-gray-200 my-2"/>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="flex-gap-1 items-center text-sm text-gray-600">
                    <BiSolidMessageAltDetail/>
                    <span>
                        {task?.activities?.length}
                    </span>
                </div>
                <div className="flex-gap-1 items-center text-sm text-gray-600">
                    <MdAttachFile/>
                    <span>
                        {task?.activities?.length}
                    </span>
                </div>
                <div className="flex-gap-1 items-center text-sm text-gray-600">
                    <FaList/>
                    <span>
                        {task?.activities?.length}
                    </span>
                </div>

            </div>

        <div className="flex flex-row-reverse">
        {
            task?.team?.map((m, index) => (
                <div
                key = {index}
                className = {clsx("w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1", BGS[index% BGS?.length])}
                >

                    <UserInfo user = {m} />
                </div>
            ))}

        </div>
        </div>

        {/*subtareas en data.js*/}
        {task?.subTasks?.length > 0 ? (<div className="py-4 border-t border-gray-200">
                <h5>{task?.subTasks[0].title}</h5>
                <div className="p-4 space-x-8">
                <span className="text-sm text-gray-600">{formatDate(new Date(task?.subTasks[0]?.date))}</span>
                <span className="bg-[#1e90ff]/10 px-3 py-1  rounded-full text-blue-700 font-medium">{task?.subTasks[0].tag}</span>
                </div>
        </div>) : (
            <>
                <div className="py-4">
                    <span>No hay SubTareas</span>
                </div>
            </>
            )}

            <div className="w-full pb-2">
            <button 
            onClick={()=> setOpen(true)}
            className="w-full flex gap-4 items-center text-sm text-gray-500 font-semibold">
                <IoMdAdd className="text-lg" />
                <span>Agregar Tarea</span>
            </button>
            </div>
    </div>

    <AgregarTarea open = {open} setOpen = {setOpen} id = {task._id}/>

    </>
    
  }
  
  export default FichaTablero