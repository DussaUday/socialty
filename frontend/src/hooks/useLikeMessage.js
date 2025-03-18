import useConversation from "../zustand/useConversation";

const useLikeMessage = () => {
	const { messages, setMessages } = useConversation();

	const likeMessage = async (messageId) => {
		try {
			await fetch(`https://sociality-backend-api.onrender.com/messages/like/${messageId}`, { method: "POST" });
			setMessages(
				messages.map((msg) =>
					msg._id === messageId ? { ...msg, isLiked: true } : msg
				)
			);
		} catch (error) {
			console.error("Error liking message", error);
		}
	};

	return { likeMessage };
};

export default useLikeMessage;
