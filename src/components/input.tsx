import React from "react"

export default function Input(props : React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>){
    return(
        <div>
            <input {...props} />
        </div>
    )
}