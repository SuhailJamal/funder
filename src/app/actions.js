"use server"
import prisma from "@/lib/prisma"
export async function handleLoginForm(formData){
    try{
        const existingUser = await prisma.User.findOne({
            where :{
                email : formData.get("email")
            }
        })

        if(!existingUser){
            return false;
        }else{
            return true
        }
    }
    catch(e){
        console.log("Error while signing in the user : ",e)
    }
}