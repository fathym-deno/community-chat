import { render } from '$gfm';

interface BasicReportPortrayalProps {
  abstract: string;

  content: string;

  title: number;
}

export function BasicReportPortrayal(props: BasicReportPortrayalProps) {
  const contentMdx = render(props.content);

  return (
    <div class="justify-center content-center bg-slate-100 dark:bg-slate-900 justify-center content-center">
      <div class="text-lg font-bold text-slate-700 dark:text-white justify-center content-center">
        {props.title}
      </div>
      <div class="text-sm font-light text-slate-800 dark:text-white">
        {props.abstract}
      </div>
      <div
        class="p-3 pb-6 text-sm font-light"
        dangerouslySetInnerHTML={{ __html: contentMdx }}
      ></div>
    </div>
  );
}
