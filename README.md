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