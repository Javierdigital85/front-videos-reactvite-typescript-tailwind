import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { Video } from "../interfaces/Video";
const URL = import.meta.env.VITE_BACKEND_URL;

interface SearchProp {
  onSearchResult: (results: Video[]) => void;
}

const Search = ({ onSearchResult }: SearchProp) => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmitSearch = async (e: FormEvent<HTMLFormElement>) => {
    console.log("llega");
    e.preventDefault();
    try {
      const response = await axios.get(`${URL}/api/videos/search`, {
        params: { queryVideo: search },
      });
      console.log(response, "response");
      console.log(response.data, "response.dataaa");
      onSearchResult(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-2 rounded-md">
      <form onSubmit={handleSubmitSearch} className="flex flex-row max-w-md">
        <input
          type="text"
          placeholder="search"
          onChange={handleSearchChange}
          value={search}
          className="rounded-md p-2 font-poppins w-full focus:outline-none focus:ring-2"
        />
        <button
          type="submit"
          className="bg-blue-500 ml-1 rounded-md text-white p-2 font-poppins"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
