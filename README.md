# Gatsby Firebase Source for gatsby v3


## add plugin to gatsby-config with options:
```
{
  // point to the firebase private key downloaded
  credential: require("./firebase-service-account.json"),
  // your firebase database root url
  databaseURL: "https://<DATABASE_NAME>.<REGION>.firebasedatabase.app/",
  types:[
    {
      type: "Product",  // this will be allProduct in GraphQL query
      path: "products", // reference
    // optional
      query: ref => ref.limitToLast(10), 
      node: (node)=> node
    }
  ]
}
```

donate eth 💸 0x14e0e2b13814526797b6f10676d69498bcd9b411

![eth address](https://github.com/apotox/gatsby-source-firebase-v3/blob/master//asserts/eth_wallet.png?raw=true)
