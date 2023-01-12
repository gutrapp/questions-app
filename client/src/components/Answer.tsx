import axios from "axios";
import { useState, FormEvent, MouseEvent } from "react";
import {
  AiFillHeart,
  AiFillEdit,
  AiFillDelete,
  AiOutlineClose,
} from "react-icons/ai";
import { Link } from "react-router-dom";

interface Data {
  data: {
    id: number;
    author: string;
    content: string;
    likes: number;
    secret: string;
  };
}

const Answer = ({ data }: Data) => {
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
      const deleteUrl = "http://localhost:5000/api/answer/" + data.id;
      await axios.delete(deleteUrl);
      setModal(false);
      window.location.reload();
    }
    setModal(false);
  };

  const handleLike = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault()
    if(!liked) {
      const likeUrl = "http://localhost:5000/api/answer/like/" + data.id
      axios.put(likeUrl, {
        likes
      })
      setLiked(true)
      setLikes(likes + 1)
    }
  }

  return (
    <div className="bg-gray-600 w-full min-h-full break-all rounded-3xl shadow-2xl px-14 py-5">
      <div className="text-2xl font-bold flex flex-row justify-between text-white">
        <div className="flex flex-row">
          <button onClick={(e) => handleLike(e)} className="text-center mr-5">
            <AiFillHeart className="text-2xl"></AiFillHeart>
            <h1>{likes}</h1>
          </button>

          <div className="mb-2">
            <h1>{data.content}</h1>
            <h1 className="text-base font-semibold text-gray-300">
              {data.author}
            </h1>
          </div>
        </div>

        <div className="flex flex-row text-white font-bold text-4xl mt-3">
          <Link to={`/edit/${2}/${data.id}`}>
            <button className="hover:scale-105 duration-300 ease-linear">
              <AiFillEdit />
            </button>
          </Link>
          <div>
            <button
              onClick={(e) => openModal(e)}
              className="hover:scale-105 duration-300 ease-linear"
            >
              <AiFillDelete></AiFillDelete>
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
    </div>
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

export default Answer;
