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
        "0x981AE30Ae369b4F8acee7FBCF5B097F1E7c74C6D", 
        ProofOfLessAbi, 
        customP
    );
    return contractInstance;
} 

export default IPLDiamond;
