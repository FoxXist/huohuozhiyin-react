// 运行时配置
import logo from '@/public/logo.svg';
import AvatarDropdown from '@/layouts/components/AvatarDropdown';
import { RunTimeLayoutConfig, useModel } from '@umijs/max';
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ currentUser: { name: string }}> {
  return { currentUser: { name: '火狐之茵' } };
}

const AvatarName = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  return <span>{currentUser?.name}</span>;
};


export const layout: RunTimeLayoutConfig = () => {
  return {
    logo: logo,
    menu: {
      locale: false,
    },
    layout: 'mix',
    avatarProps: {
      src: logo,
      title: <AvatarName />,
      render: (_, defaultDom) => {
        return <AvatarDropdown>{defaultDom}</AvatarDropdown>
      },
    },
  };
};
