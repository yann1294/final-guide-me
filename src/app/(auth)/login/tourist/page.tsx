"use client"
import React from "react"
import Login from "@/components/auth/Login/Login"

const TouristLogin = () => {

    return(
        <section>
            <Login userRole={ { name: 'tourist' } } />
        </section>
    )
}
export default TouristLogin;