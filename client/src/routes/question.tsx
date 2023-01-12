import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Answer from "../components/Answer";
import { FaUserAlt } from "react-icons/fa"

interface Question {
  id: number;
  author: string;
  content: string;
}

interface Answer {
  id: number;
  author: string;
  content: string;
  likes: number;
  secret: string
}

export default function QuestionPage() {
  const { id } = useParams();

  const [question, setQuestion] = useState<Question>({
    author: "",
    content: "",
    id: 0,
  });

  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    const questionUrl = "http://localhost:5000/api/question/" + id;
    const answerUrl = "http://localhost:5000/api/answer/question/" + id;

    async function getQuestion() {
      await axios.get(questionUrl).then((response) => {
        setQuestion(response.data[0]);
      });
    }
    getQuestion();

    async function getAnswers() {
      await axios.get(answerUrl).then((response) => {
        setAnswers(response.data);
      });
    }
    getAnswers();
  }, []);

  return (
    <div>
      <div className="pb-20 min-h-screen min-w-full h-full bg-gray-800">
        <Link to={"/"}>
          <button className="font-semibold text-white text-xl px-5 py-2 border-2 bg-gray-600 ml-10 mt-8 rounded-full">
            Exit
          </button>
        </Link>

        <main className="ml-36 mr-52 pt-14">
          <div className="bg-gray-600 w-full rounded-3xl shadow-2xl px-14 py-5 ml-92">
            <div className="text-4xl font-bold text-white flex justify-between">
              <div>
                <h1>{question.content}</h1>
                <h1 className="text-2xl font-semibold text-gray-300">
                  {question.author}
                </h1>
              </div>

              <div>
                <Link to={`/create/${2}/${question.id}`}>
                  <button className="font-semibold text-white text-xl px-5 py-2 border-2 bg-gray-600 ml-10 mt-3 rounded-full">
                    Answer
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {answers.map((answer, index) => {
            return (
              <div className="mt-10" key={index}>
                <Answer data={answer}/>
              </div>
            );  
          })}
        </main>
      </div>
    </div>
  );
}

