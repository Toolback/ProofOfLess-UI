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
        "0x4cc5C2d640b85ed096964C452a60D9d3F00a7571", 
        ProofOfLessAbi, 
        customP
    );
    return contractInstance;
} 

export default IPLDiamond;
