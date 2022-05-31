import { Fragment, useContext, useMemo } from "react";

import { ZORA_SITE_URL_BASE } from "../constants/media-urls";
import { useMediaContext } from "../context/useMediaContext";
import { Button } from "../components/Button";
import { NFTDataContext } from "../context/NFTDataContext";
<<<<<<< HEAD
import { AuctionType } from "@artiva/nft-hooks";
=======
>>>>>>> 1a35d9ee22c6030e3a915fc8f7868dba2bfc8f90
import type { StyleProps } from "../utils/StyleTypes";

type PlaceOfferButtonProps = {
  allowOffer?: boolean;
} & StyleProps;

export const PlaceOfferButton = ({
<<<<<<< HEAD
  allowOffer,
  className,
}: PlaceOfferButtonProps) => {
  const { nft } = useContext(NFTDataContext);
=======
  // @ts-ignore TS6133
  allowOffer,
  className,
}: PlaceOfferButtonProps) => {
  const { data } = useContext(NFTDataContext);
>>>>>>> 1a35d9ee22c6030e3a915fc8f7868dba2bfc8f90
  const { getString, getStyles } = useMediaContext();

  const activeAsk = useMemo(() => {
    const fixedPrice = data?.markets?.filter(
      (market) => market.type === "FixedPrice"
    );
    if (!fixedPrice || !fixedPrice.length) {
      return undefined;
    }
    const lastFixedPrice = fixedPrice[fixedPrice.length - 1];
    if (lastFixedPrice.status === "active") {
      return lastFixedPrice;
    }
    return undefined;
  }, [data?.markets]);

  const activeAuction = data?.markets?.find(
    (market) => market.type === "Auction" && market.status === "active"
  );

  function getBidURLParts() {
<<<<<<< HEAD
    const data = nft.data;
    if (!data || !("tokenId" in data.nft)) {
      return;
    }
    if (
      data.pricing.auctionType !== AuctionType.RESERVE &&
      "knownContract" in data.nft.contract &&
      data.nft.contract.knownContract !== "zora"
    ) {
      return;
    }
    return [
      ZORA_SITE_URL_BASE,
      "collections",
      data.nft.contract.address,
      data.nft.tokenId,
      data.pricing.auctionType === AuctionType.RESERVE
        ? "auction/bid"
        : "offer",
=======
    return [
      ZORA_SITE_URL_BASE,
      "collections",
      data?.nft?.contract.address,
      data?.nft?.tokenId,
      activeAuction ? "auction/bid" : "",
>>>>>>> 1a35d9ee22c6030e3a915fc8f7868dba2bfc8f90
    ];
  }

  function getButtonText() {
    if (activeAuction) {
      return getString("PLACE_BID");
    }
    if (activeAsk) {
      return getString("BUY_NOW");
    }
    if (data?.nft?.contract.knownContract === "zora") {
      return getString("PLACE_OFFER");
    }
    return getString("VIEW_ZORA");
  }

  const bidURL = getBidURLParts()?.join("/");

  if (!bidURL) {
    return <Fragment />;
  }

  return (
    <div {...getStyles("fullPlaceOfferButton", className)}>
      <Button primary={true} href={bidURL}>
        {getButtonText()}
      </Button>
    </div>
  );
};
