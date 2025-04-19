import React from "react";
import "./BadgePlatform.css";

interface IBadgePlatform {
  platform: string;
  children: React.ReactNode;
}

const BadgePlatform = ({ children, platform }: IBadgePlatform) => {
  const normalizePlatformText = platform.trim().toLocaleLowerCase();
  if (normalizePlatformText === "pc")
    return (
      <div className="badge-base pc">
        <span>{children}</span>
      </div>
    );

  if (normalizePlatformText === "xbox")
    return (
      <div className="badge-base xbox">
        <span>{children}</span>
      </div>
    );

  if (normalizePlatformText === "playstation")
    return (
      <div className="badge-base playstation">
        <span>{children}</span>
      </div>
    );

  if (normalizePlatformText === "mobile")
    return (
      <div className="badge-base mobile">
        <span>{children}</span>
      </div>
    );

  if (normalizePlatformText === "nintendo")
    return (
      <div className="badge-base nintendo">
        <span>{children}</span>
      </div>
    );

  if (normalizePlatformText === "steam deck")
    return (
      <div className="badge-base steam-deck">
        <span>{children}</span>
      </div>
    );
};

export default BadgePlatform;
