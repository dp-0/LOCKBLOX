import { ApiPromise, WsProvider } from "@polkadot/api";
import env from "../helpers/env.js";
import { typesBundleForPolkadot, crustTypes } from "@crustio/type-definitions";
import { Keyring } from "@polkadot/keyring";
// Create global chain instance
const crustChainEndpoint = "wss://rpc-rocky.crust.network";
const api = new ApiPromise({
  provider: new WsProvider(crustChainEndpoint),
  typesBundle: typesBundleForPolkadot,
});
async function placeStorageOrder(fileCid, fileSize) {
  // 1. Construct place-storage-order tx
  const tips = 1;
  // If it's a folder, please set memo = 'folder'
  const memo = "";
  const tx = api.tx.market.placeStorageOrder(fileCid, fileSize, tips, memo);
  // 2. Load seeds(account)
  const kr = new Keyring({ type: "sr25519" });
  const krp = kr.addFromUri(env("SEEDS"));
  // 3. Send transaction
  await api.isReadyOrError;
  return new Promise((resolve, reject) => {
    tx.signAndSend(krp, ({ events = [], status }) => {
      console.log(`💸 Tx status: ${status.type}, nonce: ${tx.nonce}`);

      if (status.isInBlock) {
        events.forEach(({ event: { method, section } }) => {
          if (method === "ExtrinsicSuccess") {
            console.log(`✅ Place storage order success!`);
            resolve(true);
          }
        });
      } else {
        // Pass it
      }
    }).catch((e) => {
      reject(e);
    });
  });
}

export default placeStorageOrder;
