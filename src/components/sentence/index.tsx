import { Image, View } from "@tarojs/components";
import type { FC } from "react";
import { useEffect, useState } from "react";

import { Preview } from "@/utils/preview";

import styles from "./index.module.scss";
import { requestOneSentence } from "./model";

export const Sentence: FC = () => {
  const [image, setImage] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    requestOneSentence().then(res => {
      if (res) {
        setImage(res.image);
        setNote(res.note);
        setContent(res.content);
      }
    });
  }, []);

  return (
    <View>
      <View className={styles.content}>{note}</View>
      <View className={styles.content}>{content}</View>
      <Image
        className={styles.image}
        src={image}
        mode="aspectFill"
        onClick={() => Preview.image(image)}
      ></Image>
    </View>
  );
};
