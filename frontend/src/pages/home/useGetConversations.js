import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const token = localStorage.getItem("token");

				if (!token) {
					toast.error("No token found. Please log in.");
					setLoading(false);
					return;
				}

				const res = await fetch("https://sociality-backend-api.onrender.com/users", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${token}`,
					},
					credentials: "include", // ✅ Include cookies
				});

				if (!res.ok) {
					const errorData = await res.json();
					throw new Error(errorData.error || "Failed to fetch conversations");
				}

				const data = await res.json();
				setConversations(data || []);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};

export default useGetConversations;
