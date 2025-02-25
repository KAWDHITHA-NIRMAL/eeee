// pages/admin.js
import { useState } from "react";
import { auth, firestore, storage } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const AdminPanel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [paper, setPaper] = useState({
    title: "",
    author: "",
    description: "",
    file: null,
  });
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleFileUpload = async () => {
    const fileRef = ref(storage, `papers/${paper.file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, paper.file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Track progress if needed
      },
      (error) => {
        console.error("Error uploading file:", error);
      },
      async () => {
        const fileUrl = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(collection(firestore, "papers"), {
          title: paper.title,
          author: paper.author,
          description: paper.description,
          fileUrl,
        });
        alert("Paper added successfully!");
      }
    );
  };

  return (
    <div>
      {!user ? (
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <h2>Admin Panel</h2>
          <input
            type="text"
            placeholder="Title"
            value={paper.title}
            onChange={(e) => setPaper({ ...paper, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Author"
            value={paper.author}
            onChange={(e) => setPaper({ ...paper, author: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={paper.description}
            onChange={(e) => setPaper({ ...paper, description: e.target.value })}
          />
          <input
            type="file"
            onChange={(e) => setPaper({ ...paper, file: e.target.files[0] })}
          />
          <button onClick={handleFileUpload}>Upload Paper</button>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
