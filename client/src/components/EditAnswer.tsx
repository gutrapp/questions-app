import axios from "axios";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Data {
  content: string;
  secret: string;
  question_id: number;
}

interface Input {
  secret: string;
  content: string;
}

const EditAnswer = () => {
  const { id, type } = useParams();

  const [data, setData] = useState<Data>({
    content: "",
    secret: "",
    question_id: 0,
  });

  const [input, setInput] = useState<Input>({
    secret: "",
    content: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updateUrl = "http://localhost:5000/api/answer/edit/" + id;
    if (input.secret == data.secret) {
      await axios.put(updateUrl, {
        content: input.content,
      });
      navigate(`/${data.question_id}`);
    }
  };

  useEffect(() => {
    async function getAnswer() {
      const getUrl = "http://localhost:5000/api/answer/" + id;
      await axios.get(getUrl).then((response) => {
        setData({
          content: response.data.content,
          secret: response.data.secret,
          question_id: response.data.question_id
        });
        setInput({
          ...input,
          content: response.data.content,
        });
      });
    }
    getAnswer();
  }, []);

  return (
    <div className="border-2 rounded-3xl shadow-2xl bg-gray-600 border-white py-20">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-col text-start text-white text-2xl font-semibold px-20">
          <label className="mt-8">New Answer: </label>
          <input
            value={input.content}
            onChange={(e) => setInput({ ...input, content: e.target.value })}
            required
            type="text"
            placeholder="Enter your question here..."
            className="w-auto text-black text-xl"
          />

          <label className="mt-8">Answer Secret: </label>
          <input
            value={input.secret}
            onChange={(e) => setInput({ ...input, secret: e.target.value })}
            required
            type="text"
            placeholder="Enter your question here..."
            className="w-auto text-black text-xl"
          />
        </div>
        <div className="pr-56">
          <button
            className="font-semibold text-white text-xl px-5 py-2 border-2 bg-gray-600 ml-56 mt-8 rounded-full"
            type="submit"
          >
            Change
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAnswer;
