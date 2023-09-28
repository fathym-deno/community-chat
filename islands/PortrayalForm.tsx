import { JSX } from "preact";
import { FunctionDefinition } from "npm:@azure/openai@next";
import { useState } from 'preact/hooks';

interface PortrayalFormProps {
  options: FunctionDefinition[];

  regeneratePostSrc: string;
  savePostSrc: string;
}

export function PortrayalForm(props: PortrayalFormProps) {
  const [formState, setFormState] = useState('regenerate');
  const [selectedType, setSelectedType] = useState('');

  const toggleFormState = () => {
    setFormState(formState === 'regenerate' ? 'save' : 'regenerate');
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  return (
    <form
      id="portrayal-form"
      method="post"
      src={formState === 'regenerate' ? props.regeneratePostSrc : props.savePostSrc}
      class="my-3 rounded-md p-3 bg-blue-600 bg-opacity-10 border border-blue-500 border-opacity-40 flex flex-col"
    >
      {formState === 'regenerate' && (
        <>
          <select
            name="portrayal"
            className="block w-full rounded-sm border-gray-300 text-sm shadow-sm focus:z-10 dark:bg-slate-950 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 text-black mb-2"
            onChange={handleTypeChange}
          >
            {props.options.map(option => {
              return <option value={option.name}>{option.name}</option>;
            })}
          </select>

          <textarea
            name="command"
            placeholder="Enter command"
            className="block w-full rounded-sm border-gray-300 text-sm shadow-sm focus:z-10 dark:bg-slate-950 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 text-black mb-2"
          />

          <button
            type="button"
            className="flex items-center space-x-1 rounded-sm border border-blue-600 bg-blue-600 px-3 py-1.5 text-center text-xs font-medium text-white shadow-sm transition-all hover:border-blue-800 hover:bg-blue-800 focus:ring focus:ring-blue-200 disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300 mb-2"
          >
            Regenerate
          </button>
        </>
      )}

      {formState === 'save' && (
        <>
          <input
            type="hidden"
            name="type"
            value={selectedType}
          />

          <input
            type="hidden"
            name="details"
          />

          <div>
            <pre>{JSON.stringify({}, null, 2)}</pre>
          </div>

          <input
            type="text"
            name="lookup"
            placeholder="Enter lookup"
            className="block w-full rounded-sm border-gray-300 text-sm shadow-sm focus:z-10 dark:bg-slate-950 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 text-black mb-2"
          />

          <input
            type="text"
            name="name"
            placeholder="Enter name"
            className="block w-full rounded-sm border-gray-300 text-sm shadow-sm focus:z-10 dark:bg-slate-950 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 text-black mb-2"
          />

          <button
            type="submit"
            className="flex items-center space-x-1 rounded-sm border border-blue-600 bg-blue-600 px-3 py-1.5 text-center text-xs font-medium text-white shadow-sm transition-all hover:border-blue-800 hover:bg-blue-800 focus:ring focus:ring-blue-200 disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300"
          >
            Save
          </button>
        </>
      )}

      <button type="button" onClick={toggleFormState}>
        Switch to {formState === 'regenerate' ? 'Save' : 'Regenerate'} Form
      </button>
    </form>
  );
}
