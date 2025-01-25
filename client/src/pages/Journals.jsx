
import { useRecoilValue } from "recoil";
import { allJournals } from "@/atoms/journals";
import JournalCard from "@/components/cards/JournalCard";
import JournalModal from "@/components/utils/JournalModal";
const Journals = () => {
  const journals = useRecoilValue(allJournals);
  return (
    <main>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-cyan-700">
          Your Personal Sanctuary for Thoughts and Growth
        </h1>
        <JournalModal mainLabel="Add Journal" buttonLabel="Add"/>
      </div>
      <div>
        {journals && journals.map((journal) => {
          return <JournalCard key={journal._id} date={journal.createdAt} title={journal.title} mood={journal.mood} id={journal._id}/>
        })}
      </div>
    </main>
  );
}

export default Journals