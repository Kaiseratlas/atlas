import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./CountryCard.module.scss";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

interface CountryCardProps {
  country: any;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const flag = new Image();
    flag.src = country.flagUrl;
    flag.onload = () => setLoading(true);
  }, []);

  const handleClick = () =>
    router.push(`/countries/${country.tag.toLowerCase()}`);

  return (
    <div className={styles["country-card"]}>
      <div
        className={classNames(styles["country-card__flag"], {
          ["bp3-skeleton"]: !loading,
        })}
        style={{ backgroundImage: `url(${country.flagUrl})` }}
        onClick={handleClick}
      />
      <div
        className={classNames(
          styles["country-card__title"],
          "bp3-running-text"
        )}
        onClick={handleClick}
      >
        {country.name}
      </div>
    </div>
  );
};

export default CountryCard;
