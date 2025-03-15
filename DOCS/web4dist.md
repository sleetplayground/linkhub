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
w3 space create <name>

# List all spaces
w3 space ls

# Switch to a different space
w3 space use <name>

# Delete a space
w3 space delete <name>
```

Upload files and directories:
```sh
# Upload a single file
w3 put /path/to/file.txt

# Upload a directory
w3 put /path/to/directory

# Upload with custom name
w3 put --name "my-backup" /path/to/files

# Upload with specific CID version (v0 or v1)
w3 put --cid-version 1 /path/to/files
```

List uploads:
```sh
# List all uploads
w3 ls

# List recent uploads
w3 ls --recent

# List uploads with specific name
w3 ls --name "my-backup"
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


