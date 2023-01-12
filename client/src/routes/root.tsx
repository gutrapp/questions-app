import { useEffect, useState } from "react";
import Question from "../components/Question";
import { Link } from "react-router-dom"
import "../index.css";
import axios from "axios";

interface Data {
  id: number;
  author: string;
  content: string;
  likes: number;
  secret: string
}

interface Form {
  author: string;
  content: string;
}

export default function Root() {
  const [questions, setQuestions] = useState<Data[]>([]);

  useEffect(() => {
    async function getQuestions() {
      await axios.get("http://localhost:5000/api/question")
        .then((response) => {
          setQuestions(response.data)
        })
    }
    getQuestions();
  }, []);

  return (
    <main className="min-h-screen min-w-full h-full bg-gray-800 pb-20">
			<div>
				<Link to={`create/${1}/${1}`}><button className="font-semibold text-white text-xl px-5 py-2 border-2 bg-gray-600 ml-10 mt-8 rounded-full">Create Question</button></Link>
			</div>
      <div>
        {questions.map((question, index) => {
          return (
            <div className="flex flex-col mr-32 ml-32" key={index}>
              <Question data={question} />
            </div>
          );
        })}
      </div>
    </main>
  );
}


