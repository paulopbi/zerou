import React from "react";
import styles from "./BadgePlatform.module.css";

interface IBadgePlatform {
  platform: string;
  children: React.ReactNode;
}

const BadgePlatform = ({ children, platform }: IBadgePlatform) => {
  const normalizePlatformText = platform.trim().toLocaleLowerCase();

  if (normalizePlatformText === "xbox")
    return (
      <div className={`badge-base ${styles.xbox}`}>
        <span>{children}</span>
      </div>
    );

  if (normalizePlatformText === "playstation")
    return (
      <div className={`badge-base ${styles.playstation}`}>
        <span>{children}</span>
      </div>
    );

  if (normalizePlatformText === "nintendo")
    return (
      <div className={`badge-base ${styles.nintendo}`}>
        <span>{children}</span>
      </div>
    );

  if (normalizePlatformText === "pc")
    return (
      <div className={`badge-base ${styles.pc}`}>
        <span>{children}</span>
      </div>
    );
};

export default BadgePlatform;
