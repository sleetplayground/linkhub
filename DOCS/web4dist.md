# Web4 Distribution


using https://github.com/vgrichina/web4-min-contract

first deploy web4-min-contract
```sh
near deploy linkhub.testnet DOCS/web4-min.wasm
near deploy linkhub.near DOCS/web4-min.wasm
```

near cli network
```sh
export NEAR_NETWORK=testnet
export NEAR_NETWORK=mainnet
echo $NEAR_NETWORK 
echo $NEAR_ENV
```

deploy

```sh
npx web4-deploy dist linkhub.testnet --nearfs
npx web4-deploy dist linkhub.near --nearfs

npx nearfs-upload dist \
  --network testnet \
  --account-id linkhub.testnet

npx nearfs-upload dist \
  --network mainnet \
  --account-id linkhub.near
```
- can be run with or without --nearfs




also locally with ipfs
```sh
ipfs add -r dist
```



near subaccunt setup

```sh
near create-account linkhub.testnet --masterAccount linkhub.testnet --initialBalance 1
near create-account linkhub.near --masterAccount linkhub.near --initialBalance 0.5
```

remember to export account
```sh
# export
near account export-account linkhub.testnet
near account export-account linkhub.near

#view
near view-account 
```

---


## Web3.Storage Management

Check storage space and account information:
```sh
# View space information including DID and providers
w3 space info

# View account usage and limits
w3 account info
```

Manage spaces:
```sh
# Create a new space
w3 space create linkhub

# List all spaces
w3 space ls

# Switch to a different space
w3 space use linkhub

# Delete a space
w3 space delete <name>
```

Upload files and directories:
```sh
w3 up dist
```

List uploads:
```sh
# List all uploads
w3 ls
```

Manage storage:
```sh
# Get upload status
w3 status <CID>

# Pin specific CID
w3 pin add <CID>

# Remove pin
w3 pin rm <CID>
```


---

method web4_setStaticUrl

```sh

# For testnet
near call linkhub.testnet web4_setStaticUrl '{"url": "ipfs://CID_HERE"}' --accountId linkhub.testnet

# For mainnet
near call linkhub.near web4_setStaticUrl '{"url": "ipfs://CID_HERE"}' --accountId linkhub.near

```