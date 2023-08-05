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
