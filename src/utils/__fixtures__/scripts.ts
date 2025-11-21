const VALID_PUBKEY = new Uint8Array([
	0x02, 0x79, 0xbe, 0x66, 0x7e, 0xf9, 0xdc, 0xbb, 0xac, 0x55, 0xa0, 0x62, 0x95,
	0xce, 0x87, 0x0b, 0x07, 0x02, 0x9b, 0xfc, 0xdb, 0x2d, 0xce, 0x28, 0xd9, 0x59,
	0xf2, 0x81, 0x5b, 0x16, 0xf8, 0x17, 0x98,
]);

export const scriptFixtures = {
	// P2PKH: OP_DUP OP_HASH160 <20 bytes> OP_EQUALVERIFY OP_CHECKSIG
	p2pkh: new Uint8Array([
		0x76,
		0xa9,
		0x14,
		...new Array(20).fill(0x00),
		0x88,
		0xac,
	]),

	// P2SH: OP_HASH160 <20 bytes> OP_EQUAL
	p2sh: new Uint8Array([0xa9, 0x14, ...new Array(20).fill(0x00), 0x87]),

	// P2WPKH: OP_0 <20 bytes>
	p2wpkh: new Uint8Array([0x00, 0x14, ...new Array(20).fill(0x00)]),

	// P2WSH: OP_0 <32 bytes>
	p2wsh: new Uint8Array([0x00, 0x20, ...new Array(32).fill(0x00)]),

	// P2TR (Taproot): OP_1 <32 bytes>
	p2tr: new Uint8Array([0x51, 0x20, ...new Array(32).fill(0x00)]),

	// P2PK: <33 bytes compressed pubkey> OP_CHECKSIG
	p2pk: new Uint8Array([0x21, ...VALID_PUBKEY, 0xac]),

	// P2MS (1-of-1): OP_1 <pubkey> OP_1 OP_CHECKMULTISIG
	p2ms: new Uint8Array([
		0x51, // OP_1 (M=1)
		0x21, // push 33 bytes
		...VALID_PUBKEY,
		0x51, // OP_1 (N=1)
		0xae, // OP_CHECKMULTISIG
	]),

	// OP_RETURN (embed)
	embed: new Uint8Array([0x6a, 0x04, ...new Array(4).fill(0xaa)]),

	// Unknown/invalid script
	unknown: new Uint8Array([0xff, 0xfe, 0xfd]),
};

export const witnessFixtures = {
	// P2WPKH witness: 2 items (signature + pubkey)
	p2wpkh: new Uint8Array([
		0x02, // 2 items
		0x47, // 71 bytes
		...new Array(71).fill(0xaa),
		0x21, // 33 bytes
		...new Array(33).fill(0xbb),
	]),

	// P2WSH witness: 3+ items (signatures + script)
	p2wsh: new Uint8Array([
		0x03, // 3 items
		0x47, // 71 bytes
		...new Array(71).fill(0xaa),
		0x47, // 71 bytes
		...new Array(71).fill(0xbb),
		0x20, // 32 bytes
		...new Array(32).fill(0xcc),
	]),

	// Empty witness
	empty: new Uint8Array([0x00]),
};
