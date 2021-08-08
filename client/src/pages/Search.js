import React, { useState, useEffect } from "react";
import queryString from "query-string";

import { Link } from "react-router-dom";
import { searchListing } from "../features/hotel/hotelSlice";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "../components/SearchBar";
import SearchCard from "../components/SearchCard";
import HotelCard from "../components/HotelCard";

const Search = () => {
	const { hotelDetail } = useSelector((state) => ({ ...state }));
	const { searchResult } = hotelDetail;
	const [searchLocation, setSearchLocation] = useState();
	const [searchBed, setSearchBed] = useState();
	const [searchDate, setSearchDate] = useState();
	const [hotel, setHotel] = useState();
	const dispatch = useDispatch();
	useEffect(() => {
		const { searchlocation, bed, ...date } = queryString.parse(
			window.location.search
		);
		dispatch(searchListing({ searchlocation, bed, date }));
	}, [window.location.search]);
	return (
		<div>
			<div className="container">
				<div className="row">
					{Object.values(searchResult).map((item) => {
						return <SearchCard key={item._id} item={item} />;
					})}
				</div>
			</div>
		</div>
	);
};

export default Search;
