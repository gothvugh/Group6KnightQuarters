import { useState } from "react";
import { Home, PlusCircle, Mail, User } from "lucide-react";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen p-4 bg-white">
      <header className="flex justify-center py-4 border-b">
        <h1 className="text-xl font-bold text-yellow-600">KQ</h1>
      </header>
      <main className="flex-1 p-4">
        <CreatePostPage />
      </main>
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t py-3 flex justify-around">
        <Home className="text-gray-600" />
        <PlusCircle className="text-gray-600" />
        <Mail className="text-gray-600" />
        <User className="text-gray-600" />
      </footer>
    </div>
  );
}

function CreatePostPage() {
  const [postContent, setPostContent] = useState("");

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <button className="text-gray-600">Cancel</button>
        <h2 className="text-2xl font-semibold">Create Post</h2>
        <button className="bg-yellow-500 text-white px-4 py-1 rounded">Post</button>
      </div>
      <div className="border p-4 rounded-lg bg-gray-100 flex-1">
        <textarea
          className="w-full h-40 bg-transparent outline-none resize-none"
          placeholder="What's on your mind?"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
      </div>
      <div className="text-right text-gray-500 mt-2">Save Draft</div>
    </div>
  );
}
