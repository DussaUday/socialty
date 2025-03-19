import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);
    const { pinnedConversations, mutedConversations, archivedConversations } = useConversation();

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("token");  // Retrieve token
				const res = await fetch("https://sociality-backend-api.onrender.com/messages", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${token}`,  // Include token in the header
					},
				});

                // Sort conversations by last message timestamp
                const sortedConversations = data.sort((a, b) => 
                    new Date(b.lastMessageTimestamp) - new Date(a.lastMessageTimestamp)
                );

                // Apply pinned, muted, and archived logic
                const processedConversations = sortedConversations.map((conversation) => ({
                    ...conversation,
                    isPinned: pinnedConversations.includes(conversation._id),
                    isMuted: mutedConversations.includes(conversation._id),
                    isArchived: archivedConversations.includes(conversation._id),
                }));

                setConversations(processedConversations);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getConversations();
    }, [pinnedConversations, mutedConversations, archivedConversations]);

    return { loading, conversations, setConversations };
};

export default useGetConversations;
