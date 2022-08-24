import ProofOfLessAbi from "./proofOfLess.json";
import {ethers} from "ethers"
import cProvider from "./cProvider";
// import * as dotenv from "dotenv";
// dotenv.config({ path: __dirname+'/.env' });
// require('dotenv').config()

// Free Test USDC

const IPLDiamond = async (signer?:any) => {
    let customP = signer || cProvider
    let contractInstance = new ethers.Contract(
        "0xb483aE4D4dE9F0E341d13Ff0A9B3530E84265352", 
        ProofOfLessAbi, 
        customP
    );
    return contractInstance;
} 

export default IPLDiamond;
