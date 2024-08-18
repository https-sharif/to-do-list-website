import React , {useState} from "react";
import './TodoList.css';

function TodoList(){

    const [ongoingTasks,setOngoingTasks] = useState([]);
    const [completedTasks,setCompletedTasks] = useState([]);
    const [cancelledTasks,setCancelledTasks] = useState([]);
    const [newTask,setNewTask] = useState("");

    function handleInput(event){
        setNewTask(event.target.value);
    }

    function addTask(){
        if(newTask.trim() !== ""){
            setOngoingTasks(o => ([...o,newTask]));
            setNewTask("");
        }

    }

    function handleKeyDown(event){
        if(event.key === "Enter"){
            addTask();
        }
    }

    function completeTask(index){
        const newCompletedTask = ongoingTasks[index];
        setOngoingTasks(o => o.filter((_,i) => i !== index));
        setCompletedTasks(c => [...c,newCompletedTask]);
    }


    function cancelTask(index){
        const newCancelledTask = ongoingTasks[index];
        setOngoingTasks(o => o.filter((_,i) => i !== index));
        setCancelledTasks(c => [...c,newCancelledTask]);
    }

    function deleteTask(index,list){
        if(list === "o"){
            setOngoingTasks(o => o.filter((_,i) => i !== index));
        }
        else if(list === 'c'){
            setCompletedTasks(o => o.filter((_,i) => i !== index));
        }
        else{
            setCancelledTasks(o => o.filter((_,i) => i !== index));
        }
    }
    function moveTaskUp(index){
        if(index > 0){
            const updatedTasks = [...ongoingTasks];
            [updatedTasks[index],updatedTasks[index-1]] = [updatedTasks[index-1],updatedTasks[index]];
            setOngoingTasks(updatedTasks);
        }
    }

    function moveTaskDown(index){
        if(index < ongoingTasks.length - 1){
            const updatedTasks = [...ongoingTasks];
            [updatedTasks[index],updatedTasks[index+1]] = [updatedTasks[index+1],updatedTasks[index]];
            setOngoingTasks(updatedTasks);
        }
    }

    return (
        <div className="main-container">
            <h1 className="main-header">To-do List</h1>
            <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent:"center"}}>
                <input type="text" value={newTask} id="task-input" placeholder="Enter a new task" onChange={handleInput} onKeyDown={handleKeyDown}/>
                <button className="add-task-button" onClick={addTask}>Add Task</button>
            </div>
            <div className="task-list-container">
                <div className="ongoing-task-list task-list">
                    <h2>Ongoing Task</h2>
                    <ol>
                        {ongoingTasks.map((task,index) => 
                            <div>
                                <li key="index" >
                                    <div>{task}</div>
                                    <button onClick={() => deleteTask(index,"o")} className="btn delete">
                                        <svg viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-2.4" y="-2.4" width="28.80" height="28.80" rx="14.4" fill="#ff4242" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 11V17" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 11V17" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                    </button>
                                    <button onClick={() => completeTask(index)} className="btn complete">
                                    <svg viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-2.4" y="-2.4" width="28.80" height="28.80" rx="14.4" fill="#66d9ff" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M19.7071 6.29289C20.0976 6.68342 20.0976 7.31658 19.7071 7.70711L10.4142 17C9.63316 17.7811 8.36683 17.781 7.58579 17L3.29289 12.7071C2.90237 12.3166 2.90237 11.6834 3.29289 11.2929C3.68342 10.9024 4.31658 10.9024 4.70711 11.2929L9 15.5858L18.2929 6.29289C18.6834 5.90237 19.3166 5.90237 19.7071 6.29289Z" fill="#ffffff"></path> </g></svg>
                                    </button>
                                    <button onClick={() => cancelTask(index)} className="btn cancel">
                                    <svg viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-2.4" y="-2.4" width="28.80" height="28.80" rx="14.4" fill="#ffa742" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Edit / Remove_Minus"> <path id="Vector" d="M6 12H18" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
                                    </button>
                                    <button onClick={() => moveTaskUp(index)} className="btn move-up">
                                    <svg fill="#ffffff" viewBox="-2.4 -2.4 28.80 28.80" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-2.4" y="-2.4" width="28.80" height="28.80" rx="14.4" fill="#a390f8" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M11.293,1.293a1,1,0,0,1,1.414,0l5,5a1,1,0,0,1-1.414,1.414L13,4.414V22a1,1,0,0,1-2,0V4.414L7.707,7.707A1,1,0,0,1,6.293,6.293Z"></path></g></svg>
                                    </button>
                                    <button onClick={() => moveTaskDown(index)} className="btn move-down">
                                        <svg fill="#ffffff" viewBox="-2.4 -2.4 28.80 28.80" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-2.4" y="-2.4" width="28.80" height="28.80" rx="14.4" fill="#a390f8" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M6.293,17.707a1,1,0,0,1,1.414-1.414L11,19.586V2a1,1,0,0,1,2,0V19.586l3.293-3.293a1,1,0,0,1,1.414,1.414l-5,5a1,1,0,0,1-1.414,0Z"></path></g></svg>
                                    </button>
                                </li>
                            </div>
                            )}
                    </ol>
                </div>
                <div className="completed-task-list task-list">
                    <h2>Completed Task</h2>
                    <ol>
                        {completedTasks.map((task,index) => 
                            <div>
                                <li key="index" style={{display: "flex", justifyContent: "space-between",alignItems: "center", listStyle: "none"}} >
                                    {task}
                                    <button onClick={() => deleteTask(index,"c")} className="btn delete">
                                        <svg viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-2.4" y="-2.4" width="28.80" height="28.80" rx="14.4" fill="#ff4242" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 11V17" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 11V17" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                    </button>
                                </li>
                            </div>
                            )}
                    </ol>
                </div>
                <div className="cancelled-task-list task-list">
                    <h2>Cancelled Task</h2>
                    <ol>
                        {cancelledTasks.map((task,index) => 
                            <div>
                                <li key="index" style={{display: "flex", justifyContent: "space-between",alignItems: "center", listStyle: "none"}} >
                                    {task}
                                    <button onClick={() => deleteTask(index,"")} className="btn delete">
                                        <svg viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-2.4" y="-2.4" width="28.80" height="28.80" rx="14.4" fill="#ff4242" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 11V17" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 11V17" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                    </button>
                                </li>
                            </div>
                            )}
                    </ol>
                </div>
            </div>
        </div>
    );

}

export default TodoList;