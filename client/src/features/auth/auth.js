import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import userSelector from "./authSlice";
import axios from "axios";
import {
	loginFailure,
	loginSuccess,
	registerSuccess,
	registerFailure,
} from "./authSlice";

// const user = useSelector(userSelector);
