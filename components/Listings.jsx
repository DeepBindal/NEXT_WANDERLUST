"use client";

import { useState, useEffect } from "react";
import ListingCard from "./ListingCard";
import Hotbar from "./Hotbar";
import toast from "react-hot-toast";

const ListingCardList = ({ data, taxes }) => {
  return (
    <>
      {data.length > 0
        && data.map((listing) => (
            <ListingCard
              key={listing._id}
              listing={listing}
              taxes={taxes}
            />
          ))}
    </>
  );
};

const Listings = () => {
  const [allListings, setAllListings] = useState([]);

  const category = [
    "Pool",
    "Beach",
    "Farm",
    "Trending",
    "Budget",
    "Camping",
    "Rooms",
    "Lake",
    "Arctic",
    "Caves",
    "Surfing",
    "Tropical",
    "Iconic Cities",
    "Mansions",
    "Skiing",
    "castles"
  ];

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const [taxes, setTaxes] = useState(false);
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

  const handleHotbarclick = (item) => {
    setSearchText(item);
    console.log(item);
    const searchedResults = filterListings(item);
    console.log(searchedResults);
    setSearchedResults(searchedResults);
  };

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
      {/* <button onClick={setTaxes(!taxes)}>Click me</button> */}
      <Hotbar
        category={category}
        taxes={taxes}
        setTaxes={setTaxes}
        handleHotbarclick={handleHotbarclick}
      />
      {/* All Prompts */}
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-16 mt-10">
        {searchText ? (
          <ListingCardList
            data={searchedResults}
            taxes={taxes}
            // handleClick={handleClick}
          />
        ) : (
          <ListingCardList
            data={allListings}
            taxes={taxes}
            // handleClick={handleClick}
          />
        )}
      </div>
    </>
  );
};

export default Listings;
