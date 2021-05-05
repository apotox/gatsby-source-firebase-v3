const firebase = require("firebase-admin")
const crypto = require("crypto")




exports.sourceNodes = async (
  { actions,createNodeId,reporter },
  { credential, databaseURL, types, quiet = false }
) => {
  const { createNode } = actions


  firebase.initializeApp({
    credential: firebase.credential.cert(credential),
    databaseURL: databaseURL
  })

  const db = firebase.database()

  const start = Date.now()


  return  Promise.all(
    types.map(async ({ query = ref => ref, map = node => node, type, path }) =>{

      if (!quiet) {
        console.log(`\n[Firebase Source] Fetching data for ${type}...`)
      }


      const snapshot = await query(db.ref(path)).once("value")
      if (!quiet) {
          console.log(
            `\n[Firebase Source] Data for ${type} loaded in`,
            (Date.now() - start) / 1000,
            "s"
          )
      }
      const val = snapshot.val()

      return val.map((item,index) => {
        const node = map(Object.assign({}, item))

        const contentDigest = crypto
          .createHash(`md5`)
          .update(JSON.stringify(node))
          .digest(`hex`)

        createNode(
          Object.assign(node, {
            id: createNodeId(`doc-${type}-${index}`),
            parent: "root",
            children: [],
            internal: {
              type: type,
              contentDigest: contentDigest
            }
          })
        )

        return contentDigest
      })

    })
  ).catch(error=>{
    reporter.panicOnBuild(`Error while running gatsby-source-firebase-v3!. ${error.message}`)
    return
  })


}
