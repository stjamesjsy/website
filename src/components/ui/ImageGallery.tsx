import { ImageGallery as ReactImageGallery } from "react-image-grid-gallery";
import "react-image-grid-gallery/style.css";

interface Props {
    items: Image[];
}

export interface Image {
    id: string;
    alt: string;
    src: string;
}

export function ImageGallery({ items }: Props) {
    return (
        <ReactImageGallery imagesData={items} />
    )
}