<<<<<<< HEAD
import { Networks, NFTDataType } from "@artiva/nft-hooks";
import React, { useContext } from "react";
=======
import type { NFTObject } from "@zoralabs/nft-hooks";
import React, { Fragment, useContext } from "react";
>>>>>>> 1a35d9ee22c6030e3a915fc8f7868dba2bfc8f90

import { NFTDataContext } from "../context/NFTDataContext";
import {
  MEDIA_URL_BASE_BY_NETWORK,
  VIEW_ETHERSCAN_URL_BASE_BY_NETWORK,
} from "../constants/media-urls";
import { useMediaContext } from "../context/useMediaContext";
import { InfoContainer } from "./InfoContainer";
import type { StyleProps } from "../utils/StyleTypes";

const ProofLink = ({
  href,
  children,
  styles,
}: {
  href?: string;
  children: string;
  styles: any;
}) => (
  <a {...styles} href={href} target="_blank" rel="noreferrer">
    {children}
  </a>
);

export const ProofAuthenticity = ({ className }: StyleProps) => {
  const { data } = useContext(NFTDataContext);
  const { getString, getStyles, networkId } = useMediaContext();
  const linkStyles = getStyles("fullProofLink");

<<<<<<< HEAD
  const getContent = (nft: NFTDataType["nft"]) => {
    const infoURL =
      (data && "zoraNFT" in data && data?.zoraNFT?.contentURI) ||
      (data && "metadataURI" in data.nft && data?.nft.metadataURI);
=======
  const getContent = (nft: NFTObject) => {
    const infoURL = data?.nft?.contentURI;
>>>>>>> 1a35d9ee22c6030e3a915fc8f7868dba2bfc8f90
    const infoUrlLabelText =
      infoURL && (infoURL?.includes("/ipfs/") || infoURL?.startsWith("ipfs://"))
        ? "VIEW_IPFS"
        : "VIEW_METADATA";

    if (!nft.nft) {
      return <Fragment />;
    }

    return (
      <React.Fragment>
        <ProofLink
          styles={linkStyles}
<<<<<<< HEAD
          href={`${VIEW_ETHERSCAN_URL_BASE_BY_NETWORK[networkId]}${
            nft.contract.address
          }${"tokenId" in nft ? `?a=${nft.tokenId}` : ""}`}
=======
          href={`${VIEW_ETHERSCAN_URL_BASE_BY_NETWORK[networkId]}${nft.nft?.contract.address}?a=${nft.nft?.tokenId}`}
>>>>>>> 1a35d9ee22c6030e3a915fc8f7868dba2bfc8f90
        >
          {getString("ETHERSCAN_TXN")}
        </ProofLink>
        {infoURL && (
          <ProofLink styles={linkStyles} href={infoURL}>
            {getString(infoUrlLabelText)}
          </ProofLink>
        )}
<<<<<<< HEAD
        {data &&
          "zoraNFT" in data &&
          data.zoraNFT &&
          networkId === Networks.MAINNET && (
            <ProofLink
              styles={linkStyles}
              href={`${MEDIA_URL_BASE_BY_NETWORK[networkId]}${nft.creator}/${
                "tokenId" in nft ? nft.tokenId : ""
              }`}
=======
        {data?.nft &&
          (data.rawData["zora-indexer"] ||
            data.nft?.contract.knownContract === "zora") && (
            <ProofLink
              styles={linkStyles}
              href={`${MEDIA_URL_BASE_BY_NETWORK[networkId]}collections/${
                nft.nft!.contract.address
              }/${nft.nft!.tokenId}`}
>>>>>>> 1a35d9ee22c6030e3a915fc8f7868dba2bfc8f90
            >
              {getString("VIEW_ZORA")}
            </ProofLink>
          )}
      </React.Fragment>
    );
  };

  return (
    <InfoContainer
      titleString="PROOF_AUTHENTICITY"
      bottomPadding={false}
      className={className}
    >
      <div {...getStyles("fullInfoProofAuthenticityContainer")}>
        {data && getContent(data)}
      </div>
    </InfoContainer>
  );
};
