import React from 'react';

import LoginBg from '@/public/login-bg.jpg'
import Logo from '@/public/logo.png'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { DefaultFooter, LoginForm, ProFormText } from '@ant-design/pro-components';

const Login: React.FC = () => {

  return (
    <div className="relative flex flex-col h-[100vh] overflow-hidden">
      {/* 背景层 */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat bg-center opacity-75 z-0"
        style={{ backgroundImage: `url(${LoginBg})` }}
      />

      {/* 前景层 */}
      <div className="relative z-10 flex-1 py-8">
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          title={<img style={{ width: 46 }} alt="logo" src={Logo} />}
          subTitle={'火狐之茵后台管理'}
          actions={[]}
          onFinish={async () => {
            // await handleSubmit(values as API.LoginParams);
          }}
        >
          <>
            <ProFormText
              name="email"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined />,
              }}
              placeholder={'用户名'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名',
                },
                {
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: '请输入正确邮箱格式',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined />,
              }}
              placeholder={'密码'}
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}
            />
          </>
          <div
            style={{
              marginBottom: 24,
              textAlign: 'right',
            }}
          />
        </LoginForm>
      </div>

      {/* 页脚层 */}
      <DefaultFooter
        style={{
          background: 'none',
          zIndex: 10,
          position: 'relative',
        }}
        links={[
          {
            href: '',
            key: 'hhzy',
            title: '火狐之茵足球俱乐部',
          },
        ]}
      />
    </div>
  );
};

export default Login;
