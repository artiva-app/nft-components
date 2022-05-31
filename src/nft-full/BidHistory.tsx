import { Fragment, useContext, useMemo } from "react";

import { AddressView } from "../components/AddressView";
import { NFTDataContext } from "../context/NFTDataContext";
import { useMediaContext } from "../context/useMediaContext";
import { InfoContainer } from "./InfoContainer";
import type { StyleProps } from "../utils/StyleTypes";
import {
  AuctionLike,
  CurrencyValue,
  FIXED_SIDE_TYPES,
  MARKET_INFO_STATUSES,
  MARKET_TYPES,
} from "@zoralabs/nft-hooks/dist/types";
import { PricingString } from "../utils/PricingString";

const dateFromTimestamp = (timestamp: string) => {
  try {
    return new Date(timestamp);
  } catch (e) {
    return new Date();
  }
};

const formatDate = (timestamp: string) =>
  dateFromTimestamp(timestamp).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

type BidHistoryProps = {
  edition?: boolean;
  showPerpetual?: boolean;
} & StyleProps;

type MarketDataListType = {
  activityDescription: string;
  actor: string;
  createdAt: string;
  transactionHash: string | null;
  pricing: CurrencyValue | undefined;
};

export const BidHistory = ({
<<<<<<< HEAD
  edition = false,
=======
  // @ts-ignore TS6196
>>>>>>> 1a35d9ee22c6030e3a915fc8f7868dba2bfc8f90
  showPerpetual = true,
  className,
}: BidHistoryProps) => {
  const { data } = useContext(NFTDataContext);
  const { getString, getStyles, style } = useMediaContext();

<<<<<<< HEAD
  const getPastBids = () => {
    const { data } = nft;
    if (!data || !data.nft) {
      return <Fragment />;
    }

    const currentBid = data.pricing.reserve?.currentBid
      ? [data.pricing.reserve?.currentBid]
      : [];
    const eventsList = [
      ...(showPerpetual && data.pricing.perpetual
        ? data.pricing.perpetual.bids
        : []),
      ...(data.pricing.reserve?.previousBids || []),
      ...currentBid,
    ].map((bid) => ({
      activityDescription: getString("BID_HISTORY_BID"),
      actor: bid.bidder.id,
      pricing: <PricingString pricing={bid.pricing} showUSD={false} />,
      createdAt: bid.createdAtTimestamp,
      // hint for type inference
      transactionHash: bid.transactionHash as string | null,
    }));

    if (
      data.pricing.reserve?.createdAtTimestamp &&
      // Only show approved auction listings
      data.pricing.reserve?.approvedTimestamp
    ) {
      eventsList.push({
        activityDescription: getString("BID_HISTORY_LISTED"),
        pricing: <Fragment />,
        actor: data.pricing.reserve.tokenOwner.id,
        // TODO(iain): Update to the timestamp when approved
        createdAt: data.pricing.reserve.approvedTimestamp,
        transactionHash: data.pricing.reserve.transactionHash,
      });
    }

    if (
      data.pricing &&
      data.pricing.reserve &&
      data.pricing.reserve.current.likelyHasEnded &&
      (data.pricing.reserve.status === "Active" ||
        data.pricing.reserve.status === "Finished")
    ) {
      const highestBid =
        data.pricing.reserve.currentBid || data.pricing.reserve.previousBids[0];
      eventsList.push({
        activityDescription: getString("BID_HISTORY_WON_AUCTION"),
        pricing: <Fragment />,
        actor: highestBid.bidder.id,
        createdAt: data.pricing.reserve.expectedEndTimestamp,
        transactionHash:
          data.pricing.reserve.currentBid?.transactionHash || null,
      });
=======
  const processedData = useMemo(() => {
    if (!data?.nft) {
      return [];
>>>>>>> 1a35d9ee22c6030e3a915fc8f7868dba2bfc8f90
    }
    const bidEvents: MarketDataListType[] = [];
    if (data.nft?.minted?.address && data.nft.minted?.at?.timestamp) {
      bidEvents.push({
        activityDescription: getString("BID_HISTORY_MINTED"),
        actor: data.nft.minted.address,
        createdAt: data.nft.minted.at.timestamp,
        transactionHash: data.nft.minted.at.transactionHash || null,
        pricing: undefined,
      });
    }
    data.markets?.forEach((market) => {
      if (market.type === MARKET_TYPES.AUCTION) {
        const typedAuction = market as AuctionLike;
        if (typedAuction.canceledAt) {
          bidEvents.push({
            activityDescription: getString("BID_HISTORY_CANCELLED"),
            actor: typedAuction.createdBy!,
            createdAt: typedAuction.canceledAt.timestamp,
            transactionHash: typedAuction.canceledAt.transactionHash || null,
            pricing: undefined,
          });
        }
        if (typedAuction.winner && typedAuction.finishedAt) {
          bidEvents.push({
            activityDescription: getString("AUCTION_SOLD_FOR"),
            actor: typedAuction.winner,
            createdAt: typedAuction.finishedAt!.timestamp,
            transactionHash: typedAuction.finishedAt?.transactionHash || null,
            pricing: typedAuction.amount,
          });
        }
        typedAuction.bids.forEach((bid) =>
          bidEvents.push({
            activityDescription: getString("BID_HISTORY_BID"),
            createdAt: bid.created.timestamp,
            actor: bid.creator,
            transactionHash: bid.created.transactionHash || null,
            pricing: bid.amount,
          })
        );
      }
      if (market.type === MARKET_TYPES.FIXED_PRICE) {
        if (market.side === FIXED_SIDE_TYPES.ASK) {
          if (market.status === MARKET_INFO_STATUSES.ACTIVE) {
            bidEvents.push({
              activityDescription: getString("HISTORY_ASK_PRICE"),
              createdAt: market.createdAt.timestamp,
              actor: market.createdBy!,
              transactionHash: market.createdAt.transactionHash || null,
              pricing: market.amount,
            });
          }
          if (market.status === MARKET_INFO_STATUSES.CANCELED) {
            bidEvents.push({
              activityDescription: getString("HISTORY_ASK_CANCELLED"),
              createdAt: market.canceledAt!.timestamp,
              actor: market.createdBy!,
              transactionHash: market.canceledAt?.transactionHash || null,
              pricing: market.amount,
            });
          }
          if (market.status === MARKET_INFO_STATUSES.COMPLETE) {
            bidEvents.push({
              activityDescription: getString("HISTORY_ASK_FILLED"),
              createdAt: market.createdAt.timestamp,
              actor: market.createdBy!,
              transactionHash: market.createdAt.transactionHash || null,
              pricing: market.amount,
            });
          }
        }
        if (market.side === FIXED_SIDE_TYPES.OFFER) {
          bidEvents.push({
            activityDescription: getString("HISTORY_OFFER_PRICE"),
            createdAt: market.createdAt.timestamp,
            actor: market.createdBy!,
            transactionHash: market.createdAt.transactionHash || null,
            pricing: market.amount,
          });
        }
      }
    });
    // data.events?.filter((evt) => )
    return bidEvents;
  }, [data?.markets]);

  if (!processedData.length) {
    return <Fragment />;
  }

<<<<<<< HEAD
    if ("openseaInfo" in data && data.openseaInfo.creator) {
      eventsList.push({
        activityDescription: getString("BID_HISTORY_MINTED"),
        pricing: <Fragment />,
        actor: data.openseaInfo.creator.address,
        createdAt: null,
        transactionHash: null,
      });
    }

    if (edition && data.nft.creator) {
      eventsList.push({
        activityDescription: getString("BID_HISTORY_MINTED"),
        pricing: <Fragment />,
        actor: data.nft.creator,
        createdAt: null,
        transactionHash: null,
      });
    }

    return eventsList
      .sort((bidA, bidB) => (bidA.createdAt > bidB.createdAt ? -1 : 1))
      .map((bidItem) => (
        <li
          {...getStyles("fullPageHistoryItem")}
          key={`${bidItem.actor}-${bidItem.createdAt}`}
        >
          <div {...getStyles("fullPageHistoryItemDescription")}>
            <div {...getStyles("fullPageHistoryItemDescriptionCopy")}>
              <AddressView address={bidItem.actor} />
              &nbsp;
              <span {...getStyles("pricingAmount")}>
                {bidItem.activityDescription} {bidItem.pricing}
              </span>
            </div>
            {bidItem.transactionHash && style.theme.showTxnLinks && (
              <a
                {...getStyles("fullPageHistoryTxnLink")}
                href={`https://etherscan.io/tx/${bidItem.transactionHash}`}
                target="_blank"
                rel="noreferrer"
              >
                {getString("BID_HISTORY_VIEW_TRANSACTION")}
              </a>
            )}
=======
  const pastBids = processedData
    .sort((bidA, bidB) =>
      new Date(bidA.createdAt).getTime() < new Date(bidB.createdAt).getTime()
        ? -1
        : 1
    )
    .map((bidItem) => (
      <li
        {...getStyles("fullPageHistoryItem")}
        key={`${bidItem.actor}-${bidItem.createdAt}`}
      >
        <div {...getStyles("fullPageHistoryItemDescription")}>
          <div {...getStyles("fullPageHistoryItemDescriptionCopy")}>
            <AddressView address={bidItem.actor} />
            &nbsp;
            <span {...getStyles("pricingAmount")}>
              {bidItem.activityDescription}{" "}
              {bidItem.pricing && <PricingString pricing={bidItem.pricing} />}
            </span>
>>>>>>> 1a35d9ee22c6030e3a915fc8f7868dba2bfc8f90
          </div>
          {bidItem.transactionHash && style.theme.showTxnLinks && (
            <a
              {...getStyles("fullPageHistoryTxnLink")}
              href={`https://etherscan.io/tx/${bidItem.transactionHash}`}
              target="_blank"
              rel="noreferrer"
            >
              {getString("BID_HISTORY_VIEW_TRANSACTION")}
            </a>
          )}
        </div>
        {bidItem.createdAt && (
          <div {...getStyles("fullPageHistoryItemMeta")}>
            <time
              dateTime={dateFromTimestamp(bidItem.createdAt).toISOString()}
              {...getStyles("fullPageHistoryItemDatestamp")}
            >
              {formatDate(bidItem.createdAt)}
            </time>
          </div>
        )}
      </li>
    ));

  return (
    <InfoContainer titleString="NFT_HISTORY" className={className}>
      <ol {...getStyles("fullPageHistoryList")}>{pastBids}</ol>
    </InfoContainer>
  );
};
