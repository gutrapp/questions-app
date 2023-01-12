import { Link, useParams } from "react-router-dom";
import EditAnswer from "../components/EditAnswer";
import EditQuestion from "../components/EditQuestion";

export default function EditPage() {
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
            <EditQuestion />
          </div>
        ) : (
          <div>
            <EditAnswer />
          </div>
        )}
      </div>
    </main>
  );
}
