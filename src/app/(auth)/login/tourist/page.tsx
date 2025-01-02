"use client"
import React from "react"
import Login from "@/components/auth/login/Login"

const TouristLogin = () => {

    return(
        <section>
            <Login userRole={ { name: 'tourist' } } />
        </section>
    )
}
export default TouristLogin;