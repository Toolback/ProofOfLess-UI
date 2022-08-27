import { useEffect, useState, createContext, ReactNode } from 'react';
import Web3Modal from 'web3modal';
import { BigNumber, ethers } from 'ethers';
import IPLDiamond from '../PLDiamond';
import ERC20Abi from '../erc20abi2.json'

const web3modalStorageKey = 'WEB3_CONNECT_CACHED_PROVIDER';

export const WalletContext = createContext<any>({});

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [balance, setBalance] = useState<string | undefined>(undefined);
  const [userDonutId, setUserDonutId] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [userStatus, setUserStatus] = useState<string | undefined>(undefined);

  const [IDiamond, setIDiamond] = useState<any | undefined>(undefined);
  const [IMainToken, setIMainToken] = useState<any | undefined>(undefined);

  const web3Modal =
    typeof window !== 'undefined' && new Web3Modal({ cacheProvider: true });

  /* This effect will fetch wallet address if user has already connected his/her wallet */
  useEffect(() => {
    async function checkConnection() {
      try {
        if (window && window.ethereum) {
          // Check if web3modal wallet connection is available on storage
          if (localStorage.getItem(web3modalStorageKey)) {
            await connectToWallet();
          }
        } else {
          console.log('window or window.ethereum is not available');
        }
      } catch (error) {
        console.log(error, 'Catch error Account is not connected');
      }
    }
    checkConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStatus]);

  const setWalletAddress = async (provider: any) => {
    try {
      const signer = provider.getSigner();
      if (signer) {
        const web3Address = await signer.getAddress();
        setAddress(web3Address);
        getBalance(provider, web3Address);
      }
    } catch (error) {
      console.log(
        'Account not connected; logged from setWalletAddress function'
      );
    }
  };

  const getBalance = async (provider: any, walletAddress: string) => {
    let ci = await IPLDiamond(provider);
    let mainPayingToken = await ci.getMainPayingToken();
    let tokenContract = await IPayingToken(mainPayingToken, provider);
    const tokenBal = await tokenContract.balanceOf(walletAddress);
    const userBal = (Number(ethers.utils.formatEther(tokenBal))).toFixed(2);
    setIDiamond(ci);
    setIMainToken(tokenContract);
    setBalance(`${userBal} PUsdc`);
    getClientStatus(provider, walletAddress, ci);
  };

  const IPayingToken = async (tokenAddress:string, provider: any) => {
    let req = new ethers.Contract(tokenAddress, ERC20Abi, provider)
    return req; 
  }

  const getClientStatus = async (provider: any, walletAddress: string, ci:any) => {
    const reqDonutId = await ci.retrieveMemberDonutId(walletAddress);
    setUserDonutId(Number(reqDonutId));
    defineClientStatus(Number(reqDonutId))
  }

  const defineClientStatus = (parameter:number) => {
    switch(parameter){
      case undefined:
        return setUserStatus("Not Connected")
      case 0: 
        return setUserStatus("isVisitor")
      default:
        return setUserStatus("isMember")
    }
  }

  const disconnectWallet = () => {
    setAddress(undefined);
    web3Modal && web3Modal.clearCachedProvider();
  };

  const checkIfExtensionIsAvailable = () => {
    if (
      (window && window.web3 === undefined) ||
      (window && window.ethereum === undefined)
    ) {
      setError(true);
      web3Modal && web3Modal.toggleModal();
    }
  };

  const connectToWallet = async () => {
    try {
      setLoading(true);
      checkIfExtensionIsAvailable();
      const connection = web3Modal && (await web3Modal.connect());
      const provider = new ethers.providers.Web3Provider(connection);
      await subscribeProvider(connection);

      setWalletAddress(provider);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(
        error,
        'got this error on connectToWallet catch block while connecting the wallet'
      );
    }
  };

  const subscribeProvider = async (connection: any) => {
    connection.on('close', () => {
      disconnectWallet();
    });
    connection.on('accountsChanged', async (accounts: string[]) => {
      if (accounts?.length) {
        setAddress(accounts[0]);
        const provider = new ethers.providers.Web3Provider(connection);
        getBalance(provider, accounts[0]);
      } else {
        disconnectWallet();
      }
    });
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        balance,
        userDonutId,
        loading,
        error,
        connectToWallet,
        disconnectWallet,
        userStatus,
        setUserStatus,
        IDiamond,
        IMainToken
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
