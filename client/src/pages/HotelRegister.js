import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker, Select } from "antd";
import moment from "moment";
import { Button } from "../components/commonStyles/Button";
import { Link } from "react-router-dom";
import { Form } from "../components/commonStyles/FormWrapper";
import styled from "styled-components";
import { register } from "../features/hotel/hotelSlice";
const { Option } = Select;
// styles
const FormContainer = styled.div`
	padding: 40px;
	width: 50%;
	@media (max-width: 767px) {
		width: 90%;
		padding: 10px;
	}
	margin: 20px auto 30px auto;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	.form-group {
		margin-bottom: 10px;
	}
	.ant-select-selection-placeholder {
		color: #000000;
		opacity: 0.75;
	}
	.ant-picker-input input::placeholder {
		color: #000000;
		opacity: 0.75;
	}
`;
//
const HotelRegister = () => {
	const dispatch = useDispatch();
	const { auth } = useSelector((state) => ({ ...state }));

	const [values, setValues] = useState({
		hotelName: "",
		description: "",
		price: "",
		to: "",
		from: "",
		location: "",
		bed: "",
		image: "",
	});
	const { hotelName, description, location, price, bed, to, from, image } =
		values;

	const handleSubmit = (e) => {
		e.preventDefault();

		const data = {
			hotelName,
			description,
			location,
			price,
			bed,
			// to,
			// from,
			image,
		};
		dispatch(register(data, auth.user.token));
	};
	const handleImageChange = (e) => {
		setValues({ ...values, image: e.target.files[0] });
	};
	const handleChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};
	return (
		<div className="container">
			<FormContainer>
				<Form action="" onSubmit={handleSubmit}>
					<h3 className="title3 mb-2 text-center">Register Hotel</h3>
					<div className="form-group">
						<input
							type="text"
							name="hotelName"
							placeholder="Enter Hotel Name"
							onChange={handleChange}
							className="form-control"
							values={hotelName}
						/>
					</div>
					<div className="form-group">
						<textarea
							name="description"
							placeholder="description"
							className="form-control"
							onChange={handleChange}
							values={description}
						/>
					</div>
					<div className="form-group">
						<input
							type="Number"
							name="price"
							placeholder="Enter Price Per Day"
							onChange={handleChange}
							className="form-control"
							values={price}
						/>
					</div>{" "}
					<div className="form-group">
						<Select
							onChange={(value) => setValues({ ...values, location: value })}
							placeholder="Select a City"
							style={{ width: "100%" }}
						>
							<Option value="Pune">Pune</Option>
							<Option value="Mumbai">Mumbai</Option>
							<Option value="Delhi">Delhi</Option>
							<Option value="Bangalore">Bangalore</Option>
						</Select>
					</div>
					{/* <div className="form-group">
						<div className="row">
							<div className="col-md-6">
								{" "}
								<DatePicker
									placeholder="Available from"
									className="form-control"
									onChange={(date, dateString) => {
										setValues({
											...values,
											from: dateString,
										});
									}}
									values={from}
									disabledDate={(current) =>
										current && current.valueOf() < moment().subtract(1, "days")
									}
								/>
							</div>
							<div className="col-md-6">
								{" "}
								<DatePicker
									placeholder="Available Till"
									className="form-control"
									onChange={(date, dateString) => {
										setValues({
											...values,
											to: dateString,
										});
									}}
									disabledDate={(current) =>
										current && current.valueOf() < moment().subtract(1, "days")
									}
									values={to}
								/>
							</div>
						</div>
					</div> */}
					<div className="form-group">
						{/* <input
							type="Number"
							name="beds"
							placeholder="Number Of Beds"
							onChange={handleChange}
							className="form-control"
							values={bed}
						/> */}
						<Select
							onChange={(value) => setValues({ ...values, bed: value })}
							placeholder="No Of Rooms"
							style={{ width: "100%" }}
						>
							<Option key={2}>2</Option>
							<Option key={4}>4</Option>
							<Option key={6}>6</Option>
							<Option key={8}>8</Option>
							<Option key={10}>10</Option>
							<Option key={15}>15</Option>
							<Option key={20}>20</Option>
						</Select>
					</div>
					<div className="form-group">
						<label className="btn btn-block btn-outline-secondary">
							Image
							<input
								type="file"
								name="image"
								placeholder="image"
								hidden
								onChange={handleImageChange}
								className="form-control"
								values={image}
								accept="image/*"
							/>
						</label>
					</div>
					<Button>Register Hotel</Button>
				</Form>
			</FormContainer>
		</div>
	);
};

export default HotelRegister;
