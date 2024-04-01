import TaskCard from "./components/TaskCard.tsx"
import { tasks, statuses } from "./utils/data-task.ts"

function App() {
  const columns = statuses.map((status) => {
    const tasksInColumn = tasks.filter((task) => task.status === status)
    return {
      title: status,
      tasks: tasksInColumn,
    }
  })

  return (
    <div className="flex divide-x">
      {columns.map((column) => (
        <div className="flex flex-col">
          <h2 className="flex flex-col items-center text-3xl p-2 capitalize font-bold text-gray-700">{column.title}</h2>
          {column.tasks.map((task) => 
            <TaskCard task={task} />
          )}
        </div>
      ))}
    </div>
  )
}

export default App
