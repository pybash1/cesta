import { Button } from "@nextui-org/react";
import { toPng } from "html-to-image";

export default function DownloadButton() {
    const downloadImage = (dataUrl: string) => {
        const a = document.createElement("a");
        a.setAttribute('download', 'flow.png');
        a.setAttribute('href', dataUrl);
        a.click();
    }

    const toImage = () => {
        toPng(document.querySelector('.react-flow') as HTMLElement).then(downloadImage)
    }

    return (
        <Button onClick={toImage}>Download Image</Button>
    )
}