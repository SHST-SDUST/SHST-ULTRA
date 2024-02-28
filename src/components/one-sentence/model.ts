import { CACHE } from "@/utils/constant";
import { DateTime } from "@/utils/datetime";
import { HTTP } from "@/utils/request";
import { LocalStorage } from "@/utils/storage";

type SentenceType = {
  image: string;
  note: string;
  content: string;
};

export const requestOneSentence = (): Promise<SentenceType | null> => {
  return LocalStorage.getPromise<SentenceType>(CACHE.SENTENCE)
    .then(res => {
      if (res) return res;
      return null;
    })
    .then(cache => {
      if (cache) return Promise.resolve(cache);
      return HTTP.request<unknown>({
        url: "https://sentence.iciba.com/api/sentence/list?limit=1",
        cookie: false,
      }).then(res => {
        if (res.statusCode === 200) {
          // @ts-expect-error TODO: 标注类型
          const data = res.data.data.sentenceViewList[0].dailysentence;
          return {
            note: data.note,
            content: data.content,
            image: data.picture2,
          };
        } else {
          return LocalStorage.getPromise<SentenceType>(CACHE.SENTENCE_LONG);
        }
      });
    })
    .then(res => {
      if (res) {
        LocalStorage.setPromise(CACHE.SENTENCE_LONG, res);
        LocalStorage.setPromise(CACHE.SENTENCE, res, new DateTime().nextDay());
      }
      return res;
    });
};
