// import {
//   Database,
//   DatabaseRecordsFactoryFull,
//   DenoKVDataProvider,
//   IDataProvider,
// } from "@fathym/state-flow";

// type User = {
//   DisplayName: string;

//   Email: string;
// };

// class TestDB extends Database {
//   public Users = this.loadRecordsFactory<
//     DatabaseRecordsFactoryFull<User>,
//     User
//   >("Users");

//   constructor(protected dataProviderFactory: <T>() => IDataProvider<T>) {
//     super(dataProviderFactory);
//   }
// }

export type KeyTypePart = Uint8Array | string | number | bigint | boolean;

export type KeyType = KeyTypePart[];

const kv = await Deno.openKv();

// const prvdrFactory = <T>() => new DenoKVDataProvider<T>(kv);

// const DB = new TestDB(prvdrFactory);

// export default DB;

export type Conversation = {
  Title?: string;
};

export type ConversationMessage = {
  Content: string;

  From: string;

  Timestamp?: Date;

  To?: string;
};

export async function addConversationMessage(
  convoId: string,
  message: ConversationMessage,
) {
  const msgId = crypto.randomUUID().toString();

  message.Timestamp = new Date();

  await kv.set(["Conversations", convoId, "Messages", msgId], message);
}

export async function listConversationMessages(
  convoId: string,
): Promise<
  { key: KeyType; value: ConversationMessage; versionstamp: string }[]
> {
  const convoMsgs = await kv.list({
    prefix: ["Conversations", convoId, "Messages"],
  });

  const messages: {
    key: KeyType;
    value: ConversationMessage;
    versionstamp: string;
  }[] = [];

  for await (const message of convoMsgs) {
    const { key, value, versionstamp } = message;

    messages.push({
      key: key as KeyType,
      value: value as ConversationMessage,
      versionstamp: versionstamp,
    });
  }

  // return messages;
  return messages.sort((a, b) => {
    if (a.value.Timestamp! < b.value.Timestamp!) {
      return -1;
    } else if (a.value.Timestamp! > b.value.Timestamp!) {
      return 1;
    } else {
      return 0;
    }
  });
}

export async function resetConversationMessages(
  convoId: string,
): Promise<{ key: KeyType; value: ConversationMessage }[]> {
  const convoMsgs = await kv.list({
    prefix: ["Conversations", convoId, "Messages"],
  });

  const messages: { key: KeyType; value: ConversationMessage }[] = [];

  for await (const message of convoMsgs) {
    const { key } = message;

    await kv.delete(key);
  }

  return messages;
}

export async function setConversation(id: string, convo: Conversation) {
  await kv.set(["Conversations", id], convo);
}
