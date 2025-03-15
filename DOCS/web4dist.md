# Web4 Distribution


using https://github.com/vgrichina/web4-min-contract

first deploy web4-min-contract
```sh
near deploy linkhub.testnet web4-min.wasm
near deploy linkhub.near web4-min.wasm
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