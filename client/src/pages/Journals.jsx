import { useRecoilValue } from "recoil";
import { allJournals } from "@/atoms/journals";
import JournalCard from "@/components/cards/JournalCard";
import JournalModal from "@/components/utils/JournalModal";
const Journals = () => {
  const journals = useRecoilValue(allJournals);
  return (
    <main>
      <div className="flex justify-between items-center mb-3 md:mb-6">
        <h1 className="text-lg md:text-4xl font-bold text-primary">
          Your Journals at a Glance
        </h1>
        <JournalModal mainLabel="Add Journal" buttonLabel="Add" />
      </div>
      {journals === undefined &&  (
        <p className="text-center mx-auto mt-10 md:text-xl font-light text-yellow-100">
          Don&apos;t hide emotions. Write them off
        </p>
      )}
      <div>
        {journals &&
          journals.map((journal) => {
            return (
              <JournalCard
                key={journal._id}
                description={journal.description}
                date={journal.createdAt}
                title={journal.title}
                mood={journal.mood}
                id={journal._id}
              />
            );
          })}
      </div>
    </main>
  );
}

export default Journals