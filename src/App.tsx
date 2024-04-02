import TaskCard from "./components/TaskCard.tsx"
import { Status, statuses, Task } from "./utils/data-task.ts"
import { useEffect, useState } from "react"

function App() {
  const [tasks, setTasks] = useState<Task[]>([])

  const columns = statuses.map((status) => {
    const tasksInColumn = tasks.filter((task) => task.status === status)
    return {
      status,
      tasks: tasksInColumn,
    }
  })

  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data)
      })
  }, [])

  const updateTask = (task: Task) => {
    fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task)
    })
    const updatedTasks = tasks.map((t) => {
      return t.id === task.id ? task : t
    })
    setTasks(updatedTasks)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: Status) => {
    e.preventDefault()
    setCurrentlyHoveringOver(null)
    const id = e.dataTransfer.getData("id")
    const task = tasks.find((task) => task.id === id)
    if (task) {
      updateTask({ ...task, status })
    }
  }

  const [currentlyHoveringOver, setCurrentlyHoveringOver] =
    useState<Status | null>(null)
  const handleDradEnter = (status: Status) => {
    setCurrentlyHoveringOver(status)
  }

  return (
    <div className="flex divide-x">
      {columns.map((column) => (
        <div
          className="flex flex-col"
          onDrop={(e) => handleDrop(e, column.status)}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => handleDradEnter(column.status)}
        >
          <h2 className="flex flex-col items-center text-3xl p-2 capitalize font-bold text-gray-700">
            {column.status}
          </h2>
          <div className="flex flex-col items-center text-gray-500">
            {column.tasks.reduce(
              (total, task) => total + (task?.points || 0),
              0
            )}
          </div>
          <div
            className={`h-full ${
              currentlyHoveringOver === column.status ? "bg-gray-200" : ""
            }`}
          >
            {column.tasks.map((task) => (
              <TaskCard task={task} updateTask={updateTask} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
