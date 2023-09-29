import { JSX } from "preact";
import { FunctionDefinition } from "npm:@azure/openai@next";
import { useState } from 'preact/hooks';
import { Portrayal } from "../src/PortrayalManager.ts";
import { LoadingIcon } from "../build/iconset/icons/LoadingIcon.tsx";

interface PortrayalFormProps {
  convoLookup: string;

  options: FunctionDefinition[];

  regeneratePostSrc: string;

  savePostSrc: string;
}

export function PortrayalForm(props: PortrayalFormProps) {
  const [formState, setFormState] = useState('regenerate');
  const [command, setCommand] = useState('');
  const [loading, setLoading] = useState(false);
  const [portrayal, setPortrayal] = useState<Portrayal>({} as Portrayal);

  const toggleFormState = () => {
    setFormState(formState === 'regenerate' ? 'save' : 'regenerate');
  };

  // deno-lint-ignore no-explicit-any
  const handleTypeChange = (event: any) => {
    setPortrayal({
      ...portrayal,
      type: event.target.value
    });
  };

  // deno-lint-ignore no-explicit-any
  const handleCommandChange = (event: any) => {
    setCommand(event.target.value);
  };

  // deno-lint-ignore no-explicit-any
  const handleLookupChange = (event: any) => {
    setPortrayal({
      ...portrayal,
      lookup: event.target.value
    });
  };

  // deno-lint-ignore no-explicit-any
  const handleNameChange = (event: any) => {
    setPortrayal({
      ...portrayal,
      name: event.target.value
    });
  };

  // deno-lint-ignore no-explicit-any
  const regenerate = () => {
    setLoading(true);

    fetch(props.regeneratePostSrc, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        command: command,
        portrayal: portrayal
      })
    }).then(resp => {
      resp.json().then(p => {
        console.log(p);

        setPortrayal(p);
      });
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <>
      {!loading && <>
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
                value={portrayal.type}
                onChange={handleTypeChange}
              >
                <option>-- Choose --</option>
                {props.options.map(option => {
                  return <option value={option.name}>{option.name}</option>;
                })}
              </select>

              <textarea
                name="command"
                placeholder="Enter command"
                className="block w-full rounded-sm border-gray-300 text-sm shadow-sm focus:z-10 dark:bg-slate-950 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 text-black mb-2"
                value={command}
                onChange={handleCommandChange}
              />

              <button
                type="button"
                className="flex items-center space-x-1 rounded-sm border border-blue-600 bg-blue-600 px-3 py-1.5 text-center text-xs font-medium text-white shadow-sm transition-all hover:border-blue-800 hover:bg-blue-800 focus:ring focus:ring-blue-200 disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300 mb-2"
                onClick={regenerate}
                disabled={!portrayal.type}
              >
                Generate
              </button>
            </>
          )}

          {formState === 'save' && (
            <>
              <input
                type="hidden"
                name="type"
                value={portrayal.type}
              />

              <input
                type="hidden"
                name="details"
                value={JSON.stringify(portrayal.details)}
              />

              <input
                type="text"
                name="lookup"
                placeholder="Enter lookup"
                className="block w-full rounded-sm border-gray-300 text-sm shadow-sm focus:z-10 dark:bg-slate-950 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 text-black mb-2"
                value={(portrayal.lookup)}
                onChange={handleLookupChange}
              />

              <input
                type="text"
                name="name"
                placeholder="Enter name"
                className="block w-full rounded-sm border-gray-300 text-sm shadow-sm focus:z-10 dark:bg-slate-950 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 text-black mb-2"
                value={(portrayal.name)}
                onChange={handleNameChange}
              />

              <button
                type="submit"
                className="flex items-center space-x-1 rounded-sm border border-blue-600 bg-blue-600 px-3 py-1.5 text-center text-xs font-medium text-white shadow-sm transition-all hover:border-blue-800 hover:bg-blue-800 focus:ring focus:ring-blue-200 disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300 mb-2"
              >
                Save
              </button>
            </>
          )}

          <button type="button" onClick={toggleFormState}>
            Switch to {formState === 'regenerate' ? 'Save' : 'Regenerate'} Form
          </button>
        </form>

        <div class="mb-2">
          <pre>{JSON.stringify(portrayal.details, null, 2)}</pre>
        </div>
      </>}

      {loading && <LoadingIcon class="w-20 h-20 text-blue-500 animate-spin mx-auto my-auto" />}
    </>
  );
}
