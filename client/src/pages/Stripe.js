import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import StripeCheckout from "react-stripe-checkout";
import { Button } from "../components/commonStyles/Button";
import { Form } from "../components/commonStyles/FormWrapper";

const Stripe = () => {
	const [succeeded, setSucceeded] = useState(false);
	const [error, setError] = useState(null);
	const [processing, setProcessing] = useState("");
	const [disabled, setDisabled] = useState(true);
	const [clientSecret, setClientSecret] = useState("");
	const [email, setEmail] = useState("");
	const stripe = useStripe();
	const elements = useElements();
	const cardStyle = {
		style: {
			base: {
				color: "#32325d",
				fontFamily: "Arial, sans-serif",
				fontSmoothing: "antialiased",
				fontSize: "16px",
				"::placeholder": {
					color: "#32325d",
				},
			},
			invalid: {
				color: "#fa755a",
				iconColor: "#fa755a",
			},
		},
	};
	const handleChange = async (event) => {
		// Listen for changes in the CardElement
		// and display any errors as the customer types their card details
		setDisabled(event.empty);
		setError(event.error ? event.error.message : "");
	};
	const handleSubmit = async (ev) => {
		ev.preventDefault();
		setProcessing(true);
		const payload = await stripe.confirmCardPayment(clientSecret, {
			receipt_email: email,
			payment_method: {
				card: elements.getElement(CardElement),
			},
		});
		if (payload.error) {
			setError(`Payment failed ${payload.error.message}`);
			setProcessing(false);
		} else {
			setError(null);
			setProcessing(false);
			setSucceeded(true);
		}
	};
	return (
		<div>
			{/* <StripeCheckout
				amount={500}
				token={(token) => console.log(token)}
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
			>
				<Button>Book Now</Button>
			</StripeCheckout> */}
			<form id="payment-form" onSubmit={handleSubmit}>
				<input
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Enter email address"
				/>
				<CardElement
					id="card-element"
					options={cardStyle}
					onChange={handleChange}
				/>
				<button disabled={processing || disabled || succeeded} id="submit">
					<span id="button-text">
						{processing ? (
							<div className="spinner" id="spinner"></div>
						) : (
							"Pay now"
						)}
					</span>
				</button>
				{/* Show any error that happens when processing the payment */}
				{error && (
					<div className="card-error" role="alert">
						{error}
					</div>
				)}
				{/* Show a success message upon completion */}
				<p className={succeeded ? "Payment Successful" : "Try again"}></p>
			</form>
		</div>
	);
};
export default Stripe;
