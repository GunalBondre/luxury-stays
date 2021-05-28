import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Stripe from "./Stripe";

const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
const StripeContainer = () => {
	return (
		<Elements stripe={promise}>
			<Stripe />
		</Elements>
	);
};

export default StripeContainer;
