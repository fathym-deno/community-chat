interface BulletListPortrayalProps {
  abstract: string;

  bullets: string[];

  title: string;
}

export function BulletListPortrayal(props: BulletListPortrayalProps) {
  return (
    <div class="justify-center content-center bg-slate-100 dark:bg-slate-900 justify-center content-center">
      <div class="text-md font-bold text-slate-700 dark:text-white justify-center content-center">
        {props.title}
      </div>
      <div class="text-sm font-light text-slate-800 dark:text-white">
        {props.abstract}
      </div>
      <div class="p-2">
        <ul>
          {props.bullets.map((bulletPoint, index) => (
            <li key={index}>
              {/* <div class="text-md mb-1">{bulletPoint.title}</div> */}
              <div class="text-xs font-light pl-2 mb-2">
                {bulletPoint}
                {/* {bulletPoint.content} */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
