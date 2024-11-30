import { useForm } from "react-hook-form";
import Button from "../button";
import ModalWrapper from "../ModalWrapper";
import { DialogTitle } from "@headlessui/react";
import TextBox from "../TextBox";


const AgregarTarea = ({ open, setOpen, id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const [addSbTask] = useCreateSubTaskMutation();

  const handleOnSubmit = async (data) => {
    // try {
    //   const res = await addSbTask({ data, id }).unwrap();
    //   toast.success(res.message);
    //   setTimeout(() => {
    //     setOpen(false);
    //   }, 500);
    // } catch (err) {
    //   console.log(err);
    //   toast.error(err?.data?.message || err.error);
    // }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
          <DialogTitle
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
            Agregar una Tarea
          </DialogTitle>
          <div className='mt-2 flex flex-col gap-6'>
            <TextBox
              placeholder='Nombre de la tarea'
              type='text'
              name='title'
              label='Nombre'
              className='w-full rounded'
              register={register("title", {
                required: "Nombre es requerido",
              })}
              error={errors.title ? errors.title.message : ""}
            />

            <div className='flex items-center gap-4'>
              <TextBox
                placeholder='Date'
                type='date'
                name='date'
                label='Fecha de tarea'
                className='w-full rounded'
                register={register("date", {
                  required: "Una fecha es requerida",
                })}
                error={errors.date ? errors.date.message : ""}
              />
              <TextBox
                placeholder='Etiqueta'
                type='text'
                name='tag'
                label='Etiqueta'
                className='w-full rounded'
                register={register("tag", {
                  required: "Una etiqueta es requerida!",
                })}
                error={errors.tag ? errors.tag.message : ""}
              />
            </div>
          </div>
          <div className='py-3 mt-4 flex sm:flex-row-reverse gap-4'>
            <Button
              type='submit'
              className='bg-green-600 rounded-lg text-sm font-semibold text-white hover:bg-green-700 sm:ml-3 sm:w-auto'
              label='Agregar Tarea'
            />

            <Button
              type='button'
              className='bg-red-600 rounded-lg border text-sm font-semibold text-white sm:w-auto'
              onClick={() => setOpen(false)}
              label='Cancelar'
            />
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AgregarTarea;