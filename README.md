# EthAddr

256 bit HD wallet address by combining 64 secret chunk bits and 192 random bits to generate entropy, this provides a small probability of an HD wallet with an address sequence of numbers zero up to 40 times in a row. (e.g., 0x0000000000000000000000000000000000000000)

## SAFETY BY DESIGN

Doesn't require any audits, but still guarantee safe usage.

## Output

For example, you can check entropy or phrases in [BIP39](https://github.com/iancoleman/bip39) online/offline. Even if it is true, never use this exposed address for personal purposes.

```json
{
  "provider": null,
  "address": "0x00000022CC194E7041fbA7f7057FA9B3c07EB16C",
  "publicKey": "0x0338da286dd53503b6fc59e93b77a4b08194c08c51af1a44e03bc744669f631a02",
  "fingerprint": "0x15474d46",
  "parentFingerprint": "0x34f66838",
  "mnemonic": {
    "phrase": "believe vivid when account shove give hero include alone fetch puzzle bread step sentence banana common target caught input stumble ranch oxygen sunset venue",
    "password": "",
    "wordlist": {
      "locale": "en"
    },
    "entropy": "0x14bea7e880cc70c4dad39306eaaabb8dbd5787c48973dde48dd2ebdb193cb667"
  },
  "chainCode": "0x062cb94e32eee7f0cb61d01d3b24625b7c182c8909183ebdcf3c8a7fc659383f",
  "path": "m/44'/60'/0'/0/0",
  "index": 0,
  "depth": 5
}
```
