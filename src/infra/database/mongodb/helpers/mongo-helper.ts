import { MongoClient, Collection } from 'mongodb'

import { AccountModel } from '@/domain/models/account'

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

  map ({ _id, ...collection }: any): AccountModel {
    return {
      id: _id,
      ...collection
    }
  }
}
