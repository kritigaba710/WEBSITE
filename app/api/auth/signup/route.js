import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import User from "@/app/models/User";
import connectToDatabase from "@/lib/mongodb";

export async function POST(req) {
    const{name,email,password,confirmPassword}=await req.json();

    const isValidEmail=(email)=>{
      const emailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegex.test(email);
    }
    if(!name||!password||!email||!confirmPassword){
        return NextResponse.json({message:"All fields are required"},{status:400})
    }
    if(!isValidEmail(email)){
        return NextResponse.json({message:"Invalid email format"},{status:400})
    }
    if(confirmPassword!==password){
        return NextResponse.json({message:"passwords do not match"},{status:400})
    }
    if(password.length<6){
        return NextResponse.json({message:"passwords must be atleast 6 character"},{status:400})
    }
    try {
        await connectToDatabase();
        const existingUser=await User.findOne({email})
        if(existingUser){
            return NextResponse.json({message:"User already exist"},{status:400})
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=new User({
          email,
          name,
          password:hashedPassword,
        })
        await newUser.save();
        return NextResponse.json({message:"user created"},{status:201})
    } catch (error) {
        return NextResponse.json({message:"Something went wrong"},{status:500})
    }
}