import { Dropdown } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { ReactNode } from 'react';

const AvatarDropdown = ({ children }: { children: ReactNode }) => {
  const menus =  [
    {
      key: 'center',
      icon: <UserOutlined />,
      label: '个人中心',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ]

  const onMenuClick = () => {

  }

  return <Dropdown
    menu={{
      selectedKeys: [],
      onClick: onMenuClick,
      items: menus,
    }}
  >
    {children}
  </Dropdown>
}

export default AvatarDropdown;