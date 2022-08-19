import {ethers} from "ethers"

let cProvider:any;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  // let addressArray = window.ethereum.request({ method: "eth_requestAccounts" });
  cProvider = new ethers.providers.Web3Provider(window.ethereum);
  // cProvider = provider.getSigner(addressArray[0]);
} else {
  // We are on the server *OR* the user is not running metamask
  cProvider = new ethers.providers.StaticJsonRpcProvider (
    "https://polygon-mumbai.g.alchemy.com/v2/AMF884Dlsw1T-bZdbATBL56StrscRbvp"
)
}

export default cProvider;
