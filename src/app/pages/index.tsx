import { Card, Col, Icon, Input, Layout, List, Row } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'

import useLocation from '../hooks/useLocation'
import auth0 from '../util/auth0'
import { get, post } from '../util/fetcher'

interface Business {
    id: number
    name: string
    thumbnail: string
    url: string
}

const onRenderCell = (item: Business): JSX.Element => (
    <List.Item>
        <a href={item.url} target="_blank" rel="noopener noreferrer">
            <Card style={{ width: 140 }} hoverable cover={<img src={item.thumbnail} />}>
                <Card.Meta title={item.name} />
            </Card>
        </a>
    </List.Item>
)

const Home = (): React.ReactElement => {
    const coordinates = useLocation()
    const [gpsLocation, setGpsLocation] = useState<string>()
    const [businesses, setBusinesses] = useState<Business[]>()
    const [searchState, setSearchState] = useState<string>()

    const { data: reverseGeocodeData } = useSWR(
        !gpsLocation && coordinates
            ? `geocode/reverse?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`
            : null,
        get
    )

    const search = useCallback(
        (location: string) => {
            async function innerSearch(): Promise<void> {
                const businesses = (await post('businesses', { json: { location } }).json()) as Business[]
                setBusinesses(businesses)
            }

            if (location) {
                innerSearch()
            }
        },
        [searchState]
    )

    const onEnvironmentClick = (): void => {
        setSearchState(gpsLocation)
        search(gpsLocation)
    }

    useEffect(() => {
        async function setLocationFromGeocode(): Promise<void> {
            if (reverseGeocodeData) {
                const { location } = await reverseGeocodeData.json()
                setGpsLocation(location)
                setSearchState(location)
            }
        }

        setLocationFromGeocode()
    }, [reverseGeocodeData])

    useEffect(() => {
        if (!searchState) {
            setBusinesses([])
        }
    }, [searchState])

    useEffect(() => {
        if (gpsLocation) {
            console.log('gps location effect')
            search(gpsLocation)
        }
    }, [gpsLocation])

    return (
        <Layout>
            <Layout.Header>
                <div className="search-wrapper">
                    <Input.Search
                        placeholder={'Location...'}
                        onChange={(e): void => setSearchState(e.target.value)}
                        addonBefore={<Icon type="environment" theme="outlined" onClick={onEnvironmentClick} />}
                        onSearch={search}
                        value={searchState}
                        allowClear={true}
                    />
                </div>
            </Layout.Header>
            <Layout.Content>
                <Row>
                    <Col></Col>
                    <Col span={12} offset={6}>
                        <List
                            grid={{ gutter: 10, xs: 1, sm: 2, md: 4, lg: 6 }}
                            itemLayout="horizontal"
                            bordered={false}
                            size="small"
                            dataSource={businesses}
                            renderItem={onRenderCell}
                        />
                    </Col>
                </Row>
            </Layout.Content>
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
                `}
            </style>
        </Layout>
    )
}

Home.getInitialProps = async ({ req, res }) => {
    const { user } = await auth0.getSession(req)
    const cache = await auth0.tokenCache(req, res)
    const a = await cache.getAccessToken()

    console.log(a)
    console.log(user)

    return { user }
}
export default Home
