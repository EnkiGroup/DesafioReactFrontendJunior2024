import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { MdKeyboardArrowDown, MdOutlineCheck, MdClose } from 'react-icons/md';

export default function App() {
  const todosList = useSelector((state: RootState) => state.todoList.todo);
  console.log(todosList);

  return (
    <main className='bg-[#f5f5f5] min-h-screen'>
      <section className='container m-auto px-10'>
        <h1 className='text-5xl text-[#b83f45] text-center mb-4'>todos</h1>
        <div className='flex bg-white items-center gap-3 p-3 border-b-2'>
          <button>
            <MdKeyboardArrowDown className='text-2xl text-[#747474] w-8' />
          </button>
          <input
            type='text'
            placeholder='What needs to be done?'
            className='italic text-2xl font-thin w-full text-[#747474] p-1 outline-none'
          />
        </div>
        <div className='bg-white p-3'>
          <ul>
            <li className='flex items-center justify-between text-2xl text-[#747474]'>
              <div className='flex items-center justify-center gap-3 '>
                <span className='w-8 h-8 rounded-full border-2 p-1'>
                  <MdOutlineCheck className='text-xl text-green-600' />
                </span>
                <p className='p-1'>Lorem ipsum dolor sit amet.</p>
              </div>
              <button className='text-red-600 p-1'>
                <MdClose />
              </button>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
