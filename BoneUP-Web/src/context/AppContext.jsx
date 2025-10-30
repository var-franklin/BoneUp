//file path: BoneUP-Web/src/context/AppContext.jsx

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export const AppContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const AppContextProvider = (props) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(localStorage.getItem("token") || null);
	const [loading, setLoading] = useState(true);

	// Set axios default header when token changes
	useEffect(() => {
		if (token) {
			axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
			localStorage.setItem("token", token);
			fetchUser();
		} else {
			delete axios.defaults.headers.common["Authorization"];
			localStorage.removeItem("token");
			setLoading(false);
		}
	}, [token]);

	// Fetch current user
	const fetchUser = async () => {
		try {
			const response = await axios.get(`${API_URL}/api/auth/me`);
			setUser(response.data.user);
		} catch (error) {
			console.error("Failed to fetch user:", error);
			logout();
		} finally {
			setLoading(false);
		}
	};

	// Login function
	const login = async (email, password) => {
		try {
			const response = await axios.post(`${API_URL}/api/auth/login`, {
				email,
				password,
			});
			
			setToken(response.data.token);
			setUser(response.data.user);
			toast.success("Login successful!");
			return response.data.user;
		} catch (error) {
			const message = error.response?.data?.error || "Login failed";
			toast.error(message);
			throw error;
		}
	};

	// Register function
	const register = async (email, password, role, full_name) => {
		try {
			await axios.post(`${API_URL}/api/auth/register`, {
				email,
				password,
				role,
				full_name,
			});
			
			toast.success("Registration successful! Please login.");
		} catch (error) {
			const message = error.response?.data?.error || "Registration failed";
			toast.error(message);
			throw error;
		}
	};

	// Logout function
	const logout = () => {
		setToken(null);
		setUser(null);
		toast.success("Logged out successfully");
	};

	const value = {
		user,
		token,
		loading,
		login,
		register,
		logout,
	};

	return (
		<AppContext.Provider value={value}>
			{props.children}
		</AppContext.Provider>
	);
};