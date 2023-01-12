import { Link, useParams } from "react-router-dom";
import CreateAnswer from "../components/CreateAnswer";
import CreateQuestion from "../components/CreateQuestion";

export default function CreatePage() {
  const { type } = useParams();

  return (
    <main className="min-h-screen min-w-full h-full bg-gray-800">
      <Link to={"/"}>
        <button className="font-semibold text-white text-xl px-5 py-2 border-2 bg-gray-600 ml-10 mt-8 rounded-full">
          Exit
        </button>
      </Link>

      <div className="flex flex-col justify-center items-center mt-36">
        {type == "1" ? (
          <div>
            <CreateQuestion />
          </div>
        ) : (
          <div>
            <CreateAnswer />
          </div>
        )}
      </div>
    </main>
  );
}
