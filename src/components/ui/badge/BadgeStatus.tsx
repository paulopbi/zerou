import React from "react";
import "./BadgeStatus.css";

interface IBadgeStatus {
  status: string;
  children: React.ReactNode;
}

const BadgeStatus = ({ status, children }: IBadgeStatus) => {
  const normalizeStatusText = status.trim().toLowerCase();

  if (normalizeStatusText === "completed") {
    return (
      <div className="badge-base completed">
        <span>{children}</span>
      </div>
    );
  }

  if (normalizeStatusText === "playing") {
    return (
      <div className="badge-base playing">
        <span>{children}</span>
      </div>
    );
  }

  if (normalizeStatusText === "wishlist") {
    return (
      <div className="badge-base wishlist">
        <span>{children}</span>
      </div>
    );
  }

  if (normalizeStatusText === "replaying") {
    return (
      <div className="badge-base replaying">
        <span>{children}</span>
      </div>
    );
  }

  if (normalizeStatusText === "dont started") {
    return (
      <div className="badge-base dont-started">
        <span>{children}</span>
      </div>
    );
  }
};

export default BadgeStatus;
