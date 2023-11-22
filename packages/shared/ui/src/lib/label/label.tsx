export interface LabelProps {
    className?: string;
    label?: string;
    size?: "text-xs" |
        "text-sm" |
        "text-base" |
        "text-lg" |
        "text-xl" |
        "text-2xl" |
        "text-3xl" |
        "text-4xl" |
        "text-5xl" |
        "text-6xl" |
        "text-7xl" |
        "text-8xl" |
        "text-9xl";
    color?: "text-gray-700" |
        "text-red-700";
    weight?: "font-thin" |
        "font-extralight" |
        "font-light" |
        "font-normal" |
        "font-medium" |
        "font-semibold" |
        "font-bold" |
        "font-extrabold" |
        "font-black"
}

export function Label({
  className: classNameProps,
  label,
  size = "text-base",
  color = "text-gray-700",
  weight = "font-medium",
}: LabelProps) {

    let className= `${classNameProps} ${size} ${color} ${weight}`

  return (
    <p
      className={className}
    >
      {label}
    </p>
  );
}
