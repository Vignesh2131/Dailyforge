import HomeJournals from '@/components/utils/HomeJournals';
import HomeTasks from '@/components/utils/HomeTasks';
import Navbar from '@/components/utils/Navbar'
import Sidebar from '@/components/utils/Sidebar';

const Home = () => {
  return (
    <div className=" h-screen">
      <Navbar />
      <div className='grid grid-cols-12'>
        <div className='col-span-10 px-10 py-4'>
          <HomeTasks />
          <HomeJournals/>
        </div>
        <div className='col-span-2'>
          <Sidebar/>
        </div>
      </div>
    </div>
  );
}

export default Home