let key = {};

if (process.env.NODE_ENV === 'production') {

    key = {
        secretOrKey: "SDRFCVG@!$", //!#@ISWAP258@!$
        mongoURI: "mongodb://Jzdwey:K6hdt675de9@161.97.174.143:11438/gsedb",
        port: 2053,
        siteUrl: 'https://intercroneswap.finance/',
        fullHost: "https://api.trongrid.io",
        owneraddress: "TZ96hJzGCfqXFHEcxbtYCNhQShycRVd4jj",
        router: "TXjGFNPUrHDcN8Gp5aGMN6Cr3PUtBHwzrW"
    };

} else {
    console.log("Set Development Config");
    key = {
        secretOrKey: "SDRFCVG@!$",
        mongoURI: "mongodb://localhost:27017/iswap",
        port: 2053,
        siteUrl: 'http://localhost:3000',
        fullHost: "https://api.trongrid.io",
        owneraddress: "TZ96hJzGCfqXFHEcxbtYCNhQShycRVd4jj",
        router: "TXjGFNPUrHDcN8Gp5aGMN6Cr3PUtBHwzrW"
    };
}

export default key;
