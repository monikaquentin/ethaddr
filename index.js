/**
 * -----------------------------------------------------------------------------------------
 * ETHAddr © 2023 Rivane Rasetiansyah
 * -----------------------------------------------------------------------------------------
 *
 * Author : <re@redvelvet.me> (https://redvelvet.me)
 * GitHub : https://github.com/monikaquentin
 * GitLab : https://gitlab.com/monikaquentin
 * MIT Licensed
 *
 */

/**
 * @fileoverview 256 bit HD wallet address by combining 64 secret chunk bits and
 * 192 random bits to generate entropy, this provides a small probability of
 * an HD wallet with an address sequence of numbers zero up to 40 times
 * in a row. (e.g., 0x0000000000000000000000000000000000000000)
 */

// Import necessary libraries
import * as ethers from 'ethers'

import crypto from 'crypto'
import dotenv from 'dotenv'

import { existsSync, mkdirSync, writeFileSync } from 'fs'

dotenv.config()

// Constants for minimum length, minimum addresses, file path, and secret piece
const minimalLead = process.env.MINIMAL_LEAD
const minimalAddr = process.env.MINIMAL_ADDR
const addressPath = process.env.ADDRESS_PATH
const secretPiece = process.env.SECRET_PIECE

// Create the "results" folder if it doesn't exist
if (!existsSync(addressPath)) mkdirSync(addressPath)

// Generate Ethereum address prefixes with varying lengths of leading zeros
const prefixes = Array.from({ length: 34 }, (_, i) => '0x' + '0'.repeat(i + minimalLead))

/**
 * Shuffle the given array using the Fisher-Yates algorithm.
 * @param {Array} array - The array to be shuffled.
 * @returns {Array} - The shuffled array.
 */
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[randomIndex]] = [array[randomIndex], array[i]]
  }
  return array
}

/**
 * Combine two sets of bits to create a new 256-bit sequence.
 * @param {string} bit192 - The first set of 192 bits.
 * @param {string} bit64 - The second set of 64 bits to be combined.
 * @returns {string} - The combined bit sequence.
 */
const combine = (bit192, bit64) => {
  // Convert the input bit sequences into arrays for manipulation
  const bit192Array = bit192.split('')
  const bit64Array = bit64.split('')
  // Array to store positions that have been used to insert bits from bit64 into bit192
  const positions = Array.from({ length: bit192Array.length }, (_, i) => i)

  // Shuffle the array of positions to ensure randomness
  shuffleArray(positions)

  // Iterate over each character in bit64
  // Insert the character from bit64 into the generated position in bit192
  positions.forEach((position, index) => bit192Array.splice(position, 0, bit64Array[index]))

  // Join the modified bit192Array to create the final combined bit sequence
  return bit192Array.join('')
}

/**
 * Generate an HD wallet from a random mnemonic phrase.
 * @returns {Object} - The generated HD wallet.
 */
const newWallet = () => {
  // Generate random entropy (24 bytes) for creating a mnemonic phrase
  const entropy = combine(crypto.randomBytes(24).toString('hex'), secretPiece)
  // Generate a mnemonic phrase from the entropy
  const phrase = ethers.Mnemonic.fromEntropy('0x' + entropy).phrase
  // Create an HD wallet from the mnemonic phrase
  return ethers.HDNodeWallet.fromPhrase(phrase)
}

/**
 * Save the wallet information to a JSON file.
 * @param {Object} wallet - The HD wallet object.
 */
const saveToFile = (wallet) => writeFileSync(`${addressPath}/${wallet.address}.json`, JSON.stringify(wallet, null, 4))

// Counter to track the number of addresses found
let found = 0

// Loop until the required number of Ethereum addresses is found
while (found < minimalAddr) {
  // Generate a random HD wallet
  const wallet = newWallet()
  // Check if the generated address starts with ANY of the specified prefixes
  const prefixMatch = prefixes.some((prefix) => wallet.address.startsWith(prefix))

  // If a matching prefix is found,
  // store address information in the data array and write to a JSON file
  if (prefixMatch) {
    saveToFile(wallet)
    // Increment the counter for found addresses
    found++
  }
}
