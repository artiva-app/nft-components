import { useContext } from "react";
import { css } from "@emotion/css";
import { useMediaContext } from "../context/useMediaContext";
import { NFTDataContext } from "../context/NFTDataContext";
import { Orb } from "../components/Orb";

export const CollectionTag = () => {
<<<<<<< HEAD
  const {
    nft: { data },
  } = useContext(NFTDataContext);
=======
  const { data } = useContext(NFTDataContext);
>>>>>>> 1a35d9ee22c6030e3a915fc8f7868dba2bfc8f90

  const { getStyles } = useMediaContext();

  const getContent = () => {
    return (
      <a
        {...getStyles("colectionTagWrapper")}
        href={`https://zora.co/collections/${data?.nft!.contract.address}`}
        target="_blank"
        rel="noreferrer"
      >
        <div {...getStyles("collectionTagIcon")}>
          {
            /* @ts-ignore */ data &&
<<<<<<< HEAD
            "openseaInfo" in data &&
            data.openseaInfo.asset_contract.image_url ? (
              <img
                src={data.openseaInfo.asset_contract.image_url}
                alt={data.openseaInfo.asset_contract.name}
=======
            "OpenSea" in data.rawData &&
            data.rawData["OpenSea"].asset_contract.image_url ? (
              <img
                src={data.rawData["OpenSea"].asset_contract.image_url}
                alt={data.rawData["OpenSea"].asset_contract.name}
>>>>>>> 1a35d9ee22c6030e3a915fc8f7868dba2bfc8f90
              />
            ) : (
              <Orb />
            )
          }
        </div>
<<<<<<< HEAD
        <span>
          {data && "openseaInfo" in data
            ? `${data.openseaInfo.asset_contract.name}`
            : "Zora"}
        </span>
=======
        <span>{data?.nft!.contract.name}</span>
>>>>>>> 1a35d9ee22c6030e3a915fc8f7868dba2bfc8f90
      </a>
    );
  };

  return (
    <div
      className={css`
        position: relative;
        display: flex;
        flex-direction: row;
      `}
    >
<<<<<<< HEAD
      {data ? getContent() : "..."}
=======
      {data?.nft ? getContent() : "..."}
>>>>>>> 1a35d9ee22c6030e3a915fc8f7868dba2bfc8f90
    </div>
  );
};
