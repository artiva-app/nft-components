/*! For license information please see vendors~main.f603c729.iframe.bundle.js.LICENSE.txt */
  fragment AskPrice on Ask {
    id
    currency {
      ...CurrencyShort
    }
    amount
    createdAtTimestamp
  }

  fragment NFTMedia on Media {
    id
    creatorBidShare
    ownerBidShare
    owner {
      id
    }
    creator {
      id
    }
    currentAsk {
      ...AskPrice
    }
    createdAtTimestamp
    metadataURI
    metadataHash
    contentURI
    contentHash
  }
`,AUCTION_PARTIALS=graphql_request_1.gql`
  fragment CurrencyShort on Currency {
    id
    name
    symbol
    decimals
  }

  fragment PreviousReserveBid on InactiveReserveAuctionBid {
    id
    bidder {
      id
    }
    transactionHash
    createdAtTimestamp
    amount
    bidType
    bidInactivatedAtTimestamp
    bidInactivatedAtBlockNumber
  }

  fragment CurrentReserveBid on ReserveAuctionBid {
    bidType
    amount
    transactionHash
    createdAtTimestamp
    bidder {
      id
    }
  }

  fragment ReserveAuctionPartial on ReserveAuction {
    id
    tokenId
    tokenContract
    transactionHash
    status
    approved
    reservePrice
    firstBidTime
    token
    createdAtTimestamp
    approvedTimestamp
    curator {
      id
    }
    curatorFeePercentage
    tokenOwner {
      id
    }
    auctionCurrency {
      ...CurrencyShort
    }
    currentBid {
      ...CurrentReserveBid
    }
    previousBids {
      ...PreviousReserveBid
    }
    duration
    expectedEndTimestamp
    finalizedAtTimestamp
  }
`;exports.GET_AUCTION_BY_CURATOR=graphql_request_1.gql`
  ${AUCTION_PARTIALS}
  ${MEDIA_PARTIALS}

  fragment ReserveAuctionPartialWithMedia on ReserveAuction {
    ...ReserveAuctionPartial
    media {
      ...NFTMedia
    }
  }

  query getAuctionsByCurator(
    $curators: [String!]
    $approved: [Boolean!]
    $first: Int
    $skip: Int
  ) {
    reserveAuctions(
      where: { curator_in: $curators, approved_in: $approved }
      first: $first
      skip: $skip
      orderBy: createdAtTimestamp
      orderDirection: desc
    ) {
      ...ReserveAuctionPartialWithMedia
    }
  }
`,exports.GET_ALL_AUCTIONS=graphql_request_1.gql`
  ${AUCTION_PARTIALS}

  query getAllAuctions($approved: [Boolean!], $first: Int, $skip: Int) {
    reserveAuctions(where: { approved_in: $approved }, first: $first, skip: $skip) {
      ...ReserveAuctionPartial
    }
  }
`,exports.GET_AUCTION_BY_MEDIA=graphql_request_1.gql`
  ${AUCTION_PARTIALS}

  query getAuctionByMedia($tokens: [String!]) {
    reserveAuctions(
      first: 300
      where: { token_in: $tokens }
      orderBy: createdAtTimestamp
      orderDirection: desc
    ) {
      ...ReserveAuctionPartial
    }
  }
`,exports.GET_MEDIAS_QUERY=graphql_request_1.gql`
  ${AUCTION_PARTIALS}
  ${MEDIA_PARTIALS}

  fragment BidDataPartial on Bid {
    id
    bidder {
      id
    }
    createdAtTimestamp
    transactionHash
    amount
    currency {
      ...CurrencyShort
    }
  }

  fragment TransferPartial on Transfer {
    id
    transactionHash
    from {
      id
    }
    to {
      id
    }
    createdAtTimestamp
    createdAtBlockNumber
  }

  fragment NFTMediaFullData on Media {
    ...NFTMedia
    currentBids {
      ...BidDataPartial
    }
    transfers {
      ...TransferPartial
    }
    reserveAuctions(orderBy: createdAtTimestamp, orderDirection: desc, first: 1) {
      ...ReserveAuctionPartial
    }
  }

  query getMediaAndAuctions(
    $id_ids: [ID!]
    $creator_ids: [String!]
    $owner_ids: [String!]
  ) {
    id: medias(
      where: { id_in: $id_ids }
      first: 500
    ) {
      ...NFTMediaFullData
    }
    creator: medias(
      where: { creator_in: $creator_ids }
      first: 500
    ) {
      ...NFTMediaFullData
    }
    owner: medias(
      where: { owner_in: $owner_ids }
      first: 500
    ) {
      ...NFTMediaFullData
    }
  }
`},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.GET_TOKEN_VALUES_QUERY=void 0;const graphql_request_1=__webpack_require__(256);exports.GET_TOKEN_VALUES_QUERY=graphql_request_1.gql`
  fragment TokenShort on Token {
    id
    symbol
    name
    decimals
    derivedETH
  }
  query getTokenPrices($currencyContracts: [ID!]) {
    bundle(id: "1") {
      ethPrice
    }
    tokens(where: { id_in: $currencyContracts }) {
      ...TokenShort
    }
  }
`},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.DEFAULT_NETWORK_TIMEOUTS_MS=void 0,exports.DEFAULT_NETWORK_TIMEOUTS_MS={Zora:2e3,Graph:5e3,IPFS:1e4,OpenSea:8e3,ZoraIndexer:2e3}},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.KNOWN_CONTRACTS=void 0,function(KNOWN_CONTRACTS){KNOWN_CONTRACTS.ZORA="zora"}(exports.KNOWN_CONTRACTS||(exports.KNOWN_CONTRACTS={}))},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.FetchWithTimeout=void 0;const tslib_1=__webpack_require__(67),cross_fetch_1=tslib_1.__importDefault(__webpack_require__(579)),node_abort_controller_1=tslib_1.__importDefault(__webpack_require__(1101)),RequestError_1=__webpack_require__(208);exports.FetchWithTimeout=class FetchWithTimeout{constructor(timeoutDuration=5e3,contentType){this.controller=new node_abort_controller_1.default,this.expectedContentType=contentType,this.timeoutDuration=timeoutDuration,this.fetch=this.fetch.bind(this)}async fetch(url,options={}){var _a;const controller=this.controller,response=await cross_fetch_1.default(url,{...options,signal:this.controller.signal});if(setTimeout(()=>controller.abort(),this.timeoutDuration),200!==response.status)throw new RequestError_1.RequestError("Request Status = "+response.status);if(this.expectedContentType&&!(null===(_a=response.headers.get("content-type"))||void 0===_a?void 0:_a.startsWith(this.expectedContentType)))throw new RequestError_1.RequestError("Reponse Content Type incorrect");return response}}},function(module,exports,__webpack_require__){"use strict";const _global="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0;if(!_global)throw new Error("Unable to find global scope. Are you sure this is running in the browser?");if(!_global.AbortController)throw new Error('Could not find "AbortController" in the global scope. You need to polyfill it first');module.exports=_global.AbortController,module.exports.default=_global.AbortController},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ACTIVE_AUCTIONS_QUERY=exports.BY_IDS=exports.LOOKUP_TOKEN=exports.BY_OWNER=void 0;const graphql_request_1=__webpack_require__(256),BASE_FRAGMENTS=graphql_request_1.gql`
  fragment TokenWithAuction on Token {
    id
    tokenId
    owner
    address
    tokenURI
    minter
    metadata {
      json
    }
    mintTransferEvent {
      blockTimestamp
      blockNumber
    }
    media {
      contentURI
      contentHash
      metadataHash
      metadataURI
      ownerBidShare
      creatorBidShare
    }
    auctions(where: { _and: [{ _not: { canceledEvent: {} } }] }) {
      winner
      lastBidAmount
      duration
      tokenId
      auctionId
      tokenContract
      reservePrice
      firstBidTime
      expiresAt
      tokenOwner
      canceledEvent {
        id
      }
      endedEvent {
        id
      }
      bidEvents {
        id
        value
        sender
        transactionHash
      }
    }
  }
`;exports.BY_OWNER=graphql_request_1.gql`
  ${BASE_FRAGMENTS}
  query byOwner($address: String, $owner: String, $offset: Int, $limit: Int) @cached {
    Token(
      limit: $limit
      offset: $offset
      where: {
        address: { _eq: $address }
        _or: [
          { owner: { _eq: $owner } }
          {
            auctions: {
              _and: [
                { _not: { endedEvent: {} } }
                { _not: { canceledEvent: {} } }
                { tokenOwner: { _eq: $owner } }
              ]
            }
          }
        ]
      }
    ) {
      ...TokenWithAuction
    }
  }
`,exports.LOOKUP_TOKEN=graphql_request_1.gql`
  ${BASE_FRAGMENTS}
  query byId($address: String, $tokenId: Int) @cached {
    Token(where: { address: { _eq: $address }, tokenId: { _eq: $tokenId } }) {
      ...TokenWithAuction
    }
  }
`,exports.BY_IDS=graphql_request_1.gql`
  ${BASE_FRAGMENTS}
  query byIds($ids: [String!]) @cached {
    Token(where: { id: { _in: $ids } }) {
      ...TokenWithAuction
    }
  }
`,exports.ACTIVE_AUCTIONS_QUERY=graphql_request_1.gql`
  ${BASE_FRAGMENTS}
  query activeTokens (
    $addresses: [String!]
    $curators: [String!]
    $limit: Int
    $offset: Int
  ) @cached {
    Token(
      limit: $limit
      offset: $offset
      where: {
        _or: [
          { address: { _in: $addresses } }
          { auctions: { curator: { _in: $curators } } }
        ]
        tokenURI: { _is_null: false }
      }
      order_by: [
        { auctions_aggregate: { max: { lastBidAmount: asc_nulls_last } } }
        { auctions_aggregate: { count: desc } }
        { tokenId: asc }
      ]
    ) {
      ...TokenWithAuction
    }
  }
//# sourceMappingURL=vendors~main.f603c729.iframe.bundle.js.map