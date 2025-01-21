

const JournalCard = ({date,title,mood}) => {
  return (
      <div className="p-3 border-red-400 flex justify-between items-center">
          <div>
              <p>{date}</p>
              <p>{title}</p>
          </div>
          <div>
              <p>{mood}</p>
          </div>
    </div>
  )
}

export default JournalCard