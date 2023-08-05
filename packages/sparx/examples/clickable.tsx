import * as React from "react";

import { Clickable, Text } from "../dist";

export default function Component() {
  const [clicked, setClicked] = React.useState(false);

  return (
    <Clickable onPress={() => setClicked(!clicked)}>
      <Text>
        This card is clickable. Click anywhere within it with a mouse or a keyboard to toggle the
        clicked state.
      </Text>
      {clicked ? (
        <Text variant="text-md/success">The card has been clicked.</Text>
      ) : (
        <Text variant="text-md/secondary">The card is not clicked.</Text>
      )}
    </Clickable>
  );
}
