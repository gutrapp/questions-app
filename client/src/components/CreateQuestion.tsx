import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Data {
  author: string;
  content: string;
  secret: string;
}

const CreateQuestion = () => {
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>, data: Data ) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/question", {
      content: data.content,
      author: data.author,
      secret: data.secret
    })
    setData({
      content: "",
      author: "",
      secret: ""
    })
    navigate("/")
  };

  return (
    <div className="border-2 rounded-3xl shadow-2xl bg-gray-600 border-white py-20">
      <form onSubmit={(e) => handleSubmit(e, data)}>
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

					<label className="mt-8">Question: </label>
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
        <button className="ml-56 font-semibold text-white text-xl px-5 py-2 border-2 bg-gray-600 mt-8 rounded-full" type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateQuestion;
