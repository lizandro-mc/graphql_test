import { makeExecutableSchema } from '@graphql-tools/schema'

const typeDefinitions = /* GraphQL */ `
  type Query {
    info: String!
    feed: [Link!]!
  }
 
  type Link {
    id: ID!
    description: String!
    url: String!
  }
`

// 1 The Link type defines the TypeScript object structure that we wish to use in our code
type Link = {
    id: string
    url: string
    description: string
}


/*
  2. The links variable is used to store the links at runtime. 
  For now, everything is stored only in-memory rather than being persisted in a database
*/
const links: Link[] = [
    {
      id: 'link-0',
      url: 'https://graphql-yoga.com',
      description: 'The easiest way of setting up a GraphQL server'
    }
]


/* 
  3. You're adding a new resolver for the feed root field. Notice that a resolver always has to be named exactly after the corresponding field from the schema definition
  .
*/
const resolvers = {
    Query: {
      info: () => `This is the API of a Hackernews Clone`,
      // 3
      feed: () => links
    },
   /*
    4. Finally, you're adding three more resolvers for the fields on the Link type from the schema definition. We'll discuss what the parent argument that's passed into the resolver here is in a bit

    The implementation of the Link resolvers is trivial, you can omit them and the server will work in the same way as it did before 👌. We just wanted you to understand what's happening under the hood 🚗.
   */ 
    Link: {
      id: (parent: Link) => parent.id,
      description: (parent: Link) => parent.description,
      url: (parent: Link) => parent.url
    }
}


export const schema = makeExecutableSchema({
    resolvers: [resolvers],
    typeDefs: [typeDefinitions]
  })