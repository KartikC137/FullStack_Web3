# Checking whether metamask is installed:

- Metamask when installed creates a object called `window.ethereum`. Hence just check whether the value of window.ethereum is defined.

# Connecting to Metamask wallet using eth_request method

- `ethereum.request({ method: "eth_requestAccounts" })`

# use ethers.js library:

- just import ethers

# Creating an object for contract:

- create a file to store abi and other constant values such as contract address (constants.js) and export them
- import and use ethers.Contract method which takes parameters contract address, abi and signer
- signer can be obtained from getSigner() method of ethers lib
- all the functions of the contract can now be called by using contract object
- value is sent as : `fund({value: ethers.parseEthers(ethAmount)})` for ex.

# Tell ethers who is the provider: (Metamask in this example):

- `const provider = new ethers.BrowserProvider(window.ethereum)`
