import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import bootstrap from 'bootstrap'


const WalletCardEthers = () => {

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect to MetaMask');
	//const [tokenButtonText, setTokenButtonText] = useState('Display Token');
	const [provider, setProvider] = useState(null);
	const [grabContract, setGrabContract] = useState(null);
	const [grabSymbol, setGrabSymbol] = useState(null);
	const [grabDecimal, setGrabDecimal] = useState(null);
	const [grabBalance, setGrabBalance] = useState(null);


	const grabToken = {
		address: "0x20cB1493B534277313782C5dF8A43070f5e41923",
		abi: [
			{
				"inputs": [],
				"stateMutability": "nonpayable",
				"type": "constructor"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"indexed": true,
						"internalType": "address",
						"name": "spender",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "value",
						"type": "uint256"
					}
				],
				"name": "Approval",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "from",
						"type": "address"
					},
					{
						"indexed": true,
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "value",
						"type": "uint256"
					}
				],
				"name": "Transfer",
				"type": "event"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "spender",
						"type": "address"
					}
				],
				"name": "allowance",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "spender",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"name": "approve",
				"outputs": [
					{
						"internalType": "bool",
						"name": "",
						"type": "bool"
					}
				],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "account",
						"type": "address"
					}
				],
				"name": "balanceOf",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "decimals",
				"outputs": [
					{
						"internalType": "uint8",
						"name": "",
						"type": "uint8"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "spender",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "subtractedValue",
						"type": "uint256"
					}
				],
				"name": "decreaseAllowance",
				"outputs": [
					{
						"internalType": "bool",
						"name": "",
						"type": "bool"
					}
				],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "spender",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "addedValue",
						"type": "uint256"
					}
				],
				"name": "increaseAllowance",
				"outputs": [
					{
						"internalType": "bool",
						"name": "",
						"type": "bool"
					}
				],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "name",
				"outputs": [
					{
						"internalType": "string",
						"name": "",
						"type": "string"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "symbol",
				"outputs": [
					{
						"internalType": "string",
						"name": "",
						"type": "string"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "totalSupply",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "recipient",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"name": "transfer",
				"outputs": [
					{
						"internalType": "bool",
						"name": "",
						"type": "bool"
					}
				],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "sender",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "recipient",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"name": "transferFrom",
				"outputs": [
					{
						"internalType": "bool",
						"name": "",
						"type": "bool"
					}
				],
				"stateMutability": "nonpayable",
				"type": "function"
			}
		],
	};

	const connectWalletHandler = () => {

		if (window.ethereum && defaultAccount == null) {
			// set ethers provider
			setProvider(new ethers.providers.Web3Provider(window.ethereum));
			console.log(provider);
			// connect to metamask
			window.ethereum.request({ method: 'eth_requestAccounts' })
				.then(result => {
					setConnButtonText('Wallet Connected');
					setDefaultAccount(result[0]);

				}).then(displayTokenHandler)
				.catch(error => {
					setErrorMessage(error.message);
				});



		} else if (!window.ethereum) {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	const displayTokenHandler = () => {
		if (grabContract != null) {

			async function getSymbol() {
				let symbol = await grabContract.symbol();
				return symbol;
			}
			let symbol = getSymbol();
			symbol.then(x => setGrabSymbol(x.toString()));

			async function getDecimal() {
				let decimal = await grabContract.decimals();
				return decimal;
			}
			let decimal = getDecimal();
			decimal.then(x => setGrabDecimal(x.toString()));

			async function getBalance() {
				let signer = provider.getSigner();
				let balance = await grabContract.balanceOf(signer.getAddress());
				return balance;
			}
			let balance = getBalance();
			balance.then(x => setGrabBalance(x.toString()));
		}


	}

	useEffect(() => {
		if (defaultAccount) {
			provider.getBalance(defaultAccount)
				.then(balanceResult => {
					setUserBalance(ethers.utils.formatEther(balanceResult));
				})
			let noProviderAbort = true;
			let signer;



			try {
				signer = provider.getSigner();
				console.log(signer);
				setGrabContract(new ethers.Contract(grabToken.address, grabToken.abi, signer));

				noProviderAbort = false;
			} catch (e) {
				noProviderAbort = true;
				console.log(e);
			}




		};


	}, [defaultAccount]);

	let coinObj = [
		{
			"name": "ethereum",
			"symbol": "ETH",
			"decimal": 18,
			"balance": userBalance
		},
		{
			"name": "grabToken",
			"symbol": grabSymbol,
			"decimal": grabDecimal,
			"balance": grabBalance
		}
	]



	return (
		<div className='walletCard m-3'>
			{
				Boolean(defaultAccount)
					? <div className="container m-3 mx-auto" style={{ width: "20rem" }}>
						<div className="d-flex justify-content-center">
							<button className='btn btn-primary' onClick={displayTokenHandler}>Display Token</button>
						</div>
						{coinObj.map((token) => {
							return (
								token.symbol &&
								<div className="row justify-content-center m-3">
									<div className="card" style={{ width: "18rem" }}>
										<div className="card-body">
											<h5 className="card-title">{token.symbol}</h5>
											<h6 className="card-subtitle mb-2 text-muted">{token.name}</h6>
											<p className="card-text">{`Balance: ${token.balance}`}</p>
										</div>
									</div>
								</div>)
						})}
						<div className="d-flex justify-content-center">
							<p>{`${defaultAccount}`}</p>
						</div>
					</div>
					: <div className="d-flex justify-content-center">
						<button className='btn btn-primary' onClick={connectWalletHandler}>{connButtonText}</button>
					</div>

			}
			{errorMessage}
		</div>
	);
}

export default WalletCardEthers;