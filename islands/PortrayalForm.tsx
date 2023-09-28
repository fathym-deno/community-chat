import { JSX } from "preact";

interface PortrayalFormProps {
  postSrc: string;
}

export function PortrayalForm(props: PortrayalFormProps) {
  return (
    <form
      id="portrayal-form"
      method="post"
      src={props.postSrc}
      class="my-3 rounded-md p-3 bg-blue-600 bg-opacity-10 border border-blue-500 border-opacity-40"
    >
      <div className="relative z-0 flex">
        <select
          name="portrayal"
          className="block w-full rounded-sm rounded-r-none border-gray-300 text-sm shadow-sm focus:z-10 dark:bg-slate-950 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 text-black"
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>

        <button
          type="submit"
          for="version"
          className="flex items-center space-x-1 rounded-sm rounded-l-none border border-l-0 border-blue-600 bg-blue-600 px-3 py-1.5 text-center text-xs font-medium text-white shadow-sm transition-all hover:border-blue-800 hover:bg-blue-800 focus:ring focus:ring-blue-200 disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
