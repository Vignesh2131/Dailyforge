import { allJournals } from "@/atoms/journals"
import { useRecoilValue } from "recoil"
import { useParams } from "react-router"
import { createMarkup } from "@/lib/markup"
const JournalPage = () => {
    const {id} = useParams();
    const journals = useRecoilValue(allJournals);
    const filterJournal = journals.filter((journal) => journal._id == id);
    const journal = filterJournal[0];
  return (
      <article>
          <div>
              <p>{journal.title}</p>
              <p>{journal.createdAt}</p>
              <div>
                  <p>{journal.mood}</p>
              </div>
          </div>
          <div>
              <div dangerouslySetInnerHTML={createMarkup(journal.description)}/>
          </div>
    </article>
  )
}

export default JournalPage