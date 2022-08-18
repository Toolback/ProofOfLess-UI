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
        "0x8b4D1a27183Ed1cD848AC7D345B0322575eD2B74", 
        ProofOfLessAbi, 
        customP
    );
    return contractInstance;
} 

export default IPLDiamond;
