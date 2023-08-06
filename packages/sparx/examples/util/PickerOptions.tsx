import Check from "@spyrothon/sparx-icons/dist/icons/Check";
import ExclamationOctagon from "@spyrothon/sparx-icons/dist/icons/ExclamationOctagon";
import ExclamationTriangle from "@spyrothon/sparx-icons/dist/icons/ExclamationTriangle";

export const PICKER_OPTIONS = [
  {
    name: "Option One",
    value: "one",
    subtext: "Description for option one",
    icon: Check,
  },
  {
    name: "Option Two",
    value: "two",
    subtext: "Description for option two",
    icon: ExclamationTriangle,
  },
  {
    name: "Option Three",
    value: "three",
    subtext: "Description for option three",
    icon: ExclamationOctagon,
  },
];

export type PickerOption = (typeof PICKER_OPTIONS)[number];
