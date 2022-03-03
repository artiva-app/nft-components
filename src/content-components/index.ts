import { AudioImage } from "./AudioImage";
import { Audio } from "./Audio";
import { HTML } from "./HTML";
import { Image } from "./Image";
import { Model } from "./Model";
import { Text } from "./Text";
import { Unknown } from "./Unknown";
import { Video } from "./Video";

export const MediaRendererDefaults = [
  Model,
  Audio,
  AudioImage,
  Text,
  HTML,
  Image,
  Video,
  Unknown,
];

export { Text, HTML, Image, Video, Audio, AudioImage, Model, Unknown };
