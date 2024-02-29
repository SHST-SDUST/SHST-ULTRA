import { RichText } from "@tarojs/components";
import React, { useState } from "react";

import { Banner } from "@/components/banner";
import { Gap } from "@/components/gap";
import { Layout } from "@/components/layout";
import { useOnLoadEffect } from "@/hooks/use-onload-effect";

import styles from "./index.module.scss";
import { type Announce, requestForAnnounce } from "./model";

export default function Index() {
  const [list, setList] = useState<Announce[]>([]);

  useOnLoadEffect(() => {
    requestForAnnounce().then(res => {
      res && setList(res);
    });
  });

  return (
    <React.Fragment>
      <Banner title="公告"></Banner>
      <Gap size={10}></Gap>
      {list.map((item, index) => (
        <Layout key={index}>
          <RichText nodes={item.announce} className={styles.announce}></RichText>
        </Layout>
      ))}
    </React.Fragment>
  );
}

Index.onShareAppMessage = () => void 0;
Index.onShareTimeline = () => void 0;
