import { CACHE, PROD_HOST } from "@/utils/constant";
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
      return HTTP.request<{ data: SentenceType }>({
        url: PROD_HOST + "/ultra/sentence",
        cookie: false,
      }).then(res => {
        if (res.statusCode === 200 && res.data && res.data.data.note) {
          const data = res.data.data;
          return {
            note: data.note,
            content: data.content,
            image: data.image,
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
