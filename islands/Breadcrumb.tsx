import DropDown from "./DropDownButton.jsx";

interface User {
  name: string;
  email: string;
}

export default function Breadcrumb() {
  const user: User = {
    name: "Matthew Smith",
    email: "matthew.smith@fathym.com",
  };

  return (
    <>
      {
        /* <nav aria-label="breadcrumb">
        <ol class="inline-flex items-center space-x-2 px-2 py-1 text-sm font-medium">
          <li class="hidden md:inline-flex items-center">
            <a
              href="#"
              class="text-secondary-500 dark:text-blue-300 hover:text-secondary-600 dark:hover:text-blue-200"
            >
              My Enterprise
            </a>
          </li>
          <li class="hidden md:inline-flex items-center space-x-2">
            <svg
              class="h-6 w-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              >
              </path>
            </svg>
            <a
              href="#"
              class="text-secondary-500 dark:text-blue-300 hover:text-secondary-600 dark:hover:text-blue-200"
            >
              Project AwesomeSauce
            </a>
            <DropDown user={user.name} email={user.email} />
          </li>
          <li
            class="inline-flex items-center space-x-2"
            aria-current="page"
          >
            <svg
              class="rotate-180 md:rotate-0 h-6 w-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              >
              </path>
            </svg>
            <a
              class="text-secondary-700 dark:text-blue-200 hover:text-secondary-600 dark:hover:text-blue-100"
              href="#"
            >
              AppSmooth
            </a>
          </li>
        </ol>
      </nav> */
      }
    </>
  );
}
