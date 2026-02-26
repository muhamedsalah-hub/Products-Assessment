import { Link } from "react-router";

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-900 mb-4">404</h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Back to Home
          </Link>
        </div>

        <div className="mt-12">
          <p className="text-sm text-gray-500">
            Need help? Contact our support team or visit our help center.
          </p>
        </div>
      </div>
    </div>
  );
};
