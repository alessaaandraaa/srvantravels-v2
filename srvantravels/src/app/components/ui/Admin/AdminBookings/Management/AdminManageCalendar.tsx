"use client"

import React from "react";

import { Calendar } from "../../calendar";

const AdminManageCalendar = () => {
    return (
        <Calendar
        mode="single"
        className="rounded-md border shadow-sm w-full"
        captionLayout="dropdown"
        />
    )
}

export default AdminManageCalendar;