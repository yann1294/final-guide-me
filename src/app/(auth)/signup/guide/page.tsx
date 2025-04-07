"use client"
import SignUp from "@/components/auth/SignUp/SignUp"
//@ts-ignore
import useAuth from "@/context/useAuth"
import { useRouter } from "next/navigation"
import React from "react"


const SignupPage: React.FC = () => {

    return(
        <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <SignUp  />
        </section>
    )
}

export default SignupPage