"use client"
import React from 'react'
import { Separator } from '@radix-ui/react-separator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Toaster,toast } from 'sonner'
import { signIn } from "next-auth/react";
import { TriangleAlert } from "lucide-react";

import {
    Card,
    CardHeader,
    CardDescription,
    CardTitle,
    CardContent
} from '@/components/ui/card'
import {FaGithub} from "react-icons/fa"
import {FcGoogle} from "react-icons/fc"

const SignIn = () => {
    const [email, setEmail] = useState("")
const [error, setError] = useState("")
const [password, setPassword] = useState("")
const [pending, setPending] = useState(false)
const router=useRouter();
const handleSubmit=async(e)=>{
    e.preventDefault()
    setPending(true)
    const res=await signIn("credentials",{
        redirect:false,
        email,
        password
    })
    if(res?.ok){
        router.push("/")
        toast.success("login successful")
    }else if(res?.status===401){
        setError("Invalid credentials")
        setPending(false)
    }else{
        setError("Something went wrong")
    }
}
    return (
        <div className='h-screen w-full flex items-center justify-center bg-gradient-to-r from-[rgba(137,129,94)] to-[#404429]'>
            <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-semibold">
                        Sign In
                    </CardTitle>
                    <CardDescription className="text-sm text-accent-foreground text-center">
                        Use email to sign-in
                    </CardDescription>
                </CardHeader>
                 {!!error&&
                                (
                                    <div className="bg-destructive/15 p-3 rounded-md flex items-center mb-6 text-sm text-destructive gap-x-2 ">
                                        <TriangleAlert/>
                                        <p>{error}</p>
                                    </div>
                                )
                                }
                <CardContent>
                    <form onSubmit={handleSubmit} className='space-y-3'>
                        <Input
                            type="email"
                            disabled={pending}
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Input
                            type="password"
                            disabled={pending}
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button
                        className="w-full"
                        type="submit"
                        size="lg"
                        disabled={pending}
                        >
                          Continue
                        </Button>
                    </form>
                    <Separator/>
                    <div className='flex my-2 justify-evenly mx-auto items-center'>
                    <Button size="lg" disabled={false}  >
                        <FaGithub className='size-8 left-1.5 top-1.5'/>
                    </Button>
                    <Button size="lg" disabled={false} >
                        <FcGoogle className='size-8 left-1.5 top-1.5'/>
                    </Button>
                    </div>
                    
                    <p className='text-center text-sm mt-2 text-muted-foreground'>
                        Don't have an account?
                        <Link className='text-sky-700 cursor-pointer hover:underline ml-4' href="Sign-up">Sign-up</Link>
                    </p>
                </CardContent>

            </Card>
        </div>
    )
}

export default SignIn
