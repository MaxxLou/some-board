export type Status = "todo" | "in-progress" | "done"
export type Priority = "low" | "medium" | "high"

export type Task = {
  title: string,
  id: string,
  status: Status,
  priority: Priority,
  points?: number
}

export const statuses: Status[] = ["todo", "in-progress", "done"]
export const priorities: Priority[] = ["low", "medium", "high"]

export const tasks: Array<Task> = [
  {
    title: "Do something",
    id: "BUS-1",
    status: "todo",
    priority: "high",
    points: 5,
  },
  {
    title: "Competitor analysis",
    id: "BUS-2",
    status: "todo",
    priority: "medium",
    // points: 5,
  },
  {
    title: "Develop Busines Strategy",
    id: "BUS-3",
    status: "in-progress",
    priority: "low",
    points: 8,
  },
  {
    title: "Develop Marketing Strategy",
    id: "BUS-4",
    status: "todo",
    priority: "high",
    points: 3,
  },
  {
    title: "Develop Marketing Strategy",
    id: "BUS-5",
    status: "done",
    priority: "low",
    points: 7,
  },
  {
    title: "Develop Marketing Strategy",
    id: "BUS-6",
    status: "todo",
    priority: "medium",
    points: 4,
  },
  {
    title: "Develop Marketing Strategy",
    id: "BUS-7",
    status: "done",
    priority: "low",
    points: 6,
  },
  {
    title: "Develop Marketing Strategy",
    id: "BUS-8",
    status: "todo",
    priority: "high",
    points: 3,
  },
]