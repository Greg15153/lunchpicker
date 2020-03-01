import { Affix, Icon, Input, Layout, Menu } from 'antd'
import { AppProps } from 'next/app'
import Head from 'next/head'
import React, { useState } from 'react'

function LunchApp({ Component, pageProps }: AppProps): React.ReactElement {
    const [collapsed, setCollapsed] = useState(false)
    return (
        <>
            <Head>
                <title>Lunch Picker</title>
            </Head>
            <Layout style={{ minHeight: '100vh' }}>
                <Layout>
                    <Layout.Sider collapsible collapsed={collapsed} onCollapse={(): void => setCollapsed(s => !s)}>
                        <Menu theme="dark" mode="inline">
                            <Menu.Item key="1">
                                <Icon type="search" />
                                <span>Option 1</span>
                            </Menu.Item>
                        </Menu>
                    </Layout.Sider>
                    <Layout.Content className="main">
                        <Component {...pageProps} />
                        <Affix style={{ position: 'absolute', bottom: 0 }}>
                            <Layout.Footer>{'Footer content'}</Layout.Footer>
                        </Affix>
                    </Layout.Content>
                </Layout>
            </Layout>
        </>
    )
}

export default LunchApp
