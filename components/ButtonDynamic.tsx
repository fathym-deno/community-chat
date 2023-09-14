import { JSX } from 'preact';
import { IS_BROWSER } from '$fresh/runtime.ts';

interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  twcolor?: string;
  twsize?: 'xs' | 'sm' | 'md' | 'lg';
  textcolor?: string;
  fontweight?: string;
  shadow?: string;
  highlight?: boolean;
  selected?: boolean;
  disabled?: boolean;
}

export default function ButtonDynamic({
  twcolor,
  twsize = 'sm',
  textcolor = 'white',
  fontweight = 'bold',
  shadow = 'sm',
  highlight,
  selected,
  disabled = false,
  children,
  ...props
}: ButtonProps): JSX.Element {
  const colorVary =
    twcolor == 'transparent'
      ? 'border-transparent bg-transparent'
      : twcolor == 'white'
      ? 'border-white bg-white'
      : `border-${twcolor}-500 bg-${twcolor}-500`;

  const colorDarkenModVary =
    twcolor == 'transparent'
      ? 'hover:border-black hover:border-opacity-0 hover:bg-black hover:bg-opacity-20 focus:bg-black focus:bg-opacity-25'
      : `hover:border-${twcolor}-700 hover:bg-${twcolor}-700 focus:ring-${twcolor}-200`;

  const colorHighlightModVary =
    twcolor == 'transparent'
      ? 'hover:border-white hover:border-opacity-0 hover:bg-white hover:bg-opacity-20 focus:bg-white focus:bg-opacity-25'
      : `hover:border-${twcolor}-400 hover:bg-${twcolor}-400 focus:ring-${twcolor}-200`;

  const colorDisabledVary = `disabled:border-${twcolor}-300 disabled:bg-${twcolor}-300`;

  const textColorVary = textcolor == 'white' ? 'text-white' : `text-${textcolor}-500`;

  const fontWeightVary = fontweight ? `font-${fontweight}` : 'font-medium';

  const shadowVary = shadow ? `shadow-${shadow}` : '';

  const sizeVariants = {
    xs: 'rounded-sm border',
    sm: 'rounded-sm border',
    md: 'rounded-md border',
    lg: 'rounded-lg border',
  };

  const padTextVariants = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  };

  return (
    <>
      <button
        {...props}
        className={`inline-flex items-center gap-1.5
          ${sizeVariants[twsize]}
          ${colorVary}
          ${padTextVariants[twsize]}
          text-center
          ${fontWeightVary}
          ${textColorVary}
          ${shadowVary}
          transition-all
          ${highlight ? colorHighlightModVary : colorDarkenModVary}
          ${selected ? '!bg-black !bg-opacity-40' : null}
          focus:ring cursor-pointer disabled:cursor-not-allowed
          ${colorDisabledVary}
        `}
        disabled={!IS_BROWSER || disabled}>
        {children}
      </button>
    </>
  );
}