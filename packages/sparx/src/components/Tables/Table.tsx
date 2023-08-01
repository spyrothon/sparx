import * as React from "react";
import classNames from "classnames";

import styles from "./Table.module.css";

export type TableSpacing = "cozy" | "compact";

export interface TableProps extends React.PropsWithChildren {
  spacing?: TableSpacing;
  className?: string;
}

export function Table(props: TableProps) {
  const { spacing = "cozy", className, children } = props;
  return <table className={classNames(styles.table, styles[spacing], className)}>{children}</table>;
}

export interface TableHeaderRowProps extends React.PropsWithChildren {
  className?: string;
}

function TableHeaderRow(props: TableHeaderRowProps) {
  const { className, children } = props;
  return <tr className={classNames(styles.headerRow, className)}>{children}</tr>;
}

export interface TableHeadingProps extends React.PropsWithChildren {
  className?: string;
}

function TableHeading(props: TableHeadingProps) {
  const { className, children } = props;
  return <th className={classNames(styles.heading, className)}>{children}</th>;
}

export interface TableRowProps extends React.PropsWithChildren {
  className?: string;
}

function TableRow(props: TableRowProps) {
  const { className, children } = props;
  return <tr className={classNames(styles.row, className)}>{children}</tr>;
}

export interface TableCellProps extends React.PropsWithChildren {
  className?: string;
}

function TableCell(props: TableCellProps) {
  const { className, children } = props;
  return <td className={classNames(styles.cell, className)}>{children}</td>;
}

Table.Heading = TableHeading;
Table.HeaderRow = TableHeaderRow;
Table.Cell = TableCell;
Table.Row = TableRow;
