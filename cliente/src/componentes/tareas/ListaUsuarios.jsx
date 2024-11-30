import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { BsChevronExpand } from "react-icons/bs";
import { MdCheck } from "react-icons/md";
import { getInitials } from "../../utilidades";
import clsx from "clsx";

const ListaUsuarios = ({ setTeam, team }) => {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const toggleUserSelection = (user) => {
        const isSelected = selectedUsers.some(u => u._id === user._id);
        let updatedSelection;

        if (isSelected) {
            updatedSelection = selectedUsers.filter(u => u._id !== user._id);
        } else {
            updatedSelection = [...selectedUsers, user];
        }

        setSelectedUsers(updatedSelection);
        setTeam(updatedSelection);
        console.log('Usuarios seleccionados:', updatedSelection);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://localhost:7009/api/Usuarios', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log('Usuarios obtenidos:', data);
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();

        if (team.length < 1) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(team);
        }
    }, [team]);

    return (
        <div>
            <p className='text-gray-700'>Asignar Proyecto: </p>
            <Listbox
                value={selectedUsers}
                onChange={() => { }}
                multiple
            >
                <div className='relative mt-1'>
                    <Listbox.Button className='relative w-full cursor-default rounded bg-white pl-3 pr-10 text-left px-3 py-2.5 2xl:py-3 border border-gray-300 sm:text-sm'>
                        <span className='block truncate'>
                            {selectedUsers?.map((user) => user?.name).filter(Boolean).join(", ")}
                        </span>
                        <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                            <BsChevronExpand className='h-5 w-5 text-gray-400' aria-hidden='true' />
                        </span>
                    </Listbox.Button>
                    <Transition as={Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0'>
                        <Listbox.Options className='z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
                            {users?.map((user, index) => (
                                <Listbox.Option key={index} className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-amber-100 text-amber-900" : "text-gray-900"}`} value={user} onClick={() => toggleUserSelection(user)}>
                                    {({ selected }) => (
                                        <>
                                            <div className={clsx("flex items-center gap-2 truncate", selected ? "font-medium" : "font-normal")}>
                                                <div className='w-6 h-6 rounded-full text-white flex items-center justify-center bg-violet-600'>
                                                    <span className='text-center text-[10px]'>{getInitials(user.name)}</span>
                                                </div>
                                                <span>{user.name}</span>
                                            </div>
                                            {selected ? (
                                                <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                                                    <MdCheck className='h-5 w-5' aria-hidden='true' />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
};

export default ListaUsuarios;
