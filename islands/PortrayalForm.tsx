import { JSX } from 'preact';
import { FunctionDefinition } from 'npm:@azure/openai@next';
import { useState } from 'preact/hooks';
import { LoadingIcon } from '../build/iconset/icons/LoadingIcon.tsx';
import { PageBlockView } from '../components/portrayals/PageBlockView.tsx';
import { FunctionConfig, PageBlock } from '@fathym/synaptic';
import { loadHarborFunctions } from "../src/functions.config.ts";

interface PortrayalFormProps {
  convoLookup: string;

  functions: FunctionConfig[];

  regeneratePostSrc: string;

  savePostSrc: string;
}

export function PortrayalForm(props: PortrayalFormProps) {
  const [formState, setFormState] = useState('regenerate');
  const [command, setCommand] = useState('');
  const [loading, setLoading] = useState(false);
  const [portrayal, setPortrayal] = useState<PageBlock>({} as PageBlock);

  const toggleFormState = () => {
    setFormState(formState === 'regenerate' ? 'save' : 'regenerate');
  };

  // deno-lint-ignore no-explicit-any
  const handleTypeChange = (event: any) => {
    setPortrayal({
      ...portrayal,
      Type: event.target.value,
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
      Lookup: event.target.value,
    });
  };

  // deno-lint-ignore no-explicit-any
  const handleNameChange = (event: any) => {
    setPortrayal({
      ...portrayal,
      Name: event.target.value,
    });
  };

  const regenerate = () => {
    setLoading(true);

    fetch(props.regeneratePostSrc, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        command: command,
        portrayal: portrayal,
      }),
    })
      .then((resp) => {
        resp.json().then((p) => {
          setPortrayal(p);
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {!loading && (
        <>
          <form
            id="portrayal-form"
            method="post"
            action={formState === 'regenerate' ? undefined : props.savePostSrc}
            class="my-3 rounded-md p-3 bg-blue-600 bg-opacity-10 border border-blue-500 border-opacity-40 flex flex-col"
          >
            {formState === 'regenerate' && (
              <>
                <select
                  name="portrayal"
                  class="block w-full rounded-sm border-gray-300 text-sm shadow-sm focus:z-10 dark:bg-slate-950 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 text-black mb-2"
                  value={portrayal.Type}
                  onChange={handleTypeChange}
                >
                  <option>-- Choose --</option>
                  {props.functions.map((option) => {
                    return (
                      <option value={option.Definition.name}>
                        {option.Definition.name}
                      </option>
                    );
                  })}
                </select>

                <textarea
                  name="command"
                  placeholder="Enter command"
                  class="block w-full rounded-sm border-gray-300 text-sm shadow-sm focus:z-10 dark:bg-slate-950 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 text-black mb-2"
                  value={command}
                  onChange={handleCommandChange}
                />

                <button
                  type="button"
                  class="flex items-center space-x-1 rounded-sm border border-blue-600 bg-blue-600 px-3 py-1.5 text-center text-xs font-medium text-white shadow-sm transition-all hover:border-blue-800 hover:bg-blue-800 focus:ring focus:ring-blue-200 disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300 mb-2"
                  onClick={regenerate}
                  disabled={!portrayal.Type}
                >
                  Generate
                </button>
              </>
            )}

            {formState === 'save' && (
              <>
                <input type="hidden" name="type" value={portrayal.Type} />

                <input
                  type="hidden"
                  name="details"
                  value={JSON.stringify(portrayal.Details)}
                />

                <input
                  type="text"
                  name="lookup"
                  placeholder="Enter lookup"
                  class="block w-full rounded-sm border-gray-300 text-sm shadow-sm focus:z-10 dark:bg-slate-950 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 text-black mb-2"
                  value={portrayal.Lookup}
                  onChange={handleLookupChange}
                />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  class="block w-full rounded-sm border-gray-300 text-sm shadow-sm focus:z-10 dark:bg-slate-950 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 text-black mb-2"
                  value={portrayal.Name}
                  onChange={handleNameChange}
                />

                <button
                  type="submit"
                  class="flex items-center space-x-1 rounded-sm border border-blue-600 bg-blue-600 px-3 py-1.5 text-center text-xs font-medium text-white shadow-sm transition-all hover:border-blue-800 hover:bg-blue-800 focus:ring focus:ring-blue-200 disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300 mb-2"
                  disabled={
                    !portrayal.Type ||
                    !portrayal.Name ||
                    !portrayal.Lookup ||
                    !portrayal.Details
                  }
                >
                  Save
                </button>
              </>
            )}

            <button type="button" onClick={toggleFormState}>
              Switch to {formState === 'regenerate' ? 'Save' : 'Regenerate'}{' '}
              Form
            </button>
          </form>

          {portrayal.Details && <PageBlockView pageBlock={portrayal} functions={props.functions} />}
        </>
      )}

      {loading && (
        <LoadingIcon class="w-20 h-20 text-blue-500 animate-spin mx-auto my-auto" />
      )}
    </>
  );
}
