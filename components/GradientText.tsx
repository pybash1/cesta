import { Text } from "@nextui-org/react";

export default function GradientText() {
  return (
    <>
      <Text
        h1
        size={120}
        
        weight="bold"
        css={{
            textGradient: "45deg, $blue600 0%, $pink600 75%",
            textAlign: "center",
            lineHeight: "1.1",
            marginBottom: "2.5rem",
        }}
      >
        Learn.
        
        Share.
        <br />
        Repeat.
      </Text>
    </>
  );
}
