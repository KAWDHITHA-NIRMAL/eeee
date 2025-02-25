// pages/index.js
import { useEffect, useState } from "react";
import { firestore } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

const PaperGallery = () => {
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    const fetchPapers = async () => {
      const querySnapshot = await getDocs(collection(firestore, "papers"));
      const papersData = querySnapshot.docs.map(doc => doc.data());
      setPapers(papersData);
    };
    fetchPapers();
  }, []);

  return (
    <div>
      <h1>Paper Gallery</h1>
      <div className="gallery">
        {papers.map((paper, index) => (
          <div key={index} className="paper-card">
            <h2>{paper.title}</h2>
            <p>{paper.author}</p>
            <p>{paper.description}</p>
            <a href={paper.fileUrl} target="_blank" rel="noopener noreferrer">
              View Paper
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaperGallery;
