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
                <Layout.Header>
                    <div className="search-wrapper">
                        <Input addonAfter={<Icon type="search" theme="outlined" />} />
                    </div>
                </Layout.Header>
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
                <style jsx>
                    {`
                        :global(.ant-layout-header) {
                            display: flex;
                            justify-content: center;
                        }

                        .search-wrapper {
                            width: 30rem;
                            display: flex;
                            align-items: center;
                        }

                        :global(.ant-layout-content) {
                            padding-top: 2rem;
                        }
                    `}
                </style>
            </Layout>
        </>
    )
}

export default LunchApp
