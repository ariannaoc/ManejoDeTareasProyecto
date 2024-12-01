import { DialogTitle } from "@headlessui/react";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TaskContext } from '../../contexts/TaskContext';
import ModalWrapper from "../ModalWrapper";
import TextBox from "../TextBox";
import Button from "../button";

const AgregarTarea = ({ open, setOpen, id }) => {
    const { apiHost } = useContext(TaskContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [tareaActual, setTareaActual] = useState(null);

    //useEffect(() => {
    //    const fetchTarea = async () => {
    //        if (id) {
    //            try {
    //                const response = await fetch(`${apiHost}/api/Tareas/filter?IdTarea=${id}`);
    //                if (!response.ok) {
    //                    throw new Error("Error al recuperar la tarea actual");
    //                }
    //                const data = await response.json();
    //                setTareaActual(data);
    //            } catch (error) {
    //                console.error("Error al recuperar la tarea actual:", error);
    //            }
    //        }
    //    };

    //    fetchTarea();
    //}, [id, apiHost, tareaActual]);

    const handleOnSubmit = async (data) => {
        const subTask = {
            title: data.title,
            date: data.date,
            tag: data.tag,
            _id: Date.now().toString(),
        };


        const fetchTarea = async () => {
            if (id) {
                try {
                    const response = await fetch(`${apiHost}/api/Tareas/filter?IdTarea=${id}`);
                    if (!response.ok) {
                        throw new Error("Error al recuperar la tarea actual");
                    }
                    const data = await response.json();
                    setTareaActual(data);
                } catch (error) {
                    console.error("Error al recuperar la tarea actual:", error);
                }
            }
        };

        fetchTarea();



        if (!tareaActual) {
            console.error("La tarea actual no est� disponible");
            return;
        }

        const updatedSubTasks = Array.isArray(tareaActual[0].subTasks) ? [...tareaActual[0].subTasks, subTask] : [subTask];
        console.log(updatedSubTasks);

        try {
            const updateResponse = await fetch(`${apiHost}/api/Tareas/editSubtask?id=${tareaActual[0]._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedSubTasks),
            });

            if (!updateResponse.ok) {
                //console.log(JSON.stringify(updatedSubTasks));
                throw new Error("Error en la respuesta del servidor");
            }

            const result = await updateResponse.json();
            console.log("Subtarea a�adida:", result);
        } catch (error) {
            console.error("Error al a�adir la subtarea:", error);
        }
    };
    return (
        <>
            <ModalWrapper open={open} setOpen={setOpen}>
                <form onSubmit={handleSubmit(handleOnSubmit)} className="">
                    <DialogTitle
                        as="h2"
                        className="text-base font-bold leading-6 text-gray-900 mb-4"
                    >
                        Agregar una Tarea
                    </DialogTitle>
                    <div className="mt-2 flex flex-col gap-6">
                        <TextBox
                            placeholder="Nombre de la tarea"
                            type="text"
                            name="title"
                            label="Nombre"
                            className="w-full rounded"
                            register={register("title", {
                                required: "Nombre es requerido",
                            })}
                            error={errors.title ? errors.title.message : ""}
                        />

                        <div className="flex items-center gap-4">
                            <TextBox
                                placeholder="Date"
                                type="date"
                                name="date"
                                label="Fecha de tarea"
                                className="w-full rounded"
                                register={register("date", {
                                    required: "Una fecha es requerida",
                                })}
                                error={errors.date ? errors.date.message : ""}
                            />
                            <TextBox
                                placeholder="Etiqueta"
                                type="text"
                                name="tag"
                                label="Etiqueta"
                                className="w-full rounded"
                                register={register("tag", {
                                    required: "Una etiqueta es requerida!",
                                })}
                                error={errors.tag ? errors.tag.message : ""}
                            />
                        </div>
                    </div>
                    <div className="py-3 mt-4 flex sm:flex-row-reverse gap-4">
                        <Button
                            type="submit"
                            className="bg-green-600 rounded-lg text-sm font-semibold text-white hover:bg-green-700 sm:ml-3 sm:w-auto"
                            label="Agregar Tarea"
                        />
                        <Button
                            type="button"
                            className="bg-red-600 rounded-lg border text-sm font-semibold text-white sm:w-auto"
                            onClick={() => setOpen(false)}
                            label="Cancelar"
                        />
                    </div>
                </form>
            </ModalWrapper>
        </>
    );
};

export default AgregarTarea;
