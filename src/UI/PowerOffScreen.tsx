import { useDispatch } from 'react-redux';
import { setPowerState } from '../store/systemSlice';

export const PowerOffScreen = () => {
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 z-[99999] bg-black flex items-center justify-center">
      <button
        onClick={() => dispatch(setPowerState('BOOTING'))}
        className="w-24 h-24 rounded-full border-2 border-slate-700 flex items-center justify-center hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all group"
      >
        <svg
          className="w-10 h-10 text-slate-700 group-hover:text-blue-500 transition-colors"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.36 6.64a9 9 0 11-12.73 0M12 2v10" />
        </svg>
      </button>
    </div>
  );
};