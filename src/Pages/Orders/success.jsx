import React from 'react';
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const OrderSuccess = () => {
    const { userData } = useSelector((state) => state.auth);
    return (
        <section className='w-full p-10 py-8 lg:py-20 flex items-center justify-center flex-col gap-2'>
            <img src="/checked.png" className="w-[80px] sm:w-[120px]" />
            <h3 className='mb-0 text-[20px] sm:text-[25px]'>Your order is placed</h3>
            <p className='mt-0 mb-0'>Thank you for your payment.</p>
            <p className='mt-0 text-center'>Order Invoice send to your email <b>{userData?.email}</b></p>
            <Link to="/">
                <Button className="btn-org btn-border">Back to home</Button>
            </Link>
        </section>
    )
}
