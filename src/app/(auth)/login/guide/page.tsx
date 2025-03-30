"use client"
//@ts-ignore
import useAuth from "@/context/useAuth"
import { useRouter } from "next/navigation"
import React from "react"
import Login from "@/components/auth/login/Login"

const TouristLogin = () => {

    return(
        <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <Login userRole={ { name: 'guide' } } />
        </section>
    )
}
export default TouristLogin;