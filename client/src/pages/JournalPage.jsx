import { allJournals } from "@/atoms/journals"
import { useRecoilValue } from "recoil"
import { Link, useParams } from "react-router"
import { createMarkup } from "@/lib/markup"
import { Button } from "@/components/ui/button"
const JournalPage = () => {
    const {id} = useParams();
    const journals = useRecoilValue(allJournals);
    const filterJournal = journals.filter((journal) => journal._id == id);
    const journal = filterJournal[0];
  return (
    <article className="flex flex-col gap-y-4">
      <div className="flex justify-between items-center mb-2 px-4">
        <p className="text-2xl font-bold">{journal.title}</p>
        <div>
          <i>{journal.createdAt}</i>
          <p className="font-semibold">
            Mood : <span className="font-thin">{journal.mood}</span>
          </p>
        </div>
      </div>
      <div className="px-4 mb-2">
        <div dangerouslySetInnerHTML={createMarkup(journal.description)} />
          </div>
          <div className="px-4 text-center">
             <Link to="/journals"><Button>Back</Button></Link>
          </div>
    </article>
  );
}

export default JournalPage