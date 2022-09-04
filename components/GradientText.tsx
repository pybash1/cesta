import { Text } from "@nextui-org/react";

export default function GradientText() {
  return (
    <>
      <Text
        h1
        size={60}
        weight="bold"
        css={{
            textGradient: "45deg, $blue600 0%, $pink600 75%",
            textAlign: "center",
        }}
      >
        Learn.
        <br />
        Share.
        <br />
        Repeat.
      </Text>
    </>
  );
}
