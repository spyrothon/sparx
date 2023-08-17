import * as React from "react";
import classNames from "classnames";
import { AriaTabListProps, useTab, useTabList, useTabPanel } from "react-aria";
import { Node, TabListState, useTabListState } from "react-stately";

import { animated, easings, useSpring } from "@react-spring/web";

import { Justification, Stack } from "../Stack/Stack";
import { useResolvedColorToken } from "../ThemeProvider/ThemeProvider";

import styles from "./Tabs.module.css";

const INDICATOR_SPRING_CONFIG = {
  tension: 200,
  friction: 20,
  clamp: true,
  easing: easings.easeOutQuad,
};

export interface TabsProps<Item extends object>
  extends Omit<AriaTabListProps<Item>, "onSelectionChange"> {
  justify?: Justification;
  className?: string;
  panelClassName?: string;
  onSelect?: (itemKey: string) => void;
}

export function Tabs<Item extends object>(props: TabsProps<Item>) {
  const { justify = "start", className, panelClassName, onSelect, ...stateProps } = props;

  const innerRef = React.useRef<HTMLDivElement>(null);
  const state = useTabListState({
    ...stateProps,
    onSelectionChange(key) {
      // React.Key can be a number, but we're restricting that to only strings
      // for simplicity.
      onSelect?.(key as string);
    },
  });
  const { tabListProps } = useTabList(stateProps, state, innerRef);

  return (
    <div className={classNames(styles.container, className)}>
      <Stack
        direction="horizontal"
        justify={justify}
        spacing="space-md"
        {...tabListProps}
        ref={innerRef}
        className={styles.tabList}>
        <TabIndicator state={state} containerRef={innerRef} />
        {[...state.collection].map((item) => (
          <Tab key={item.key} item={item} state={state} />
        ))}
      </Stack>
      <TabPanel key={state.selectedItem?.key} state={state} className={panelClassName} />
    </div>
  );
}

function TabIndicator<Item extends object>(props: {
  state: TabListState<Item>;
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  const { state, containerRef } = props;
  const key = state.selectedKey;

  const isInitial = React.useRef(true);
  const [indicatorPosition, setIndicatorPosition] = React.useState({
    x: 0,
    y: 0,
    endX: 0,
    endY: 0,
  });

  React.useEffect(() => {
    const container = containerRef.current;
    if (container == null) return;

    const element = container.querySelector<HTMLElement>(`[data-key="${key}"]`);
    if (element == null) return;

    setIndicatorPosition({
      x: element.offsetLeft,
      y: element.offsetTop,
      endX: element.offsetLeft + element.offsetWidth,
      endY: element.offsetTop + element.offsetHeight,
    });
  }, [containerRef, key]);

  const [{ x, y, width, height }] = useSpring(
    () => ({
      x: indicatorPosition.x,
      y: indicatorPosition.y,
      width: indicatorPosition.endX - indicatorPosition.x,
      height: indicatorPosition.endY - indicatorPosition.y,
      immediate: isInitial.current,
      config: INDICATOR_SPRING_CONFIG,
      onRest: () => (isInitial.current = false),
    }),
    [indicatorPosition],
  );

  return <animated.div className={styles.indicator} style={{ left: x, top: y, width, height }} />;
}

interface TabProps<Item extends object> {
  item: Node<Item>;
  state: TabListState<Item>;
}

function Tab<Item extends object>({ item, state }: TabProps<Item>) {
  let { key, rendered } = item;
  let ref = React.useRef<HTMLDivElement>(null);
  let { tabProps, isDisabled, isSelected } = useTab({ key }, state, ref);

  const resolvedColor = useResolvedColorToken(
    isSelected ? "ACCENT_FOREGROUND" : isDisabled ? "TEXT_SECONDARY" : "INTERACTIVE_NORMAL",
  ).rgba;

  const [{ color }] = useSpring(
    () => ({
      color: resolvedColor,
      config: INDICATOR_SPRING_CONFIG,
      delay: 80,
    }),
    [resolvedColor],
  );

  return (
    <animated.div {...tabProps} ref={ref} className={styles.tab} style={{ color }}>
      {rendered}
    </animated.div>
  );
}

interface TabPanelProps<Item extends object> {
  state: TabListState<Item>;
  className?: string;
}

function TabPanel<Item extends object>({ state, className }: TabPanelProps<Item>) {
  let panelRef = React.useRef<HTMLDivElement>(null);
  let { tabPanelProps } = useTabPanel({}, state, panelRef);

  return (
    <div {...tabPanelProps} ref={panelRef} className={classNames(styles.panel, className)}>
      {state.selectedItem?.props.children}
    </div>
  );
}
