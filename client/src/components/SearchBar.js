import React, { useState } from "react";
import { Button } from "../components/commonStyles/Button";
import { DatePicker } from "../components";
import dayjs from "dayjs";
import { Select } from "antd";
import { useHistory } from "react-router-dom";

const { Option } = Select;

const SearchBar = () => {
	const history = useHistory();

	const handleChange = () => {};
	const [date, setDate] = useState("");
	const [bed, setBed] = useState("");
	const [location, setLocation] = useState("");
	const handleSubmit = () => {
		history.push(`/search?location=${location} & date=${date}&bed=${bed}`);
	};
	const { RangePicker } = DatePicker;
	return (
		<div>
			<form action="" onSubmit={handleSubmit}>
				<div className="form-group">
					{/* <label htmlFor="">Location</label> */}
					<i className="fa fa-map-marker"></i>
					<Select
						name="location"
						onChange={handleChange}
						id="location"
						className="form-control"
						// defaultValue="Pune"
						placeholder="Select City"
						onChange={(value) => setLocation(value)}
						// style={{ width: "100%", minWidth: "120px" }}
					>
						{/* <option value="disabled">Choose City.</option> */}
						<Option value="Pune">Pune</Option>
						<Option value="Bangalore">Bangalore</Option>
						<Option value="Mumbai">Mumbai</Option>
						<Option value="Delhi">Delhi</Option>
					</Select>
				</div>

				<RangePicker
					onChange={(value, dateString) => setDate(dateString)}
					style={{
						width: "100%",
						outline: "none",
						border: "none",
					}}
					disabledDate={(current) =>
						current && current.valueOf() < dayjs().subtract(1, "days")
					}
				/>
				{/* <div className="datepicker d-flex"> */}

				<div className="form-group">
					{/* <label htmlFor="">People</label> */}
					<i className="fa fa-user"></i>
					<Select
						name="abode"
						// id="abode"
						name="abode"
						onChange={handleChange}
						className="form-control"
						// defaultValue="1 Room"
						onChange={(value) => setBed(value)}
						placeholder="No of beds"
					>
						<Option value="1">1 </Option>
						<Option value="2">2 </Option>
						<Option value="3">3 </Option>
						<Option value="4">4 </Option>
					</Select>
				</div>
				<Button search className="">
					Search
				</Button>
			</form>
		</div>
	);
};

export default SearchBar;
