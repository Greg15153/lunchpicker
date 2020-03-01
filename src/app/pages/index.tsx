import { Card, Col, Icon, Input, Layout, List, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'

import useLocation from '../hooks/useLocation'
import { get, post } from '../util/fetcher'

interface Business {
    id: number
    name: string
    thumbnail: string
}

const onRenderCell = (item: Business): JSX.Element => (
    <List.Item>
        <Card style={{ width: 140 }} hoverable cover={<img src={item.thumbnail} />}>
            <Card.Meta title={item.name} />
        </Card>
    </List.Item>
)

const Home = (): React.ReactElement => {
    const coordinates = useLocation()
    const [location, setLocation] = useState<string>()
    const [gpsLocation, setGpsLocation] = useState<string>()
    const [businesses, setBusinesses] = useState<Business[]>()

    const { data: reverseGeocodeData } = useSWR(
        !gpsLocation && coordinates
            ? `geocode/reverse?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`
            : null,
        get
    )

    const onEnvironmentClick = (): void => {
        setLocation(gpsLocation)
    }

    const onLocationChange = (event): void => {
        setLocation(event.target.value)
    }

    const onSearch = (value: string): void => {
        post('businesses', {
            json: {
                location: value
            }
        }).then(data => {
            data.json().then(json => {
                setBusinesses(json as Business[])
            })
        })
    }

    useEffect(() => {
        if (reverseGeocodeData) {
            console.log(reverseGeocodeData)
            reverseGeocodeData.json().then(value => {
                setGpsLocation(value.location)
                setLocation(value.location)
            })
        }
    }, [reverseGeocodeData])

    return (
        <Layout>
            <Layout.Header>
                <div className="search-wrapper">
                    <Input.Search
                        placeholder={'Location...'}
                        onChange={onLocationChange}
                        addonBefore={<Icon type="environment" theme="outlined" onClick={onEnvironmentClick} />}
                        value={location}
                        onSearch={onSearch}
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

export default Home