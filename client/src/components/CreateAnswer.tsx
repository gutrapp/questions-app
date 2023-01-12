import axios from "axios";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Data {
  author: string;
  content: string;
  secret: string;
}

const CreateAnswer = () => {
  const { id, type} = useParams() 

  const [data, setData] = useState<Data>({
    author: "",
    content: "",
    secret: "",
  });

  const navigate = useNavigate()

  const handleChangeAuthor = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      author: e.target.value,
    });
  };

  const handleChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      content: e.target.value,
    });
  };

  const handleChangeSecret = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      secret: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/answer", {
      content: data.content,
      author: data.author,
      secret: data.secret,
      question_id: id
    })
    setData({
      content: "",
      author: "",
      secret: ""
    })
    navigate(`/${id}`)
  };

  return (
    <div className="border-2 rounded-3xl shadow-2xl bg-gray-600 border-white py-20">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-col text-start text-white text-2xl font-semibold px-20">
					<label>Name: </label>
          <input
            value={data.author}
            onChange={(e) => handleChangeAuthor(e)}
            required
            type="text"
            placeholder="Enter a name to me displayed"
						className="w-auto text-black text-xl"
          />

					<label className="mt-8">Answer: </label>
          <input
            value={data.content}
            onChange={(e) => handleChangeContent(e)}
            required
            type="text"
            placeholder="Enter your question here..."
						className="w-auto text-black text-xl"
          />

					<label className="mt-8">Secret: </label>
          <input
            value={data.secret}
            onChange={(e) => handleChangeSecret(e)}
            required
            type="password"
						className="w-96 text-black text-xl"
          />
        </div>
        <button className="font-semibold text-white text-xl px-5 py-2 border-2 bg-gray-600 ml-56 mt-8 rounded-full" type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateAnswer;
