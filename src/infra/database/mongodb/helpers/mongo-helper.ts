import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  url: null as String,

  async connect (uri: string): Promise<void> {
    this.uri = uri

    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client?.isConnected()) {
      await this.connect(this.uri)
    }

    return this.client.db().collection(name)
  },

  map ({ _id, ...data }: any): any {
    return {
      id: _id,
      ...data
    }
  },

  mapCollection (collection: any[]): any[] {
    return collection.map(item => MongoHelper.map(item))
  }
}
