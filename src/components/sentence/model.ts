import { CACHE, PROD_HOST } from "@/utils/constant";
import { DateTime } from "@/utils/datetime";
import { to } from "@/utils/native";
import { HTTP } from "@/utils/request";
import { LocalStorage } from "@/utils/storage";

type SentenceType = {
  image: string;
  note: string;
  content: string;
};

const FALLBACK: SentenceType = {
  content:
    "A goal is not always meant to be reached, and it often serves simply as something to aim at.",
  image: "https://staticedu-wps.cache.iciba.com/image/fda020180ea06dda4d56c3757352a55d.jpg",
  note: "目标并不一定总是用于去达成的，很多时候它仅仅是为了给你方向感。",
};

export const requestOneSentence = async (): Promise<SentenceType> => {
  const cache = await LocalStorage.getPromise<SentenceType>(CACHE.SENTENCE);
  if (cache) return cache;
  const [err, res] = await to(
    HTTP.request<{ data: SentenceType }>({
      url: PROD_HOST + "/ultra/sentence",
      cookie: false,
    })
  );
  if (!err && res.statusCode === 200 && res.data && res.data.data && res.data.data.note) {
    const data = res.data.data;
    const payload = {
      note: data.note,
      content: data.content,
      image: data.image,
    };
    LocalStorage.setPromise(CACHE.SENTENCE_LONG, payload);
    LocalStorage.setPromise(CACHE.SENTENCE, payload, new DateTime().nextDay());
    return payload;
  }
  const langCache = await LocalStorage.getPromise<SentenceType>(CACHE.SENTENCE_LONG);
  const data = langCache || FALLBACK;
  LocalStorage.setPromise(CACHE.SENTENCE_LONG, data);
  LocalStorage.setPromise(CACHE.SENTENCE, data, new DateTime().nextDay());
  return data;
};
