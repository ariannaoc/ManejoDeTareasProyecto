import React from "react";
import { useForm } from "react-hook-form";


import { Dialog, DialogTitle } from "@headlessui/react";
import Textbox from "./TextBox";
import Loading from "./Carga";
import Button from "./button";
import ModalWrapper from "./ModalWrapper";
import { useSelector } from "react-redux";
import TextBox from "./TextBox";

const AgregarUsuario = ({ open, setOpen, userData }) => {
  let defaultValues = userData ?? {};
  const { user } = useSelector((state) => state.auth);

  const isLoading = false,
    isUpdating = false;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const handleOnSubmit = () => {};

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
          <DialogTitle
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
            {userData ? "Actualizar Perfil" : "Agregar Nuevo Usuario"}
          </DialogTitle>
          <div className='mt-2 flex flex-col gap-6'>
            <TextBox
              placeholder='Full name'
              type='text'
              name='name'
              label='Nombre Completo'
              className='w-full rounded-xl'
              register={register("name", {
                required: "Nombre Completo es obligatorio",
              })}
              error={errors.name ? errors.name.message : ""}
            />
            <Textbox
              placeholder='Title'
              type='text'
              name='title'
              label='Rol en Equipo'
              className='w-full rounded-xl'
              register={register("title", {
                required: "Rol es obligatorio",
              })}
              error={errors.title ? errors.title.message : ""}
            />
            <Textbox
              placeholder='Email Address'
              type='email'
              name='email'
              label='Correo'
              className='w-full rounded-xl'
              register={register("email", {
                required: "Correo es obligatorio",
              })}
              error={errors.email ? errors.email.message : ""}
            />

          </div>

          {isLoading || isUpdating ? (
            <div className='py-5'>
              <Loading />
            </div>
          ) : (
            <div className='py-3 mt-4 sm:flex sm:flex-row-reverse gap-4'>
              <Button
                type='submit'
                className='bg-green-600 rounded-lg px-8 text-sm font-semibold text-white hover:bg-green-700  sm:w-auto'
                label='Agregar'
              />

              <Button
                type='button'
                className='bg-red-500 rounded-lg px-5 text-sm font-semibold text-white sm:w-auto'
                onClick={() => setOpen(false)}
                label='Cancelar'
              />
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};

export default AgregarUsuario;