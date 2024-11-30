import React, { useState, useContext, useEffect } from "react";
import PropTypes from 'prop-types';
import { Dialog, DialogTitle } from "@headlessui/react";
import Textbox from "../TextBox";
import { useForm } from "react-hook-form";
import { BiImages } from "react-icons/bi";
import Button from "../button";
import ModalWrapper from "../ModalWrapper";
import ListaUsuarios from "./ListaUsuarios";
import SelectList from "./SelectList";
import { TaskContext } from '../../contexts/TaskContext';

const LISTS = ["Por Hacer", "En Progreso", "Completado"];
const PRIORIRY = ["Alta", "Media", "Baja"];

const uploadedFileURLs = [];

const AgregarProyecto = ({ open, setOpen, task }) => {
    //console.log("Tarea:", task);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue, // Para establecer los valores del formulario
    } = useForm();

    const [team, setTeam] = useState(task?.team || []);
    const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
    const [priority, setPriority] = useState(task?.priority?.toUpperCase() || PRIORIRY[2]);
    const [assets, setAssets] = useState(task?.assets || []);
    const [uploading, setUploading] = useState(false);
    const { setTasks, apiHost, action } = useContext(TaskContext);

    useEffect(() => {
        if (task) {
            setValue("title", task.title || '');
            setValue("date", task.date ? task.date.split('T')[0] : '');
            setValue("priority", task.priority);
            setValue("stage", task.stage)
        }
    }, [task, setValue]);

    const submitHandler = async (data) => {
        // Verifica y asigna títulos por defecto si es necesario
        const validTeam = team.map(user => ({
            ...user,
            title: user.title || 'Sin Título' // Asigna un valor por defecto si el título está ausente
        }));

        const newProject = {
            _id: Date.now().toString(),
            title: data.title,
            date: data.date,
            priority: priority,
            stage: stage,
            assets: assets,
            team: validTeam,
            isTrashed: false,
            activities: [],
            subTasks: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        //*console.log('Datos del proyecto:', newProject); 
        if (action == "agregar") {
            try {
                const response = await fetch(`${apiHost}/api/Tareas`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newProject)
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Network response was not ok: ${errorText}`);
                }

                const responseData = await response.text();
                const jsonData = responseData ? JSON.parse(responseData) : {};

                console.log('Proyecto agregado:', jsonData);
                setTasks(prevTasks => [...prevTasks, newProject]);
                setOpen(false);
            } catch (error) {
                console.error('Error:', error);
            }
        } 
    };

    const handleSelect = (e) => {
        const files = Array.from(e.target.files);
        setAssets(files.map(file => URL.createObjectURL(file)));
    };

    return (
        <>
            <ModalWrapper open={open} setOpen={setOpen}>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <DialogTitle
                        as='h2'
                        className='text-base font-bold leading-6 text-gray-900 mb-4'
                    >
                        {task ? "Actualizar Proyecto" : "Agregar Proyecto"}
                    </DialogTitle>

                    <div className='mt-2 flex flex-col gap-6'>
                        <Textbox
                            placeholder='Nombre del Proyecto...'
                            type='text'
                            name='title'
                            label='Nombre del Proyecto'
                            className='w-full rounded-xl'
                            register={register("title", { required: "Title is required" })}
                            error={errors.title ? errors.title.message : ""}
                        />

                        <ListaUsuarios setTeam={setTeam} team={team} />

                        <div className='flex gap-4'>
                            <SelectList
                                label='Estado'
                                lists={LISTS}
                                selected={stage}
                                setSelected={setStage}
                            />

                            <div className='w-full'>
                                <Textbox
                                    placeholder='Date (yyyy-mm-dd)'
                                    type='date'
                                    name='date'
                                    label='Fecha del Proyecto'
                                    className='w-full rounded-xl'
                                    register={register("date", { required: "Date is required!" })}
                                    error={errors.date ? errors.date.message : ""}
                                />
                            </div>
                        </div>

                        <div className='flex gap-4'>
                            <SelectList
                                label='Prioridad'
                                lists={PRIORIRY}
                                selected={priority}
                                setSelected={setPriority}
                            />

                            <div className='w-full flex items-center justify-center mt-4 '>
                                <label
                                    className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4 '
                                    htmlFor='imgUpload'
                                >
                                    <input
                                        type='file'
                                        className='hidden'
                                        id='imgUpload'
                                        onChange={(e) => handleSelect(e)}
                                        accept='.jpg, .png, .jpeg'
                                        multiple={true}
                                    />
                                    <div className="w-full rounded-xl bg-white inline">
                                        <BiImages className="inline" />
                                        <span className="text-blue-600 inline"> Agregar Recursos +</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className='bg-white py-6 sm:flex sm:flex-row-reverse gap-4'>
                            {uploading ? (
                                <span className='text-sm py-2 text-red-500'>
                                    Subiendo archivos
                                </span>
                            ) : (
                                <Button
                                    label={task ? 'Actualizar' : 'Agregar'}
                                    type='submit'
                                    className='bg-green-600 rounded-lg px-8 text-sm font-semibold text-white hover:bg-green-700 sm:w-auto'
                                />
                            )}

                            <Button
                                type='button'
                                className='bg-red-500 rounded-lg px-5 text-sm font-semibold text-white sm:w-auto'
                                onClick={() => setOpen(false)}
                                label='Cancelar'
                            />
                        </div>
                    </div>
                </form>
            </ModalWrapper>
        </>
    );
};

// Validación de PropTypes
AgregarProyecto.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    task: PropTypes.shape({
        _id: PropTypes.string,
        title: PropTypes.string,
        date: PropTypes.string,
        priority: PropTypes.string,
        stage: PropTypes.string,
        assets: PropTypes.array,
        team: PropTypes.array,
        isTrashed: PropTypes.bool,
        activities: PropTypes.array,
        subTasks: PropTypes.array,
        createdAt: PropTypes.string,
        updatedAt: PropTypes.string,
    })
};

export default AgregarProyecto;
