import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker, Select } from "antd";
import moment from "moment";
import { Button } from "./commonStyles/Button";
import { Form } from "./commonStyles/FormWrapper";
import styled from "styled-components";
import { editHotel } from "../features/hotel/hotelSlice";
import axios from "axios";
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
const EditHotel = ({ match }) => {
	const dispatch = useDispatch();
	const { auth } = useSelector((state) => ({ ...state }));
	const { hotelDetail } = useSelector((state) => ({ ...state }));
	const { singleHotel } = hotelDetail;

	const [values, setValues] = useState({
		hotelName: "",
		description: "",
		price: "",
		to: "",
		from: "",
		location: "",
		bed: "",
	});
	const [image, setImage] = useState("");
	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			hotelName,
			description,
			location,
			price,
			bed,
			to,
			from,
			image,
		};
		dispatch(editHotel(data, match.params.id));
	};

	useEffect(() => {
		loadHotel();
	}, []);

	const handleImageChange = (e) => {
		setImage(e.target.files[0]);
	};
	const handleChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};

	const loadHotel = async () => {
		let response = await axios.get(`/hotel/${match.params.id}`);
		setValues({
			...values,
			...response.data,
		});
	};
	const { hotelName, description, location, price, bed, to, from } = values;
	return (
		<div className="container">
			<FormContainer>
				<Form action="" onSubmit={handleSubmit}>
					<h3 className="title3 mb-2 text-center">Edit Hotel</h3>
					<div className="form-group">
						<input
							type="text"
							name="hotelName"
							placeholder="Enter Hotel Name"
							onChange={handleChange}
							className="form-control"
							value={hotelName}
						/>
					</div>
					<div className="form-group">
						<textarea
							name="description"
							placeholder="description"
							className="form-control"
							onChange={handleChange}
							value={description}
						/>
					</div>
					<div className="form-group">
						<input
							type="Number"
							name="price"
							placeholder="Enter Price Per Day"
							onChange={handleChange}
							className="form-control"
							value={price}
						/>
					</div>{" "}
					<div className="form-group">
						<Select
							onChange={(value) => setValues({ ...values, location: value })}
							placeholder="Select a City"
							style={{ width: "100%" }}
							value={location}
						>
							<Option value="Pune">Pune</Option>
							<Option value="Mumbai">Mumbai</Option>
							<Option value="Delhi">Delhi</Option>
							<Option value="Bangalore">Bangalore</Option>
						</Select>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-md-6">
								{" "}
								{from && (
									<DatePicker
										defaultValue={moment(from, "YYYY-MM-DD")}
										placeholder="from date"
										className="form-control"
										onChange={(date, dateString) => {
											setValues({
												...values,
												from: dateString,
											});
										}}
										disabledDate={(current) =>
											current &&
											current.valueOf() < moment().subtract(1, "days")
										}
									/>
								)}
							</div>

							<div className="col-md-6">
								{" "}
								{to && (
									<DatePicker
										defaultValue={moment(to, "YYYY-MM-DD")}
										placeholder="to date"
										className="form-control"
										onChange={(date, dateString) => {
											setValues({
												...values,
												to: dateString,
											});
										}}
										disabledDate={(current) =>
											current &&
											current.valueOf() < moment().subtract(1, "days")
										}
									/>
								)}
							</div>
						</div>
					</div>
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
							placeholder="No Of Beds"
							style={{ width: "100%" }}
							value={bed}
						>
							<Option key={1}>1</Option>
							<Option key={2}>2</Option>
							<Option key={3}>3</Option>
							<Option key={4}>4</Option>
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
					<Button>Update Hotel</Button>
				</Form>
			</FormContainer>
		</div>
	);
};

export default EditHotel;
