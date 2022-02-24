import React from "react";
import "./Avatar.css";

export type AvatarProps = {
  src?: string;
  alt?: string;
};

const Avatar: React.FC<AvatarProps> = ({ src = "", alt = "" }) => {
  return <img src={src} alt={alt} />;
};

export default React.memo(Avatar);
