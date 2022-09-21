import { Link, Row } from "@nextui-org/react";

export default function Footer() {
    return (
        <div style={{ textAlign: "center", padding: "2%" }}>
            <Row justify="center">
                Made with ❤️ by <Link>{" "}PyBash{" "}</Link> for the <Link>{" "}AWS Amplify{" "}</Link> x <Link>{" "}Hashnode{" "}</Link> hackathon.
            </Row>
        </div>
    )
}