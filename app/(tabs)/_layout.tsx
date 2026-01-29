// // app/(tabs)/_layout.tsx
//
// import { Tabs } from 'expo-router';
// import { Wallet, User } from 'lucide-react-native'; // example icons
//
// export default function TabLayout() {
//     return (
//         <Tabs
//             screenOptions={{
//                 headerShown: false,
//                 tabBarStyle: { backgroundColor: '#0F172A' },
//                 tabBarActiveTintColor: '#3B82F6',
//                 tabBarInactiveTintColor: '#94A3B8',
//             }}
//         >
//             <Tabs.Screen
//                 name="index"
//                 options={{
//                     title: 'Home',
//                     tabBarIcon: ({ color, size }) => <Wallet size={size} color={color} />,
//                 }}
//             />
//
//             <Tabs.Screen
//                 name="profile"
//                 options={{
//                     title: 'Profile',
//                     tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
//                 }}
//             />
//         </Tabs>
//     );
// }