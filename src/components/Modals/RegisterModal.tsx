'use client'

import { useCallback, useState } from "react"
import { signIn } from "next-auth/react"
import axios from "axios"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"

import { AiFillGithub } from "react-icons/ai"
import {GrFacebook} from "react-icons/gr"
import { FcGoogle } from "react-icons/fc"

import useRegisterModal from "@hooks/useRegisterModal"
import useLoginModal from "@hooks/useLoginModal"

import Modal from "./Modal"
import Heading from "@components/Heading"
import Input from "@components/Inputs/Input"
import Button from "@components/Button"
import { useRouter } from "next/navigation"

const RegisterModal = () => {
  const router = useRouter()
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: { name: '', email: '', password: '' }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    axios.post('/api/register', data)
      .then(() => { 
        toast.success('Successfully Registered!')
        registerModal.onClose()
      })
      .catch((error) => { 
        toast.error("Something went wrong")
       })
      .finally(() => { 
        signIn('credentials', {
          ...data,
          redirect: false,
        }).then((callback) => {
          setIsLoading(false)
    
          if(callback?.ok){
            router.refresh()
          }
    
          if(callback?.error){
            toast.error(callback.error)
          }
        })
      })
  }

  const toggleLoginModal = useCallback(()=>{
    registerModal.onClose()
    loginModal.onOpen()
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading 
        title="Welcome to Travel Roost"
        subtitle="Create an account!"
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <div className={`
        flex 
        items-center 
        text-xs 
        gap-4
        before:content-[''] 
        before:block 
        before:h-[1px] 
        before:w-full 
        before:bg-neutral-200 
        after:block 
        after:h-[1px] 
        after:w-full 
        after:bg-neutral-200 
      `}>
        or
      </div>
      {/* <Button 
        outline 
        label="Continue with Facebook"
        icon={GrFacebook}
        iconClassName={`text-[#4267B2]`}
        onClick={() => signIn('facebook')}
      /> */}
      <Button 
        outline 
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button 
        outline 
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <p className="flex flex-row justify-center items-center gap-2">
          Already have an account? 
          <span 
            onClick={toggleLoginModal}
            className="
              text-neutral-800 
              cursor-pointer 
              hover:underline"
            >
              Log In
            </span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal