import { Fragment, useContext, useMemo } from "react";

import { useMediaContext } from "../context/useMediaContext";
import { NFTDataContext } from "../context/NFTDataContext";
import { CountdownDisplay } from "../components/CountdownDisplay";
import { PricingString } from "../utils/PricingString";
<<<<<<< HEAD
import { AuctionStateInfo, AuctionType } from "@artiva/nft-hooks";
=======
>>>>>>> 1a35d9ee22c6030e3a915fc8f7868dba2bfc8f90
import type { StyleProps } from "../utils/StyleTypes";
import {
  AUCTION_SOURCE_TYPES,
  AuctionLike,
  EditionLike,
  MARKET_INFO_STATUSES,
  MARKET_TYPES,
} from "@zoralabs/nft-hooks/dist/types";

function isInFuture(timestamp: string) {
  return new Date(timestamp).getTime() > new Date().getTime();
}

type PricingComponentProps = {
  showPerpetual?: boolean;
} & StyleProps;

export const PricingComponent = ({
  // @ts-ignore TS6133
  showPerpetual = true,
  className,
}: PricingComponentProps) => {
<<<<<<< HEAD
  const {
    nft: { data },
  } = useContext(NFTDataContext);
  data?.pricing.auctionType;
=======
  const { data } = useContext(NFTDataContext);
>>>>>>> 1a35d9ee22c6030e3a915fc8f7868dba2bfc8f90

  const { getStyles, getString } = useMediaContext();

  const reserveAuction = useMemo(
    () =>
      data?.markets?.find(
        (market) =>
          market.source === AUCTION_SOURCE_TYPES.ZORA_RESERVE_V2 &&
          market.status !== MARKET_INFO_STATUSES.CANCELED
      ),
    [data?.markets]
  ) as undefined | AuctionLike;

<<<<<<< HEAD
  if (
    pricing &&
    pricing.auctionType === AuctionType.EDITION &&
    !pricing.edition?.salePrice
  ) {
    return (
      <div {...getStyles("cardAuctionPricing", className, { type: "unknown" })}>
        <div {...getStyles("textSubdued")}>Edition Price</div>
        <div {...getStyles("pricingAmount")}>
          {getString("NO_PRICING_PLACEHOLDER")}
        </div>
        <div {...getStyles("textSubdued")}>{getString("NFTS_COLLECTED")}</div>
        <div {...getStyles("pricingAmount")}>
          {`${pricing.edition?.totalSupply} / ${pricing.edition?.editionSize}`}
        </div>
      </div>
    );
  }

  if (pricing && pricing.auctionType === AuctionType.EDITION) {
    return (
      <div {...getStyles("cardAuctionPricing", className, { type: "unknown" })}>
        <div {...getStyles("textSubdued")}>Edition Price</div>
        <div {...getStyles("pricingAmount")}>
          {pricing.edition?.salePrice.prettyAmount}{" "}
          {pricing.edition?.salePrice.currency.symbol}
        </div>
        <div {...getStyles("textSubdued")}>{getString("NFTS_COLLECTED")}</div>
        <div {...getStyles("pricingAmount")}>
          {`${pricing.edition?.totalSupply} / ${
            pricing.edition?.editionSize ?? 99
          }`}
        </div>
      </div>
    );
  }

  if (
    pricing &&
    !pricing.reserve &&
    pricing.status === AuctionStateInfo.NO_PRICING
  ) {
=======
  const ask = useMemo(
    () =>
      data?.markets?.find(
        (market) =>
          market.type === MARKET_TYPES.FIXED_PRICE &&
          market.status === MARKET_INFO_STATUSES.ACTIVE
      ),
    [data?.markets]
  );

  const edition = useMemo(
    () =>
      data?.markets?.find(
        (market) => market.type === "Edition" && market.status === "active"
      ),
    [data?.markets]
  ) as undefined | EditionLike;

  if (!reserveAuction && !ask && !edition) {
>>>>>>> 1a35d9ee22c6030e3a915fc8f7868dba2bfc8f90
    return (
      <div {...getStyles("cardAuctionPricing", className, { type: "unknown" })}>
        <div {...getStyles("textSubdued")}>{getString("RESERVE_PRICE")}</div>
        <div {...getStyles("pricingAmount")}>
          {getString("NO_PRICING_PLACEHOLDER")}
        </div>
        <div {...getStyles("textSubdued")}>{getString("HIGHEST_BID")}</div>
        <div {...getStyles("pricingAmount")}>
          {getString("NO_PRICING_PLACEHOLDER")}
        </div>
      </div>
    );
  }

  if (edition && edition.status === MARKET_INFO_STATUSES.ACTIVE) {
    return (
      <div {...getStyles("cardAuctionPricing", className, { type: "unknown" })}>
        <span {...getStyles("textSubdued")}>{getString("EDITION_PRICE")}</span>
        <PricingString pricing={edition.amount} showUSD={false} />

        <span {...getStyles("textSubdued")}>{getString("NFTS_COLLECTED")}</span>
        <span {...getStyles("pricingAmount")}>
          {`${edition.totalSupply} / ${edition.editionSize}`}
        </span>
      </div>
    );
  }

  if (ask && reserveAuction?.status !== MARKET_INFO_STATUSES.ACTIVE) {
    let listPrice = null;

<<<<<<< HEAD
    if (pricing.perpetual && pricing.perpetual.ask?.pricing) {
      const perpetualPricing = pricing.perpetual.ask?.pricing;
=======
    if (ask) {
>>>>>>> 1a35d9ee22c6030e3a915fc8f7868dba2bfc8f90
      listPrice = (
        <Fragment>
          <span {...getStyles("textSubdued")}>{getString("LIST_PRICE")}</span>
          <PricingString pricing={ask.amount} showUSD={false} />
        </Fragment>
      );
    }
<<<<<<< HEAD
    const highestBid = pricing?.perpetual?.highestBid;
    if (!highestBid && pricing.reserve?.previousBids.length) {
      const highestPreviousBid = pricing.reserve.previousBids[0];
=======
    const highestBid = undefined;
    if (
      !highestBid &&
      reserveAuction?.status === MARKET_INFO_STATUSES.COMPLETE
    ) {
>>>>>>> 1a35d9ee22c6030e3a915fc8f7868dba2bfc8f90
      return (
        <div
          {...getStyles("cardAuctionPricing", className, {
            type: "reserve-pending",
          })}
        >
          <span {...getStyles("textSubdued")}>{getString("SOLD_FOR")}</span>
          <span {...getStyles("pricingAmount")}>
            <PricingString pricing={reserveAuction.amount} showUSD={false} />
          </span>
          {listPrice}
        </div>
      );
    }
    return (
      <div
        {...getStyles("cardAuctionPricing", className, { type: "perpetual" })}
      >
        <span {...getStyles("textSubdued")}>{getString("HIGHEST_BID")}</span>
        <span {...getStyles("pricingAmount")}>
          {highestBid ? (
            <PricingString showUSD={false} pricing={highestBid} />
          ) : (
            getString("NO_PRICING_PLACEHOLDER")
          )}
        </span>
        {listPrice}
      </div>
    );
  }
  if (reserveAuction) {
    if (reserveAuction.status === "active") {
      const highestBid = reserveAuction.amount;
      return (
        <div
          {...getStyles("cardAuctionPricing", className, {
            type: "reserve-active",
          })}
        >
          <span {...getStyles("textSubdued")}>{getString("TOP_BID")}</span>
          <span {...getStyles("pricingAmount")}>
            {highestBid && (
              <PricingString pricing={highestBid} showUSD={false} />
            )}
          </span>
          {reserveAuction.endsAt?.timestamp &&
            isInFuture(reserveAuction.endsAt.timestamp) && (
              <Fragment>
                <span {...getStyles("textSubdued")}>
                  {getString("ENDS_IN")}
                </span>
                <span {...getStyles("pricingAmount")}>
                  <CountdownDisplay to={reserveAuction.endsAt.timestamp} />
                </span>
              </Fragment>
            )}
        </div>
      );
    }

    if (reserveAuction.status === MARKET_INFO_STATUSES.COMPLETE) {
      return (
        <div
          {...getStyles("cardAuctionPricing", className, {
            type: "reserve-finished",
          })}
        >
          <span {...getStyles("textSubdued")}>{getString("SOLD_FOR")}</span>
          <span {...getStyles("pricingAmount")}>
            <PricingString showUSD={false} pricing={reserveAuction.amount} />
          </span>
        </div>
      );
    }
<<<<<<< HEAD

    if (
      pricing.reserve?.reservePrice &&
      pricing.status !== AuctionStateInfo.NO_PRICING
    ) {
=======
    if (reserveAuction.status === MARKET_INFO_STATUSES.PENDING) {
>>>>>>> 1a35d9ee22c6030e3a915fc8f7868dba2bfc8f90
      return (
        <div
          {...getStyles("cardAuctionPricing", className, {
            type: "reserve-pending",
          })}
        >
          <span {...getStyles("textSubdued")}>
            {getString("RESERVE_PRICE")}
          </span>
          <span>
            <PricingString showUSD={false} pricing={reserveAuction.amount} />
          </span>
        </div>
      );
    }
  }

  return (
    <div {...getStyles("cardAuctionPricing", className, { type: "unknown" })}>
      <div {...getStyles("textSubdued")}>{getString("PRICING_LOADING")}</div>
      <div {...getStyles("pricingAmount")}>{getString("PRICING_LOADING")}</div>
    </div>
  );
};
