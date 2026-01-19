import { createContext, useState, useEffect } from "react";

const TagContext = createContext();

export const TagProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);

  // Fetch all tags
  const fetchTags = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "https://major-project-3-backend.vercel.app/tags"
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch tags: ${res.status}`);
      }

      const data = await res.json();
      setTags(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error while fetching tags:", error);
      setTags([]);
    } finally {
      setLoading(false);
    }
  };

  //Add new tag 
  const addTag = async (tagData) => {
    try {
      setLoading(true);

      const res = await fetch(
        "https://major-project-3-backend.vercel.app/tags",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tagData),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to add tag");
      }

      const data = await res.json();

      // Handle both API response shapes
      const createdTag = data.tag || data;

      setTags((prev) => [...prev, createdTag]);

      return createdTag; 
    } catch (error) {
      console.error("Add tag failed:", error);
      throw error; 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <TagContext.Provider
      value={{
        loading,
        tags,
        fetchTags,
        addTag,
        setTags,
      }}
    >
      {children}
    </TagContext.Provider>
  );
};

export default TagContext;
