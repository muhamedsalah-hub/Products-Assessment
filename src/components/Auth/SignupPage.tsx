import { useAuth } from "@/core/hooks/useLoginHook";
import { Ban, Loader2, User } from "lucide-react";
import { Link } from "react-router";

export const SignUp = () => {
  const { loading, register, handleSubmit, errors, onSubmit } = useAuth();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/*           Signup header          */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <User color="white" size={50} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create An Account
            </h1>
          </div>

          {/*             Signup Form            */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                {...register("username", { required: "Username is Required" })}
                className={`w-full px-4 py-3 border ${
                  errors.username
                    ? "border-red-300 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                } rounded-lg focus:ring-2 focus:border-transparent transition-colors duration-200`}
                placeholder="Enter your username"
                autoComplete="username"
              />
              {errors.username && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <Ban />
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", { required: "Password is Required" })}
                className={`w-full px-4 py-3 border ${
                  errors.password
                    ? "border-red-300 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                } rounded-lg focus:ring-2 focus:border-transparent transition-colors duration-200`}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <Ban />
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Loading.....
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
          {/*        Navigation to signup       */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Do you have an account?
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-800 text-sm transition-colors duration-200 inline-flex items-center gap-1"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
