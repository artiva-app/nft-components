import type { ThemeType } from "../context/MediaContext";

export enum RenderingPreference {
  INVALID = -1,
  FALLBACK = 0,
  LOW = 1,
  NORMAL = 2,
  PREFERRED = 3,
  PRIORITY = 4,
}

export type MediaUriType = {
  uri: string;
  type?: string;
};

export type RenderRequest = {
  media: {
    // from zora content uri
    content?: MediaUriType;
    image?: MediaUriType;
    // from metadata.animation_url
    animation?: MediaUriType;
  };
  metadata: any;
  renderingContext: "PREVIEW" | "FULL";
  contract?: string;
  tokenId?: string;
<<<<<<< HEAD
  chainId?: string;
=======
  networkId?: string;
>>>>>>> 1a35d9ee22c6030e3a915fc8f7868dba2bfc8f90
};

export type RenderComponentType = {
  request: RenderRequest;
  // TODO(iain): Fix types
  getString: any;
  getStyles: any;
  theme: ThemeType["theme"];
  a11yIdPrefix?: string;
};

export interface RendererConfig {
  getRenderingPreference(request: RenderRequest): RenderingPreference;
  render: React.FunctionComponent<RenderComponentType>;
}
