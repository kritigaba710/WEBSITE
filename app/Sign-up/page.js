"use client"
import React from 'react'
import { Separator } from '@radix-ui/react-separator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import {
    Card,
    CardHeader,
    CardDescription,
    CardTitle,
    CardContent
} from '@/components/ui/card'
import {FaGithub} from "react-icons/fa"
import {FcGoogle} from "react-icons/fc"
import { useRouter } from 'next/navigation'
import { TriangleAlert } from 'lucide-react'
const SignUp = () => {
    const[form,setForm]=useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const [pending, setPending] = useState(false)
    const [error, seterror] = useState(null)
    const router=useRouter();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setPending(true);
        const res=await fetch("/api/auth/signup",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(form),
        })
        const data=await res.json();
        if(res.ok){
            setPending(false);
            toast.success(data.message);
            router.push("/Sign-in")
        }else if(res.status===400){
            setPending(false)
            seterror(data.message)
        }else if(res.status===500){
            setPending(false)
            seterror(data.message)
        }
    }
    return (
        <div className='h-screen w-full flex items-center justify-center bg-gradient-to-r from-[rgba(137,129,94)] to-[#404429]'>
            <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-semibold">
                        Sign Up
                    </CardTitle>
                    <CardDescription className="text-sm text-accent-foreground text-center">
                        Use email or services to create account
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
                            type="text"
                            disabled={pending}
                            placeholder="full name"
                            value={form.name}
                            onChange={(e) =>setForm({...form,name:e.target.value }) }
                            required
                        />
                        <Input
                            type="email"
                            disabled={pending}
                            placeholder="email"
                            value={form.email}
                            onChange={(e) =>setForm({...form,email:e.target.value }) }
                            required
                        />
                        <Input
                            type="password"
                            disabled={pending}
                            placeholder="password"
                            value={form.password}
                            onChange={(e) =>setForm({...form,password:e.target.value }) }
                            required
                        />
                        <Input
                            type="password"
                            disabled={pending}
                            placeholder="confirm password"
                            value={form.confirmPassword}
                            onChange={(e) =>setForm({...form,confirmPassword:e.target.value }) }
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
                        Already have an account?
                        <Link className='text-sky-700 cursor-pointer hover:underline ml-4' href="Sign-in">Sign-in</Link>
                    </p>
                </CardContent>

            </Card>
        </div>
    )
}

export default SignUp
