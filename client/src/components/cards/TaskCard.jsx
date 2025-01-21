
// eslint-disable-next-line react/prop-types
const TaskCard = ({title,date,description,priority}) => {
  return (
      <div className=" border-2 border-red-300 rounded-md shadow-xl px-4 py-2">
          <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm">{date}</p>
          </div>
      <p>{description}</p>
      <p>Priority : {priority}</p>
    </div>
  )
}

export default TaskCard