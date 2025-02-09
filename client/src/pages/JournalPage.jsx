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
    <article className="flex flex-col gap-y-2 md:gap-y-4 px-2 py-4 bg-gradient-to-bl from-dark to-darkest rounded-lg">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center md:mb-2 px-4">
        <p className="text-xl md:text-2xl font-bold text-yellow-400">{journal.title}</p>
        <div>
          <i className="text-sm md:text-base text-yellow-400">{journal.createdAt}</i>
          <p className="text-sm md:text-base font-semibold text-yellow-400">
            Mood : <span className="font-thin">{journal.mood}</span>
          </p>
        </div>
      </div>
      <div className="px-4 text-base mb-2 text-white">
        <div dangerouslySetInnerHTML={createMarkup(journal.description)} />
      </div>
      <div className="px-4 text-center">
        <Link to="/journals">
          <Button className="p-2 text-sm md:p-3 text-darkest bg-yellow-400 hover:bg-shade hover:text-white">
            Back
          </Button>
        </Link>
      </div>
    </article>
  );
}

export default JournalPage