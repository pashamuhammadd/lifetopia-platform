import {
  createDocsSocialImage,
  docsSocialImageSize,
} from "../lib/createDocsSocialImage";

export const alt =
  "Lifetopia Docs — Official Lifetopia World Documentation";

export const size = docsSocialImageSize;

export const contentType = "image/png";

export default function OpenGraphImage() {
  return createDocsSocialImage();
}