import erc20abi from "./PoLUsdc.json";
import {ethers} from "ethers"
import cProvider from "./cProvider";
// import * as dotenv from "dotenv";
// dotenv.config({ path: __dirname+'/.env' });
// require('dotenv').config()

// Free Test USDC

const PLUsdc = async (signer:any) => {

    let customP = signer || cProvider

    let contractInstance = new ethers.Contract(
        "0x7EfdfE55E15c978a8dc7F9dBf51c2997Ca8fA3f6", 
        erc20abi.abi, 
        customP
    );
    return contractInstance;
} 

export default PLUsdc;
