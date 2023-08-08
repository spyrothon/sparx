import * as React from "react";
import classNames from "classnames";

import { Box, BoxProps } from "../Box/Box";

import styles from "./Card.module.css";

function getBoxProps(level: number, floating: boolean): BoxProps {
  if (floating) {
    return {
      background: "floating",
      border: "subtle",
      radius: "medium",
      elevation: "medium",
    };
  }

  switch (level) {
    case 1:
      return {
        background: "secondary",
        border: "none",
        radius: "medium",
      };
    case 2:
      return {
        background: "tertiary",
        border: "none",
        radius: "medium",
      };
    case 3:
      return {
        background: "floating",
        border: "none",
        radius: "medium",
      };
    default:
      return {
        background: "none",
        border: "subtle",
        radius: "medium",
      };
  }
}

function getCardSpacing(level: number, floating: boolean) {
  if (!floating && level > 3) return styles["spacing-small"];
  return styles["spacing-normal"];
}

export const CardLevelContext = React.createContext<number>(1);

export interface CardProps {
  level?: 1 | 2 | 3;
  floating?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(props, ref) {
  const { level, floating = false, children, className } = props;

  const contextLevel = React.useContext(CardLevelContext);
  const resolvedLevel = level ?? contextLevel;

  return (
    <Box
      ref={ref}
      {...getBoxProps(resolvedLevel, floating)}
      className={classNames(styles.card, className, getCardSpacing(resolvedLevel, floating))}>
      <CardLevelContext.Provider value={resolvedLevel + 1}>{children}</CardLevelContext.Provider>
    </Box>
  );
});
