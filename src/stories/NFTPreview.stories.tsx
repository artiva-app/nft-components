import { NFTPreview, NFTPreviewProps } from "../nft-preview/NFTPreview";
import { Story, Meta } from "@storybook/react";
import { MediaConfiguration } from "../context/MediaConfiguration";
import { Networks } from "@artiva/nft-hooks";

export default {
  title: "Renderer/NFTPreview",
  component: NFTPreview,
} as Meta;

const Template: Story<NFTPreviewProps> = (args) => (
  <MediaConfiguration networkId={Networks.POLYGON}>
    <NFTPreview {...args} />
  </MediaConfiguration>
);

export const Image = Template.bind({});
Image.args = {
  contract: "0x24AD61B1D5e0f3345339400B82b60CF1621Bf5f0",
  edition: true,
};

export const Video = Template.bind({});
Video.args = {
  id: "2411",
};

export const GIF = Template.bind({});
GIF.args = {
  id: "2671",
};

export const Audio = Template.bind({});
Audio.args = {
  id: "2563",
};

export const Text = Template.bind({});
Text.args = {
  id: "3079",
};

export const NonZoraImage = Template.bind({});
NonZoraImage.args = {
  id: "5683",
  contract: "0xb7f7f6c52f2e2fdb1963eab30438024864c313f6",
};
