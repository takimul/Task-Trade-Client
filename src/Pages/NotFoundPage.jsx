import { Helmet } from "react-helmet";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found</title>
      </Helmet>
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-9xl font-extrabold tracking-widest text-gray-100">
            404
          </h1>
          <div className="bg-indigo-500 px-2 text-sm rounded rotate-12 inline-block mt-5">
            Page Not Found
          </div>
          <p className="text-gray-400 mt-5">
            Oops! The page you are looking for does not exist.
          </p>
          <p className="text-gray-400">
            You may have mistyped the address or the page has moved.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block bg-indigo-500 text-white font-bold px-5 py-3 rounded hover:bg-indigo-600 transition duration-300"
          >
            Go Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
