import TaskCard from "./components/TaskCard.tsx"
import { tasks as initialTasks, Status, statuses, Task } from "./utils/data-task.ts"
import { useState } from "react"

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  const columns = statuses.map((status) => {
    const tasksInColumn = tasks.filter((task) => task.status === status)
    return {
      title: status,
      tasks: tasksInColumn,
    }
  })

  const updateTask = (task: Task) => {
    const updatedTasks = tasks.map((t) => {
      return t.id === task.id ? task : t
    })
    setTasks(updatedTasks)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: Status) => {
    e.preventDefault()
    const id = e.dataTransfer.getData("id")
    const task = tasks.find((task) => task.id === id)
    if (task) {
      updateTask({...task, status})
    }
}

  return (
    <div className="flex divide-x">
      {columns.map((column) => (
        <div className="flex flex-col" onDrop={(e) => handleDrop(e, column.title)} onDragOver={(e) => e.preventDefault()}>
          <h2 className="flex flex-col items-center text-3xl p-2 capitalize font-bold text-gray-700">
            {column.title}
          </h2>
          <div className="flex flex-col items-center text-gray-500">
            {column.tasks.reduce(
              (total, task) => total + (task?.points || 0),
              0
            )}
          </div>
          {column.tasks.map((task) => (
            <TaskCard task={task} updateTask={updateTask} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default App
