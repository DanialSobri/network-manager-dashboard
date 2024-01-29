import { Avatar, Dropdown, Navbar, Text } from '@nextui-org/react';
import React from 'react';
import { useRouter } from 'next/router';
import { DarkModeSwitch } from './darkmodeswitch';

interface JwtPayload {
   // Define your JWT payload interface here
   userId: string;
   username: string;
   role: string;
 }
export const UserDropdown = ({ user }:{ user: JwtPayload | null}) => {
   const router = useRouter();

   const handleLogout = () => {
      // Perform logout action here, such as clearing authentication token, etc.
      // Then redirect to the login page
      // For example:
      // Clear token from localStorage
      localStorage.removeItem('token');
      // Redirect to the login page
      router.push(process.env.PROXY_PATH+'/login');
   };

   return (
      <Dropdown placement="bottom-right">
         <Navbar.Item>
            <Dropdown.Trigger>
               <Avatar
                  bordered
                  as="button"
                  color="gradient"
                  size="md"
                  // src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
               />
            </Dropdown.Trigger>
         </Navbar.Item>
         <Dropdown.Menu
            aria-label="User menu actions"
            onAction={(actionKey) => {
               console.log({ actionKey });
               if (actionKey === 'logout') {
                  handleLogout();
               }
            }}
         >
            <Dropdown.Item key="profile" css={{ height: '$18' }}>
               <Text b color="inherit" css={{ d: 'flex' }}>
                  Signed in as
               </Text>
               <Text b color="inherit" css={{ d: 'flex' }}>
               {(user)?user.username:"Max Musterman"}
               </Text>
            </Dropdown.Item>
            {/* <Dropdown.Item key="settings" withDivider>
               My Settings
            </Dropdown.Item>
            <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
            <Dropdown.Item key="analytics" withDivider>
               Analytics
            </Dropdown.Item>
            <Dropdown.Item key="system">System</Dropdown.Item>
            <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
            <Dropdown.Item key="help_and_feedback" withDivider>
               Help & Feedback
            </Dropdown.Item> */}
            <Dropdown.Item key="logout" withDivider color="error">
               Log Out
            </Dropdown.Item>
            <Dropdown.Item key="switch" withDivider>
               <DarkModeSwitch />
            </Dropdown.Item>
         </Dropdown.Menu>
      </Dropdown>
   );
};
