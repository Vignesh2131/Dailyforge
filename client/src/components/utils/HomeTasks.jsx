import TaskCard from "./TaskCard"
const HomeTasks = () => {
  return (
      <div className="mb-12">
          <div className="mb-3">
              <h2 className="text-4xl font-bold">Tasks</h2>
          </div>
          <div className="grid grid-cols-3 gap-x-6">
              <TaskCard />
              <TaskCard />
              <TaskCard/>
          </div>
    </div>
  )
}

export default HomeTasks