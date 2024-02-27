import { useDispatch } from "react-redux";
import { fetchIssues } from "../features/issues/issuesSlice";

const Header = () => {

    const dispatch = useDispatch()

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex items-center py-5 ms-6">
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3  pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-00" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
                    </svg>
                </div>
                <input type="text" id="repoUrl" className="bg-gray-50 border border-taskBGC text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5  dark:bg-columnBGC dark:border-taskBGC dark:placeholder-gray-100 dark:text-white" placeholder="Search repo name..." required />
            </div>
            <button type="submit" className="p-3 ms-6 mx-5 text-sm font-medium text-white bg-taskBGC rounded-lg border border-taskBGC hover:bg-taskBGC focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-columnBGC">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                <span className="sr-only">Search</span>
            </button>
            </form>
        </div>
    )


  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = event.currentTarget.repoUrl.value;
    try {
      await dispatch(fetchIssues(input));
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  }
}

export default Header;
       
