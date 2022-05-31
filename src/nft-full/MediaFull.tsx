import { useContext } from "react";

import { NFTDataContext } from "../context/NFTDataContext";
import { MediaObject } from "../components/MediaObject";
import { useMediaContext } from "../context/useMediaContext";
import {
  defaultGetContentData,
  GetContentDataType,
} from "../utils/getContentDataOptions";
import type { StyleProps } from "../utils/StyleTypes";

type MediaFullProps = GetContentDataType & {
  a11yIdPrefix?: string;
} & StyleProps;

export const MediaFull = ({
  a11yIdPrefix,
  getContentData = defaultGetContentData,
  className,
}: MediaFullProps) => {
  const { getStyles } = useMediaContext();
  const {
    data,
    error
  } = useContext(NFTDataContext);

  const getContent = () => {
    if (data && data.metadata) {
      return (
        <MediaObject
          isFullPage={true}
          a11yIdPrefix={a11yIdPrefix}
<<<<<<< HEAD
          tokenId={data.nft.tokenId ?? undefined}
          contract={data.nft.contract.address}
          {...getContentData(data, metadata)}
=======
          {...getContentData(data)}
>>>>>>> 1a35d9ee22c6030e3a915fc8f7868dba2bfc8f90
        />
      );
    }
    if (!data && error) {
      return <div {...getStyles("mediaLoader")}>error fetching...</div>;
    }
    return <div {...getStyles("mediaLoader")}>loading...</div>;
  };

  const media = getContent();
  return <div {...getStyles("fullMediaWrapper", className)}>{media}</div>;
};
