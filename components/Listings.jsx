"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ListingCard from "./ListingCard";

const ListingCardList = ({ data }) => {
  return (
    <>
      {data?.map((listing) => (
        <ListingCard
          key={listing._id}
          listing={listing}
          // handleClick={handleClick}
        />
      ))}
    </>
  );
};

const Listings = () => {
  const router = useRouter();
  const [allListings, setAllListings] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchListings = async () => {
    const response = await fetch("/api/listing");
    const data = await response.json();

    setAllListings(data);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const filterListings = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return allListings.filter(
      (item) =>
        regex.test(item.title) ||
        regex.test(item.location) ||
        regex.test(item.country) ||
        regex.test(item.category)
    );
  };

  // const handleClick = (id) => {
  //   router.push(`/lisiting/id`)
  // }

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterListings(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  // const searchResult = filterPrompts(tagName);
  // setSearchedResults(searchResult);

  return (
    <>
    <div className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a stay you like!"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer w-full"
        />
      </form>
      </div>
      {/* All Prompts */}
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-16 mt-16">
        {searchText ? (
          <ListingCardList
            data={searchedResults}
            // handleClick={handleClick}
          />
        ) : (
          <ListingCardList
            data={allListings}
            // handleClick={handleClick}
          />
        )}
      </div>
    </>
  );
};

export default Listings;
