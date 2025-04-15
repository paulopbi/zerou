import React from "react";
import styles from "./BadgeStatus.module.css";

interface IBadgeStatus {
  status: string;
  children: React.ReactNode;
}

const BadgeStatus = ({ status, children }: IBadgeStatus) => {
  const normalizeStatusText = status.trim().toLowerCase();

  if (normalizeStatusText === "finalizado") {
    return (
      <div className={`badge-base ${styles.completed}`}>
        <span>{children}</span>
      </div>
    );
  }

  if (normalizeStatusText === "jogando") {
    return (
      <div className={`badge-base ${styles.playing}`}>
        <span>{children}</span>
      </div>
    );
  }

  if (normalizeStatusText === "na lista") {
    return (
      <div className={`badge-base ${styles.wishlist}`}>
        <span>{children}</span>
      </div>
    );
  }

  if (normalizeStatusText === "rejogando") {
    return (
      <div className={`badge-base ${styles.replaying}`}>
        <span>{children}</span>
      </div>
    );
  }

  if (normalizeStatusText === "não começei") {
    return (
      <div className={`badge-base ${styles.dontStarted}`}>
        <span>{children}</span>
      </div>
    );
  }
};

export default BadgeStatus;
