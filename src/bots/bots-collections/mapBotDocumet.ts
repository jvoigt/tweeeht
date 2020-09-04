import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { BotDocument } from "./bots.schema";
import { TweeehtBot } from "bots/tweeht-bot.interface";

export function mapBotToDocument(bot: TweeehtBot): Partial<BotDocument> {
  const doc: Partial<BotDocument> = {
    name: bot.name,
    owners: bot.owners,
  };
  return doc;
}

export function mapToBot<T>() {
  return function (source$: Observable<BotDocument>) {
    return source$.pipe(
      map((doc: BotDocument) => mapDocumentToBot(doc))
    );
  }
}
export function mapToBots<T>() {
  return function (source$: Observable<BotDocument[]>) {
    return source$.pipe(
      map((docs: BotDocument[]) => {
        return docs.map(
          (doc: BotDocument) =>
            mapDocumentToBot(doc)
        )
      }
      )
    );
  }
}

function mapDocumentToBot(doc: BotDocument): TweeehtBot {
  const bot: TweeehtBot = {
    name: doc.name,
    id: doc._id,
    owners: doc.owners,
    content: undefined,
    output: undefined,
    sheduler: undefined,
  };
  return bot;
}
