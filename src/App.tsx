import React, { FC, ChangeEvent, useState } from "react";
import "./App.css";
import { ITask } from "./interfaces";
import { TodoTask } from "./components/TodoTask";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDeadline(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadline };
    setTodoList([...todoList, newTask]);
    console.log(todoList);
    
    setTask("");
    setDeadline(0)

  };

  const completeTask = (nameToDelete:string):void=>{
    setTodoList(
      todoList.filter(task=>{
        return task.taskName !== nameToDelete})
    )
    
  }

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Task..."
            name="task"
            value={task}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Deadline (in Days)..."
            name="deadline"
            value={deadline}
            onChange={handleChange}
          />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="todoList">
        {todoList.map((task:ITask,key:number)=>{
          return <TodoTask task={task} key={key} completeTask={completeTask}/>
        })}
      
      </div>
    </div>
  );
};

export default App;

