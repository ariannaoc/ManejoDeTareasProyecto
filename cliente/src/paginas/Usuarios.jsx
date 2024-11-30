
import Title from '../componentes/Titulo';
import Button from '../componentes/button';
import { IoMdAdd } from 'react-icons/io';
import { MdDelete, MdEdit } from 'react-icons/md';

import { getInitials } from '../utilidades';
import { summary } from '../assets/data';
import { useState } from 'react';
import clsx from 'clsx';
import AgregarUsuario from '../componentes/AgregarUsuario';


const Usuarios = () => {

  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [selected, setSelected] = useState(null);


  const userActionHandler = () => {};
  const deleteHandler = () => {};

  const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editClick = (el) => {
    setSelected(el);
    setOpen(true);
  };

  const TableHeader = () => (
    <thead className='border-b border-gray-300 '>
      <tr className='text-black text-left'>
        <th className='py-2'>Nombre</th>
        <th className='py-2'>Rol en Equipo</th>
        <th className='py-2'>Email</th> 
        <th className='py-2 text-between'>Activo</th>
        <th className='py-2 text-center'>Acción </th>
        
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
      <td className='p-2'>
        <div className='flex items-center gap-5'>
          <div className='w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-orange-500'>
            <span className='text-xs md:text-sm text-center'>
              {getInitials(user.name)}
            </span>
          </div>
          {user.name}
        </div>
      </td>

      <td className='p-2'>{user.title}</td>
      <td className='p-2'>{user.email || "user@gmail.com"}</td>
      
      <td>
        <button
          // onClick={() => userStatusClick(user)}
          className={clsx(
            "w-fit px-4 py-1 rounded-full text-center",
            user?.isActive ? "bg-blue-200" : "bg-yellow-100"
          )}
        >
          {user?.isActive ? "Activo" : "Archivado"}
        </button>
      </td>

      <td className='p-2 flex gap-4 justify-center'>
        <Button
          className='text-blue-600 hover:text-blue-500 font-semibold sm:px-0'
          label='Editar'
          icon = <MdEdit className='inline'/>
          type='button'
          onClick={() => editClick(user)}
        />

        <Button
          className='text-red-700 hover:text-red-500 font-semibold sm:px-0'
          label='Eliminar'
          icon = <MdDelete className='inline'/>
          type='button'
          onClick={() => deleteClick(user?._id)}
        />
      </td>
    </tr>
  );

  return (
    <div className='w-full md:px-1 px-0 mb-6'>
      <div className='flex items-center justify-between mb-8'>
        <Title title = "Miembros de Equipo" />
        <Button
            label = "Agregar Usuario +"
            className="flex flex-row-reverse gap-1 items-center bg-green-600 text-white rounded-md 2x1:py-2.5"
            onClick={()=> setOpen(true)}
        />
      </div>

      <div className='bg-white px-2 md:px-4 py-4 shadow-md rounded'>
          <div className='overflow-x-auto'>
            <table className='w-full mb-5'>
              <TableHeader />
              <tbody>
                {summary.users?.map((user, index) => (
                  <TableRow key={index} user={user} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <AgregarUsuario
        open={open}
        setOpen={setOpen}
        userData={selected}
        key={new Date().getTime().toString()}
      />
      
    </div>
  )
  
}

export default Usuarios