import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";
import { searchListing } from "../features/hotel/hotelSlice";
import { useDispatch } from "react-redux";

const Search = () => {
	const [searchLocation, setSearchLocation] = useState();
	const [searchBed, setSearchBed] = useState();
	const [searchDate, setSearchDate] = useState();
	const [hotel, setHotel] = useState();
    const dispatch = useDispatch()
	useEffect(() => {
		const { location, bed, date } = queryString.parse(window.location.search);
		dispatch(searchListing({ location, bed, date }));
	}, [window.location.search]);
	return <div></div>;
};

export default Search;
