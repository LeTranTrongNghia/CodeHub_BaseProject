import React from 'react';
import { Tabs } from 'antd';
import CodeEditorWrapper from '../Code_Editor/code_editor';
import App from '../main/App.jsx';
import './custom-tabs.css';

const onChange = (key) => {
    console.log(key);
};

const items = [
    {
        key: '1',
        label: 'Code Editor',
        children: <CodeEditorWrapper />,
    },
    {
        key: '2',
        label: 'Chat AI',
        children: <App />,
    },
];

const MyTabs = () => (
    <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        style={{
            paddingLeft: 10,
            paddingRight: 10, // Adjust padding as needed (in pixels)
            backgroundColor: '#111827', // Adjust background color (hex code)
            color: '#e0e0e0', // Adjust text color (hex code)
        }}
    />
);

export default MyTabs;
