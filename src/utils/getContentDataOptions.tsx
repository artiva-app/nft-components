<<<<<<< HEAD
import type { NFTDataType } from "@artiva/nft-hooks";
=======
import type { NFTObject } from "@zoralabs/nft-hooks/dist";
>>>>>>> 1a35d9ee22c6030e3a915fc8f7868dba2bfc8f90

export const defaultGetContentData = (nft: NFTObject) => {
  return {
    contentURI: (nft.media?.content?.uri ||
      nft.media?.image?.uri ||
      nft.nft?.contentURI) as string,
    metadata: nft.metadata,
    contract: nft.nft?.contract?.address,
    tokenId: nft.nft?.tokenId,
  };
};

export type GetContentDataType = {
<<<<<<< HEAD
  getContentData?: (
    nft: NFTDataType,
    metadata: any
  ) => { contentURI?: string; metadata: any };
=======
  getContentData?: (nft: NFTObject) => {
    contentURI?: string;
    metadata?: any;
    contract?: any;
    tokenId?: any;
  };
>>>>>>> 1a35d9ee22c6030e3a915fc8f7868dba2bfc8f90
};
