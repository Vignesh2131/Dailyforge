
import Navbar from '@/components/utils/Navbar'
import Sidebar from '@/components/utils/Sidebar';
import Task from './Task';

const Home = () => {
  return (
    <div className=" h-screen">
      <Navbar />
      <div className="grid grid-cols-12">
        <div className="col-span-10 px-10 py-4">
         <Task/>
        </div>
        <div className="col-span-2">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default Home