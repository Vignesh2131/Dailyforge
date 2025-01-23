import { Button } from "@/components/ui/button";
import { useRecoilValue } from "recoil";
import { allJournals } from "@/atoms/journals";
import JournalCard from "@/components/cards/JournalCard";
const Journals = () => {
  const journals = useRecoilValue(allJournals);
  console.log(journals)
  return (
    <main>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-cyan-700">
          Your Personal Sanctuary for Thoughts and Growth
        </h1>
        <Button>Add Journal</Button>
      </div>
      <div>
        {journals && journals.map((journal) => {
          return <JournalCard key={journal._id} date={journal.createdAt} title={journal.title} mood={journal.mood}/>
        })}
      </div>
    </main>
  );
}

export default Journals