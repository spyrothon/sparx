import * as React from "react";
import classNames from "classnames";
import { AriaListBoxOptions, useListBox, useListBoxSection, useOption } from "react-aria";
import type { ListState } from "react-stately";
import CheckboxCircleChecked from "@spyrothon/sparx-icons/dist/icons/CheckboxCircleChecked";

import type { Node } from "@react-types/shared";

import { Stack } from "../../Stack/Stack";
import { Text } from "../../Text/Text";

import styles from "./DropdownListBox.module.css";

interface ListBoxProps extends AriaListBoxOptions<unknown> {
  listBoxRef?: React.RefObject<HTMLUListElement>;
  state: ListState<unknown>;
}

export function DropdownListBox(props: ListBoxProps) {
  let ref = React.useRef<HTMLUListElement>(null);
  let { listBoxRef = ref, state } = props;
  let { listBoxProps } = useListBox(props, state, listBoxRef);

  return (
    <ul {...listBoxProps} ref={listBoxRef} className={styles.dropdown}>
      {[...state.collection].map((item) =>
        item.type === "section" ? (
          <ListBoxSection key={item.key} section={item} state={state} />
        ) : (
          <Option key={item.key} item={item} state={state} />
        ),
      )}
    </ul>
  );
}

interface ListBoxSectionProps {
  section: Node<unknown>;
  state: ListState<unknown>;
}

function ListBoxSection({ section, state }: ListBoxSectionProps) {
  let { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    "aria-label": section["aria-label"],
  });

  return (
    <li {...itemProps}>
      {section.rendered && <span {...headingProps}>{section.rendered}</span>}
      <ul {...groupProps}>
        {[...section.childNodes].map((node) => (
          <Option key={node.key} item={node} state={state} />
        ))}
      </ul>
    </li>
  );
}

interface ListBoxOptionProps {
  item: Node<unknown>;
  state: ListState<unknown>;
}

function Option({ item, state }: ListBoxOptionProps) {
  let ref = React.useRef<HTMLLIElement>(null);
  let { optionProps, isSelected, isFocused } = useOption(
    {
      key: item.key,
    },
    state,
    ref,
  );

  const content =
    typeof item.rendered === "string" ? (
      <Text className={styles.optionPlainText}>{item.rendered}</Text>
    ) : (
      item.rendered
    );

  return (
    <Stack
      as="li"
      direction="horizontal"
      align="center"
      justify="space-between"
      spacing="space-md"
      wrap={false}
      {...optionProps}
      ref={ref}
      className={classNames(styles.option, { [styles.itemHighlighted]: isFocused })}>
      {content}
      {isSelected && <CheckboxCircleChecked className={styles.optionCheck} size={20} />}
    </Stack>
  );
}
