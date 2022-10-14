declare module "*.png";
declare module "*.jpg";
declare module "*.gif";
declare module "*.svg";
declare module "*.mp4";
declare module "*.webm";

declare module "*.module.css" {
  const styles: { [className: string]: string };
  export default styles;
}

declare module "@iconscout/react-unicons/icons/*" {
  interface IconProps {
    color?: string;
    size?: string | number;
    className?: string;
  }

  export default function Icon(props: IconProps): JSX.Element;
}

declare module "@iconscout/react-unicons-solid/icons/*" {
  interface IconProps {
    color?: string;
    size?: string | number;
    className?: string;
  }

  export default function Icon(props: IconProps): JSX.Element;
}
