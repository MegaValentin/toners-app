import React, { useState } from "react";
import AddTaskForm from "../components/AddTaskForm";

const ToDoList = () => {
    return(
        <div className="bg-transparent p-8 rounded-lg w-full mt-10 ">
            <AddTaskForm/>
        </div>
    )
}

export default ToDoList;
