import { Container, Text } from "@nextui-org/react";

export default function NotFound() {
    return (
        <div>
            <Container display="flex" alignItems="center" justify="center" css={{ height: "100vh" }}>
                <Text h1 css={{ textGradient: "45deg, $red600 0%, $yellow600 50%, $pink600 75%" }}>Oops! The page you are looking for does not exist!</Text>
            </Container>
        </div>
    )
}