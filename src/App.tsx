import TaskCard from "./components/TaskCard.tsx"
import { tasks as initialTasks, statuses, Task } from "./utils/data-task.ts"
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

  const updateTaskPoints = (task: Task, points: number) => {
    const updatedTasks = tasks.map(t => {
      return t.id === task.id ? {...t, points} : t
    })
    setTasks(updatedTasks)
  }

  return (
    <div className="flex divide-x">
      {columns.map((column) => (
        <div className="flex flex-col">
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
            <TaskCard task={task} updateTaskPoints={updateTaskPoints} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default App
