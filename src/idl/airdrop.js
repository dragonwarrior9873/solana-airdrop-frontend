export const IDL = {
  "version": "0.1.0",
  "name": "airdrop",
  "constants": [
    {
      "name": "AIRDROP_SEED",
      "type": "bytes",
      "value": "[65, 73, 82, 68, 82, 79, 80, 95, 83, 69, 69, 68]"
    }
  ],
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "airdrop",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createAirdrop",
      "accounts": [
        {
          "name": "airdropInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tokenMintAddress",
          "type": "publicKey"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "endTime",
          "type": "u64"
        },
        {
          "name": "identifier",
          "type": "u8"
        }
      ]
    },
    {
      "name": "depositToken",
      "accounts": [
        {
          "name": "mintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "airdropAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "fromAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "toAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "airdropInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "identifier",
          "type": "u8"
        }
      ]
    },
    {
      "name": "claimToken",
      "accounts": [
        {
          "name": "mintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "airdropAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "depositedTokenAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "claimerAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "airdropInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "claimer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "identifier",
          "type": "u8"
        }
      ]
    },
    {
      "name": "withdrawToken",
      "accounts": [
        {
          "name": "mintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "airdropAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "fromAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "toAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "airdropInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "identifier",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "AirdropInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenMintAddress",
            "type": "publicKey"
          },
          {
            "name": "depositTokenAmount",
            "type": "u64"
          },
          {
            "name": "airdropTokenAmount",
            "type": "u64"
          },
          {
            "name": "endTime",
            "type": "u64"
          },
          {
            "name": "isLive",
            "type": "bool"
          },
          {
            "name": "identifier",
            "type": "u8"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "authority1",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "UserInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "claimAmount",
            "type": "u64"
          },
          {
            "name": "claimTime",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "Airdrop",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenAmount",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Unauthorized",
      "msg": "You are not authorized to perform this action."
    },
    {
      "code": 6001,
      "name": "Overhardcap",
      "msg": "Over hardcap amount."
    },
    {
      "code": 6002,
      "name": "NotAllowed",
      "msg": "Not allowed"
    },
    {
      "code": 6003,
      "name": "NotAllowedToken",
      "msg": "Not allowed tokens."
    },
    {
      "code": 6004,
      "name": "MathOverflow",
      "msg": "Math operation overflow"
    },
    {
      "code": 6005,
      "name": "AlreadyMarked",
      "msg": "Already marked"
    },
    {
      "code": 6006,
      "name": "AirdropNotStarted",
      "msg": "Airdop not started yet"
    },
    {
      "code": 6007,
      "name": "AirdropEnded",
      "msg": "Airdop already ended"
    },
    {
      "code": 6008,
      "name": "TokenAmountMismatch",
      "msg": "Token amount mismatch"
    },
    {
      "code": 6009,
      "name": "InsufficientFund",
      "msg": "Insufficient Tokens"
    },
    {
      "code": 6010,
      "name": "AirdropNotEnded",
      "msg": "Airdrop not ended yet"
    }
  ],
  "metadata": {
    "address": "HsCuSwUHACZSPvKxMSnMMKeoHxNe1n2TsvzE5KJwB4Mp"
  }
};