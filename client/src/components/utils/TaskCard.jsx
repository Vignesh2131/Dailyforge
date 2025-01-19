
const TaskCard = () => {
  return (
      <div className=" border-2 border-red-300 rounded-md shadow-xl px-8 py-6">
          <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Task title</h3>
              <p className="text-sm">11/01/25</p>
          </div>
          <p>Task Description</p>
          <p>Priority : High</p>
    </div>
  )
}

export default TaskCard