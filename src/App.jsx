import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState(() => {
        const storageJobs = JSON.parse(localStorage.getItem("jobs")) ?? [];
        return storageJobs;
    });
    const [index, setIndex] = useState(null);
    const [newTodoList, setNewTodoList] = useState(() => {
        const newJob = todoList.map((job) => ({
            job: job,
            complete: false,
        }));
        return newJob;
    });

    const handleSubmit = () => {
        const isDuplicate = todoList.some(
            (job) => job.toLowerCase() === todo.toLowerCase()
        );

        console.log(isDuplicate);

        if (isDuplicate) return alert("You have entered a duplicate job name!");

        if (todo.trim() === "") return alert("You must enter a job name!");

        if (index === null) {
            const newTodoList = [todo, ...todoList];
            const jsonJobs = JSON.stringify(newTodoList);
            localStorage.setItem("jobs", jsonJobs);
            setTodoList(newTodoList);
        } else {
            const newTodoList = [...todoList];
            newTodoList[index] = todo;
            setTodoList(newTodoList);
            setIndex(null);
        }

        setTodo("");
    };

    return (
        <>
            <input
                type="text"
                value={todo}
                onChange={(e) => {
                    if (e.target.value.length < 250) {
                        setTodo(e.target.value);
                    }
                    return;
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSubmit();
                    }
                }}
            />
            <button
                onClick={() => {
                    handleSubmit();
                }}
                onMouseDown={(e) => e.preventDefault()}
            >
                {index === null ? "Add" : "Save"}
            </button>
            <ul>
                {todoList.map((jobName, index) => (
                    <li
                        key={index}
                        className={
                            newTodoList[index]?.complete ? "complete" : ""
                        }
                    >
                        {jobName}
                        <button
                            onClick={() => {
                                setTodo(jobName);
                                setIndex(index);
                            }}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => {
                                setIndex(index);
                                const newTodoList = [...todoList];
                                if (
                                    confirm(
                                        "Are you sure want to delete this jobs"
                                    )
                                ) {
                                    newTodoList.splice(index, 1);
                                    setTodoList(newTodoList);
                                }
                            }}
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => {
                                const newJob = [...newTodoList];
                                newJob[index].complete =
                                    !newJob[index].complete;
                                setNewTodoList(newJob);
                                console.log(newJob[index].complete);
                            }}
                        >
                            {newTodoList[index]?.complete
                                ? "MARK AS DONE"
                                : "MARK AS UNDONE"}
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default App;
