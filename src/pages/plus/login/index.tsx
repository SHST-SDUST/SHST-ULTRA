import { Canvas, Image, Input, Switch, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { cs } from "laser-utils";
import React, { useEffect, useState } from "react";

import { Icon } from "@/components/icon";
import { LOGO } from "@/pages/user/index/constant";
import { App } from "@/utils/app";
import { Clipboard } from "@/utils/clipboard";
import { CACHE, PATH } from "@/utils/constant";
import { Nav } from "@/utils/nav";
import { LocalStorage } from "@/utils/storage";
import { Toast } from "@/utils/toast";

import { identifyCaptcha } from "./captcha";
import styles from "./index.module.scss";
import {
  BASE64_PREFIX,
  CANVAS_ID,
  CAPTCHA_HEIGHT,
  CAPTCHA_WIDTH,
  loginApp,
  requestForVerifyCode,
} from "./model";

export default function Index() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [base64Captcha, setBase64Captcha] = useState<string | null>(null);

  const login = () => {
    if (account.length == 0 || password.length == 0 || code.length == 0) {
      Toast.info("用户名/密码/验证码不能为空");
      return void 0;
    }
    loginApp(account, password, code).then(res => {
      if (res.status === 1) {
        LocalStorage.setPromise(CACHE.USER, { account, password });
        Nav.launch(PATH.HOME);
        App.init();
      } else if (res.status === 2) {
        Toast.info(res.msg);
        setStatus(res.msg);
        loadVerifyCode();
      }
    });
  };

  const loadVerifyCode = () => {
    requestForVerifyCode().then(res => {
      const base64 = Taro.arrayBufferToBase64(res);
      setBase64Captcha(base64);
      identifyCaptcha(base64).then(captcha => {
        setCode(captcha || "");
      });
    });
  };

  useEffect(() => {
    loadVerifyCode();
    LocalStorage.getPromise<{ account: string; password: string }>(CACHE.USER).then(res => {
      if (res && res.account && res.password) {
        setAccount(res.account);
        setPassword(res.password);
      }
    });
  }, []);

  return (
    <React.Fragment>
      <View className="x-center">
        <Image className={styles.img} src={LOGO}></Image>
      </View>

      <View>
        <View className={styles.inputContainer}>
          <View className={cs("y-center x-full", styles.inputView)}>
            <Icon type="account" className={styles.inputViewIcon}></Icon>
            <Input
              value={account}
              onInput={e => setAccount(e.detail.value)}
              className="a-input x-full"
              name="account"
              placeholder="账号"
              type="number"
            />
          </View>
          <View className={cs("y-center x-full a-lmt", styles.inputView)}>
            <Icon type="password" className={styles.inputViewIcon}></Icon>
            <Input
              value={password}
              onInput={e => setPassword(e.detail.value)}
              className="a-input x-full"
              name="password"
              placeholder="密码"
              password={hidePassword}
            />
            <Switch onChange={() => setHidePassword(!hidePassword)}></Switch>
          </View>
          <View className={cs("y-center x-full a-lmt", styles.inputView)}>
            <Icon type="tupian" className={styles.inputViewIcon}></Icon>
            <Input
              value={code}
              onInput={e => setCode(e.detail.value)}
              className="a-input x-full"
              name="code"
              placeholder="验证码"
            />
            {base64Captcha && (
              <Image
                src={BASE64_PREFIX + base64Captcha}
                className={styles.verifyCode}
                onClick={loadVerifyCode}
              ></Image>
            )}
          </View>
        </View>
        <View className="a-flex a-lmt">
          <View className="a-btn a-btn-blue a-btn-large a-lmt a-flex-full" onClick={login}>
            登录
          </View>
        </View>
      </View>

      <View className={cs(styles.tips, "a-flex-space-between")}>
        <View>请输入强智系统账号密码</View>
      </View>
      <View className={cs(styles.status, "a-lmt")}>{status}</View>

      <View className={styles.prompt}>
        <View>提示：</View>
        <View>
          1. 账号密码与
          <Text
            className="a-link"
            onClick={() => Clipboard.copy("https://jwgl.sdust.edu.cn/jsxsd/")}
          >
            强智教务系统
          </Text>
          账号密码保持一致。
        </View>
        <View>2. 密码中使用某些特殊符号会导致无法登录，但不是所有的符号都不行，请悉知。</View>
        <View>3. 由于强智教务系统只对本科生开放，研究生暂时无法登录。</View>
        <View>4. 山科小站系个人业余开发项目，所提供的数据仅供参考，一切以教务系统为准。</View>
      </View>

      <Canvas
        canvasId={CANVAS_ID}
        width={CAPTCHA_WIDTH + "px"}
        height={CAPTCHA_HEIGHT + "px"}
        className={styles.canvas}
      ></Canvas>
    </React.Fragment>
  );
}
