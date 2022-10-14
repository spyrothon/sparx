import * as React from "react";
import classNames from "classnames";

import styles from "./Card.module.css";

const NUM_LEVELS = 3;
const LEVEL_STYLES = {
  1: styles.level1,
  2: styles.level2,
  3: styles.level3,
};
export type CardLevel = keyof typeof LEVEL_STYLES;

export const CardLevelContext = React.createContext<CardLevel>(1 as CardLevel);

export interface CardProps {
  level?: CardLevel;
  children?: React.ReactNode;
  className?: string;
}

export function Card(props: CardProps) {
  const { level, children, className } = props;

  const contextLevel = React.useContext(CardLevelContext);

  const resolvedLevel = level != null ? level : contextLevel;

  return (
    <div className={classNames(styles.card, LEVEL_STYLES[resolvedLevel], className)}>
      <CardLevelContext.Provider value={((contextLevel + 1) % NUM_LEVELS) as CardLevel}>
        {children}
      </CardLevelContext.Provider>
    </div>
  );
}
