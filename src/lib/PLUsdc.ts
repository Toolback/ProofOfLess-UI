import erc20abi from "./PoLUsdc.json";
import {ethers} from "ethers"
import cProvider from "./cProvider";
// import * as dotenv from "dotenv";
// dotenv.config({ path: __dirname+'/.env' });
// require('dotenv').config()

// Free Test USDC

const PLUsdc = async (signer?:any) => {

    let customP = signer || cProvider

    let contractInstance = new ethers.Contract(
        "0xb17ddD9426d3BCA925C48b24D9179B3B77162e51", 
        erc20abi.abi, 
        customP
    );
    return contractInstance;
} 

export default PLUsdc;
