import { createContext } from "react";
import type {
  useNFTType,
<<<<<<< HEAD
  useZNFTType,
} from "@artiva/nft-hooks";
=======
} from "@zoralabs/nft-hooks";
>>>>>>> 1a35d9ee22c6030e3a915fc8f7868dba2bfc8f90

export type NFTDataContext = useNFTType;


export const NFTDataContext = createContext<NFTDataContext>({
  data: undefined,
  currencyLoaded: false,
});
