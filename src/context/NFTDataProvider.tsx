<<<<<<< HEAD
import {
  DataTransformers,
  useNFT,
  useNFTType,
  useNFTMetadataType,
  useNFTMetadata,
} from "@artiva/nft-hooks";

import { NFTDataContext } from "./NFTDataContext";
import type {
  OpenseaNFTDataType,
  ZNFTDataType,
} from "@artiva/nft-hooks/dist/fetcher/AuctionInfoTypes";
import type { EditionNFTDataType } from "@artiva/nft-hooks/dist/fetcher/EditionUtils";

export type NFTDataProviderProps = {
  id?: string;
  contract?: string;
  edition?: boolean;
  useBetaIndexer?: boolean;
  refreshInterval?: number;
=======
import { useNFT } from "@zoralabs/nft-hooks";

import { NFTDataContext } from "./NFTDataContext";

export type NFTDataProviderProps = {
  id: string;
  contract: string;
>>>>>>> 1a35d9ee22c6030e3a915fc8f7868dba2bfc8f90
  children: React.ReactNode;
  options?: any;
  marketOptions?: any;
};

export const NFTDataProvider = ({
  id,
  children,
  contract,
<<<<<<< HEAD
  edition = false,
  refreshInterval,
  initialData,
  useBetaIndexer = false,
}: NFTDataProviderProps) => {
  const { nft: nftInitial } = initialData || {};
  if (nftInitial?.tokenData && !useBetaIndexer) {
    throw new Error(
      "useBetaIndexer={true} prop on NFTFull/NFTDataProvider/NFTPreview required when using indexer-style initialData"
    );
  }
  const nft = useNFT(contract, id, {
    loadCurrencyInfo: true,
    initialData: nftInitial,
    refreshInterval: refreshInterval,
    useBetaIndexer,
    edition,
  });

  const fetchedMetadata = useNFTMetadata(
    isZNFT(nft.data) ? nft.data?.nft.metadataURI : undefined,
    initialData?.metadata
  );
  if (
    fetchedMetadata.metadata?.body?.version &&
    fetchedMetadata.metadata?.body?.version.includes("catalog")
  ) {
    fetchedMetadata.metadata.name = fetchedMetadata.metadata?.body?.title;
  }

  const editionMetadata = edition
    ? {
        loading: !!nft.data,
        metadata: nft.data
          ? DataTransformers.editionDataToMetadata(
              nft.data as EditionNFTDataType
            )
          : undefined,
      }
    : undefined;

  const openseaMetadata = isOpensea(nft.data)
    ? {
        loading: !!nft.data,
        metadata: nft.data
          ? DataTransformers.openseaDataToMetadata(nft.data)
          : undefined,
      }
    : undefined;

  let zoraIndexerMetadata =
    nft &&
    nft.data &&
    "zoraIndexerResponse" in nft.data &&
    (nft as any).data?.zoraIndexerResponse?.metadata?.json;

  const metadata = editionMetadata
    ? editionMetadata
    : zoraIndexerMetadata
    ? {
        metadata: zoraIndexerMetadata,
        loading: !!zoraIndexerMetadata,
        error: nft.error ? new Error(nft.error) : undefined,
      }
    : openseaMetadata || fetchedMetadata;
=======
  options = {},
  marketOptions = {},
}: NFTDataProviderProps) => {
  const nft = useNFT(contract, id, options, marketOptions);
>>>>>>> 1a35d9ee22c6030e3a915fc8f7868dba2bfc8f90

  return (
    <NFTDataContext.Provider value={nft}>{children}</NFTDataContext.Provider>
  );
};
