import React, { useContext, createContext } from "react";
import {
  NetworkIDs,
  Networks,
  NFTFetchConfiguration,
} from "@zoralabs/nft-hooks";
import { merge } from "merge-anything";

import { Strings } from "../constants/strings";
import { Style } from "../constants/style";
import { ThemePresetNames, THEME_PRESETS } from "../constants/style-presets";
import {
  DefaultMediaRenderers,
  MediaRenderersType,
} from "../content-components";

export type ThemeType = typeof Style;

export type MediaContextType = {
  mediaRenderers: MediaRenderersType;
  style: ThemeType;
  networkId: NetworkIDs;
  strings: typeof Strings;
};

export const MediaContext = createContext<MediaContextType>({
  mediaRenderers: DefaultMediaRenderers,
  networkId: Networks.MAINNET,
  style: Style,
  strings: Strings,
});

type MediaContextConfigurationProps = {
  /**
   * NetworkID to set. Use Networks export to set constant. Default is mainnet. 
   */
  networkId?: NetworkIDs;
  children: React.ReactNode;
  /**
   * List of mediaRenderers configuration settings to add or replace media renderers. 
   */
  mediaRenderers?: MediaRenderersType;
  /**
   * Style configuration object. Contains both a theme and styles. Theme are generic settings for rendering styles.Style configuration object. Contains both a theme and styles.
   * Theme are generic settings for rendering styles.
   * Styles are raw emotion css-in-js styles for more fine-grained display settings.
   */
  style?: Partial<typeof Style>;
  /**
   * List of content strings.
   */
  strings?: Partial<typeof Strings>;
  /**
   * Theme preset to choose from. Themes can be found in `src/content-components/index.ts`.
   */
  themePreset?: ThemePresetNames;
};

export const MediaConfiguration = ({
  networkId = Networks.MAINNET,
  style = {},
  children,
  strings = {},
  mediaRenderers = {},
  themePreset,
}: MediaContextConfigurationProps) => {
  const superContext = useContext(MediaContext);

  const themePresetValue = themePreset ? THEME_PRESETS[themePreset] : undefined;

  let newContext = {
    style: merge(
      themePreset
        ? merge(superContext.style, themePresetValue)
        : superContext.style,
      style
    ),
    strings: merge(superContext.strings, strings),
    mediaRenderers: merge(superContext.mediaRenderers, mediaRenderers),
    networkId,
  };

  return (
    <MediaContext.Provider value={newContext}>
      <NFTFetchConfiguration networkId={networkId}>
        {children}
      </NFTFetchConfiguration>
    </MediaContext.Provider>
  );
};
