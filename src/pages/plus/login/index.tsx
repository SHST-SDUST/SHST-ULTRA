import { Image, Input, Switch, Text, View } from "@tarojs/components";
import { cs } from "laser-utils";
import React, { useState } from "react";

import { Icon } from "@/components/icon";
import { PATH } from "@/config/page";
import { useOnLoadEffect } from "@/hooks/use-onload-effect";
import { LOGO } from "@/pages/user/index/constant";
import { App } from "@/utils/app";
import { CACHE } from "@/utils/constant";
import { Nav } from "@/utils/nav";
import { LocalStorage } from "@/utils/storage";
import { Toast } from "@/utils/toast";

import styles from "./index.module.scss";
import { loginApp, requestForVerifyCode } from "./model";

export default function Index() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [base64Code, setBase64Code] = useState("");
  const [status, setStatus] = useState("");
  const [resetApp, setResetApp] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const restartApp = () => {
    Toast.confirm("提示", "确定要重载小程序吗？").then(res => {
      if (res) {
        App.data.openid = "";
        App.data.isInitialized = false;
        App.data.isSHSTLogin = false;
        App.data.isPLUSLogin = false;
        App.init();
        Nav.launch(PATH.HOME);
      }
    });
  };

  const login = () => {
    if (account.length == 0 || password.length == 0 || code.length == 0) {
      Toast.info("用户名/密码/验证码不能为空");
      return void 0;
    }
    loginApp(account, password, code).then(res => {
      if (res.status === 1) {
        LocalStorage.setPromise(CACHE.USER, { account, password });
        App.data.isPLUSLogin = true;
        Nav.back();
      } else if (res.status === 2) {
        Toast.info(res.msg);
        setStatus(res.msg);
      } else if (res.status === 3) {
        setResetApp(true);
        setStatus(res.msg);
      }
    });
  };

  const loadVerifyCode = () => {
    requestForVerifyCode().then(res => {
      setBase64Code(res.data.img);
      setCode(res.data.code);
    });
  };

  useOnLoadEffect(() => {
    loadVerifyCode();
    LocalStorage.getPromise<{ account: string; password: string }>(CACHE.USER).then(res => {
      if (res && res.account && res.password) {
        setAccount(res.account);
        setPassword(res.password);
      }
    });
  });

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
            {base64Code === "refresh" ? (
              <View className={cs(styles.verifyCode, "x-center y-center")} onClick={loadVerifyCode}>
                <View className="a-color-grey a-fontsize-11">点击刷新</View>
              </View>
            ) : (
              <Image
                src={"data:image/jpg;base64," + base64Code}
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
      {resetApp && (
        <View className={cs(styles.status, "a-lmt")} onClick={restartApp}>
          初始化信息失败 点我重载小程序
        </View>
      )}

      <View className={styles.prompt}>
        <View>提示：</View>
        <View>1. 账号密码与强智教务系统账号密码保持一致。</View>
        <View>2. 密码中使用某些特殊符号会导致无法登录，但不是所有的符号都不行，请悉知。</View>
        <View>
          <Text decode>
            3. 长时间未操作小程序会断开链接，如果一直出现Auth Error或者信息初始化失败请&nbsp;&nbsp;
          </Text>
          <Text decode className="l-lml a-link" onClick={restartApp}>
            点我重载小程序
          </Text>
          <Text>&nbsp;&nbsp;。</Text>
        </View>
        <View>4. 由于强智教务系统只对本科生开放，研究生暂时无法登录。</View>
        <View>5. 山科小站系个人业余开发项目，所提供的数据仅供参考，一切以教务系统为准。</View>
      </View>
    </React.Fragment>
  );
}
