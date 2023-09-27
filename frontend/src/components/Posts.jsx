import React, { useState, useEffect } from "react";

export default function PostsComponent() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="text-cyan-400">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-4">
      <h1 className="text-3xl mb-4">List of Posts</h1>
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-neutral-900 p-4 rounded-lg shadow-lg mb-4"
        >
          <h2 className="text-2xl">{post.title}</h2>
          <p className="text-lg">{post.content}</p>
        </div>
      ))}
    </div>
  );
}
