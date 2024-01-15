import { create } from "ipfs-http-client";

async function addFile(fileContent) {
  // 1. Create IPFS instance
  const ipfsInstance = create({
    url: "http://localhost:5001",
  });

  // 2. Add file to ipfs
  const { cid } = await ipfsInstance.add(fileContent);

  // 3. Get file status from ipfs
  const fileStat = await ipfsInstance.files.stat("/ipfs/" + cid);
  return {
    cid: cid.toString(),
    size: fileStat.cumulativeSize,
  };
}

export default addFile;
