import "../index.css";
import {
  AiFillHeart,
  AiFillDelete,
  AiFillEdit,
  AiOutlineClose,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { FormEvent, useState, MouseEvent } from "react";
import axios from "axios";

interface Data {
  data: {
    id: number;
    author: string;
    content: string;
    likes: number;
    secret: string;
  };
}

interface Delete {
  secret: string;
  id: number;
}

const Question = ({ data }: Data) => {
  const [modal, setModal] = useState<boolean>(false);

  const [input, setInput] = useState<string>("");

  const [liked, setLiked] = useState<boolean>(false)

  const [likes, setLikes] = useState<number>(data.likes)

  const openModal = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    setModal(true);
  };

  const handleDelete = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input == data.secret) {
      const deleteUrl = "http://localhost:5000/api/question/" + data.id;
      await axios.delete(deleteUrl);
      setModal(false);
      window.location.reload();
    }
    setModal(false);
  };

  const handleLike = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault()
    if(!liked) {
      const likeUrl = "http://localhost:5000/api/question/like/" + data.id
      axios.put(likeUrl, {
        likes
      })
      setLiked(true)
      setLikes(likes + 1)
    }
  }

  return (
    <main>
      <div className="bg-gray-600 w-full rounded-3xl shadow-2xl px-3 py-5 mt-10 mr-60">
        <div className="flex flex-row justify-between">
          <div className="text-white px-10">
            <button onClick={(e) => handleLike(e)} className="font-bold text-4xl hover:scale-105 duration-300 ease-linear">
              <AiFillHeart />
            </button>

            <h1 className="font-bold text-3xl text-center">{likes}</h1>
          </div>

          <Link to={`/${data.id}`}>
            <button className="hover:scale-105 duration-300 ease-linear">
              <div className="flex justify-start flex-col px-10 mt-1">
                <h1 className="font-semibold text-3xl text-white">
                  {data.content}
                </h1>
                <h3 className="font-light text-xl text-gray-300">
                  {data.author}
                </h3>
              </div>
            </button>
          </Link>
          <div className="flex flex-row px-20 text-white font-bold text-5xl ">
            <Link to={`edit/${1}/${data.id}`}>
              <button className="hover:scale-105 duration-300 ease-linear mt-4">
                <AiFillEdit />
              </button>
            </Link>
            <button onClick={(e) => openModal(e)} className="hover:scale-105 duration-300 ease-linear">
              <AiFillDelete />
            </button>
          </div>
        </div>
      </div>
      <Modal open={modal} onClose={() => setModal(false)}>
        <form onSubmit={(e) => handleDelete(e)}>
          <h1 className="pb-4">Provide the secret to this answer:</h1>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
            type="text"
            className="w-full mr-10 text-black"
          />
          <button className="font-semibold text-white text-xl px-5 py-2 border-2 bg-gray-600 mt-8 rounded-full" type="submit">Submit</button>
        </form>
      </Modal>
    </main>
  );
};

interface ModalInput {
  open: boolean
  onClose:() => void 
  children: any
}

const Modal = ({ open, onClose, children }: ModalInput) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-gray-600 text-white rounded-3xl shadow-2xl w-[600px] text-2xl p-10">
        <button onClick={() => onClose()}>
          <AiOutlineClose className="text-3xl mb-5 hover:bg-gray-700 hover:rounded-full duration-300 "></AiOutlineClose>
        </button>
        <h1>{children}</h1>
      </div>
    </div>
  );
};

export default Question;
