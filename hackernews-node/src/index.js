const { GraphQLServer } = require('graphql-yoga')

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length

const resolvers = {
    Query: {
      info: () => `This is the API of a Hackernews Clone`,
      feed: () => links,
      link: (parent, args) => links.find(link => link.id === args.id),
    },
    Mutation: {
        // 2
        updateLink: (parent, args) => {
           links = links.map((link) => {
               if(args.id === link.id){
                   link.url = args.url
                   link.description = args.description
               }
               return link
           })
           return links
        },
        deleteLink: (parent, args) => {
            const link = links.find(link => link.id === args.id)
            links.splice(args.id, 1)
            return link
        },
        post: (parent, args) => {
            const link = {
             id: `link-${idCount++}`,
             description: args.description,
             url: args.url,
           }
           links.push(link)
           return link
        },
    },
  }

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})

server.start(() => console.log(links))